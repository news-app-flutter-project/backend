import "source-map-support/register";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import {
  NewsFinalController,
  NewsController,
  AuthController,
  ProfileController,
} from "@/controllers/index";

validateEnv();
const app = new App({
  controllers: [
    new NewsFinalController(),
    new NewsController(),
    new AuthController(),
    new ProfileController(),
  ],
  port: Number(process.env.PORT),
});

// cron job
// app.schedule_run();

// newsRepository.updateGptKeywords(1);

app.bootstrap();
