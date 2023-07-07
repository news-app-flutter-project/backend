import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { createProfileRoutes } from './profile.routes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { profileService } from './profile.service';

class ProfileController implements Controller {
    public path = '/profile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const authRoutes: AuthRoutes = createProfileRoutes(
            this.path,
            this.createProfile,
            this.getProfile,
            // this.updateImage,
            this.updateScreenMode,
            this.updateTextSize
        );
        createRoutes(authRoutes, this.router);
    }

    private createProfile = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { auth_id } = req;
        const req_data = { ...req.body, auth_id };
        try {
            const data = await profileService.createProfile(req_data);
            return response.success({ code: StatusCodes.CREATED, data });
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

    // private updateImage = asyncWrapper(async (req: CustomRequest, res) => {
    //     const response = customResponse(res);
    //     const files: any = req.files;
    //     const auth_id = req.auth_id;
    //     try {
    //         const data = await profileService.updateProfileImg(
    //             files.image.tempFilePath,
    //             auth_id!
    //         );
    //         response.success({
    //             code: StatusCodes.CREATED,
    //             data,
    //         });
    //     } catch (err: any) {
    //         response.error(err as ErrorData);
    //     }
    // });

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

    private updateTextSize = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const auth_id = req.auth_id;
        const { text_size } = req.body;
        try {
            const data = await profileService.updateTextSize(
                text_size,
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
}

export default ProfileController;
