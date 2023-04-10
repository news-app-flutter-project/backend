import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import validateCategory from "./category.validation";
import validateAddsKeywords from "./addKeywords.validation";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { newsRepository } from "@/database/repositories/news.repository";

class NewsController implements Controller {
  public path = "/newsList";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(this.path)
      .post(validationMiddleware(validateCategory.create), this.listByCategory)
      .get(validationMiddleware(validateAddsKeywords.create), this.addKeywords);
  }

  private listByCategory = asyncWrapper(async (req, res) => {
    try {
      const { category } = req.body;
      console.log(category);
      const allnews = await newsRepository.findByCategory(category);
      console.log(allnews);
      return res.status(StatusCodes.OK).json({ result: true });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        result: false,
        message: "problem with the database",
      });
    }
  });

  private addKeywords = asyncWrapper(async (req, res) => {
    try {
      const { newsId } = req.body;
      console.log(newsId);
      const allnews = await newsRepository.findAllNews();
      // console.log(allnews);
      return res.status(StatusCodes.OK).json({ result: true });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        result: false,
        message: "problem with the database",
      });
    }
  });
}

export default NewsController;
