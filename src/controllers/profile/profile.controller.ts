import { Router } from "express";
import { asyncWrapper } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import { createAuthRoutes } from "./profile.routes";
import { customResponse } from "@/common/response";
import { createRoutes } from "@/common/createRouter";
import { profileService } from "./profile.service";

class ProfileController implements Controller {
  public path = "/profile";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const authRoutes: AuthRoutes = createAuthRoutes(
      this.path,
      this.createProfile,
      this.getProfile,
      this.updateImage,
      this.updateScreenMode
    );
    createRoutes(authRoutes, this.router);
  }

  private createProfile = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const auth_id = req.auth_id;
    const files: any = req.files;
    const req_data = {
      profile_img: files.image.tempFilePath,
      ...JSON.parse(req.body.payload),
      auth_id,
    };
    try {
      const data = await profileService.createProfile(req_data);
      return res.status(StatusCodes.OK).json({ result: true, data: data });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });

  private getProfile = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const auth_id = req.auth_id;
    try {
      const data = await profileService.getProfile(auth_id!);
      response.success({
        code: StatusCodes.CREATED,
        data,
      });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });

  private updateImage = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const files: any = req.files;
    const auth_id = req.auth_id;
    try {
      const data = await profileService.updateProfileImg(
        files.image.tempFilePath,
        auth_id!
      );
      response.success({
        code: StatusCodes.CREATED,
        data,
      });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });

  private updateScreenMode = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const auth_id = req.auth_id;
    const { mode } = req.body;
    try {
      const data = await profileService.updateScreenMode(mode, auth_id!);
      response.success({
        code: StatusCodes.CREATED,
        data,
      });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });
}

export default ProfileController;
