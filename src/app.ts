import db from "@/database/db";

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
