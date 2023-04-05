import "dotenv/config";
import "module-alias/register";
import useNewsApi from "@/apis/news_api";
import paramsArr from "./apis/news_api_params";
import { ScheduleNewsUpdate } from "@/cron/news.jobs";
import App from "./app";

const app = new App({ port: Number(process.env.PORT), apiFn: useNewsApi });

// paramsArr.forEach(async (params) => {
//   console.log(await app.test_api(params));
// });

// cron job
app.schedule_run();

app.bootstrap();
