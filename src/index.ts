import "source-map-support/register";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import {
  NewsFinalController,
  AuthController,
  ProfileController,
  ReaderController,
} from "@/controllers/index";

validateEnv();
const app = new App({
  controllers: [
    new NewsFinalController(),
    new AuthController(),
    new ProfileController(),
    new ReaderController(),
  ],
  port: Number(process.env.PORT),
});

// cron job
// app.schedule_run();

app.bootstrap();
