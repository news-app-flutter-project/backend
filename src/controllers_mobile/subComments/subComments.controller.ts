import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createSubCommentRoutes } from './subComments.routes';
import { SubCommentService } from './subComments.service';

class SubCommentsMobileController implements Controller {
    public path = '/subcomment/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newRoutes: AuthRoutes = createSubCommentRoutes(
            this.path,
            this.writeComment
        );
        createRoutes(newRoutes, this.router);
    }

    private writeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id: profile_id } = req.profile!;
        const { comment_id, content } = req.body;
        try {
            const data = await SubCommentService.writeComment({
                comment_id,
                profile_id,
                content,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default SubCommentsMobileController;
