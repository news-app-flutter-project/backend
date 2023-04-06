import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import validate from "./addKeywords.validation";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { newsRepository } from "@/database/repositories/news.repository";

class AddKeywordsController implements Controller {
  public path = "/addkeywords";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(this.path)
      .post(validationMiddleware(validate.create), this.addKeywords);
  }

  private addKeywords = asyncWrapper(async (req, res) => {
    console.log(req);
    try {
      const allnews = await newsRepository.findAllNews();
      console.log(allnews);
      return res.status(StatusCodes.OK).json({ result: true });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        result: false,
        message: "problem with the database",
      });
    }
  });
}

export default AddKeywordsController;
