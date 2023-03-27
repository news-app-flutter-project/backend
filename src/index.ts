import "dotenv/config";
import "module-alias/register";
import useNewsApi from "@/apis/news_api";
import App from "./app";

const app = new App({ port: Number(process.env.PORT), apiFn: useNewsApi });

app.test_api({
  country: "us",
});

app.listen();
