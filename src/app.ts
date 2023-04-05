import db from "@/database/db";
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
    const schedule = new ScheduleNewsUpdate();
    const lastNewsItem = await schedule.findLastNewsItem();
    console.log("Last news item:", lastNewsItem?.dataValues);

    // const allNewsItems = await schedule.allNewsItems();
    // console.log("All news items:", allNewsItems);

    // for (const param of paramsArr) {
    //   const { results: newsArr } = await useNewsApi(param);

    //   await schedule.insertNewsData(newsArr);
    // }
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
