class App {
  public port: number;
  constructor(port: number) {
    this.port = port;
  }

  public listen(): void {
    console.log(`app is listening to port ${this.port}`);
  }
}

export default App;
