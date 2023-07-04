import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createProfileMobileRoutes } from './profile.routes';
import { profileService } from './profile.service';

class ProfileMobileController implements Controller {
    public path = '/profile/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const authRoutes: AuthRoutes = createProfileMobileRoutes(
            this.path,
            this.createProfile
        );
        createRoutes(authRoutes, this.router);
    }

    private createProfile = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_create_data = req.profile_create_data;
        try {
            const data = await profileService.createProfile(
                profile_create_data!
            );
            return response.success({ code: StatusCodes.CREATED, data });
        } catch (err: any) {
            response.error(err as ErrorData);
        }
    });
}

export default ProfileMobileController;
