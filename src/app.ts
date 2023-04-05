import db from "@/database/db";
import cron from "node-cron";
import moment from "moment";
import { ScheduleNewsUpdate } from "@/cron/news.jobs";
import useNewsApi from "@/apis/news_api";
import paramsArr from "@/apis/news_api_params";

interface Paramters {
  port: number;
  apiFn: (params: any) => Promise<any>;
}

class App {
  public port: number;
  private apiFn: (params: any) => Promise<any>;

  constructor({ port, apiFn }: Paramters) {
    this.port = port;
    this.apiFn = apiFn;
  }

  public async test_api(params: any): Promise<any> {
    return await this.apiFn(params);
  }

  public async schedule_run(): Promise<any> {
    // const schedule = new ScheduleNewsUpdate();

    // for (const param of paramsArr) {
    //   const { results: newsArr } = await useNewsApi(param);

    //   await schedule.insertNewsData(newsArr);
    // }

    cron.schedule("0 12 * * *", async () => {
      const schedule = new ScheduleNewsUpdate();
      const lastNewsItem = await schedule.findLastNewsItem();
      console.log("Last news item:", lastNewsItem?.dataValues);

      const lastNewsItemDate = moment(lastNewsItem?.dataValues.createdAt);
      const currentDate = moment();
      const isLastNewsItemDateBeforeCurrentDate = lastNewsItemDate.isBefore(
        currentDate.subtract(1, "day")
      );
      if (isLastNewsItemDateBeforeCurrentDate) {
        for (const param of paramsArr) {
          const { results: newsArr } = await useNewsApi(param);

          await schedule.insertNewsData(newsArr);
        }
      }
    });
  }

  public listen(): void {
    console.log(`app is listening to port ${this.port}`);
  }

  public bootstrap() {
    db.sequelize
      .sync({ force: false })
      .then(() => this.listen())
      .catch((error) => console.log(error));
  }
}

export default App;
