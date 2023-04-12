import "source-map-support/register";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import { NewsController, UserAuthController } from "@/controllers/index";
import { newsRepository } from "@/database/repositories/news.repository";

validateEnv();
const app = new App({
  controllers: [new NewsController(), new UserAuthController()],
  port: Number(process.env.PORT),
});

// // cron job
// app.schedule_run();

// newsRepository.updateGptKeywords(1);

app.bootstrap();
