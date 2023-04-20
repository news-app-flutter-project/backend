import { Router } from "express";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import { customResponse } from "@/common/response";

class ProfileController implements Controller {
  public path = "/auth";
  public router = Router();
}
