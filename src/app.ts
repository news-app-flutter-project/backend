import express, { Application, Router } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import db from "@/database/db";
import cron from "node-cron";
const xss = require("xss-clean");
import rateLimit from "express-rate-limit";
import compression from "compression";
import { errorMiddleware } from "@/middlewares/index";
import moment from "moment";
import { ScheduleNewsUpdate } from "@/cron/news.jobs";
import useNewsApi from "@/apis/newsData/news_api";
import paramsArr from "@/apis/newsData/news_api_params";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import * as path from "path";
const swaggerDoc = YAML.load(path.join(__dirname, "../build/swagger.yaml"));

interface Paramters {
  port: number;
  controllers: Controller[];
}

class App {
  public express: Application;
  public port: number;

  constructor({ port, controllers }: Paramters) {
    this.express = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeCloudinary();
    this.initializeHome();
    this.initializeKakaoRedirect();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeSwagger();
  }

  private initializeMiddleware() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(xss());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.set("trust proxy", 1);
    this.express.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      })
    );
    this.express.use(compression()); // makes api request super fast (268.75 faster)
    this.express.use(fileUpload({ useTempFiles: true }));
  }

  private initializeHome(): void {
    this.express.get("/", (req, res) => {
      // res.json({ message: true });
      res.redirect("https://dapper-gumption-20af31.netlify.app/");
    });
  }

  private initializeSwagger(): void {
    this.express.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }

  private initializeKakaoRedirect(): void {
    this.express.get("/kakao", (req, res) => {
      const { code } = req.query;
      res.json({ message: true, data: code });
    });
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private initializeCloudinary(): void {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  public async schedule_run(): Promise<any> {
    const schedule = new ScheduleNewsUpdate();

    for (const param of paramsArr) {
      const { results: newsArr } = await useNewsApi(param);

      await schedule.insertNewsData(newsArr);
    }

    // cron.schedule("0 12 * * *", async () => {
    //   const schedule = new ScheduleNewsUpdate();
    //   const lastNewsItem = await schedule.findLastNewsItem();
    //   console.log("Last news item:", lastNewsItem?.dataValues);

    //   const lastNewsItemDate = moment(lastNewsItem?.dataValues.createdAt);
    //   const currentDate = moment();
    //   const isLastNewsItemDateBeforeCurrentDate = lastNewsItemDate.isBefore(
    //     currentDate.subtract(1, "day")
    //   );
    //   if (isLastNewsItemDateBeforeCurrentDate) {
    //     for (const param of paramsArr) {
    //       const { results: newsArr } = await useNewsApi(param);

    //       await schedule.insertNewsData(newsArr);
    //     }
    //   }
    // });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
    console.log(`API is available at http://localhost:${this.port}`);
  }

  public bootstrap() {
    db.sequelize
      .authenticate()
      .then(() => {
        return db.sequelize.sync({ force: false });
      })
      .then(() => this.listen())
      .catch((error) => console.log(error));
  }
}

export default App;
