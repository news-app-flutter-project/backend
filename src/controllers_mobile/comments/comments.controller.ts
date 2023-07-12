import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createCommentRoutes } from './comments.routes';
import { CommentService } from './comments.service';

class CommentsMobileController implements Controller {
    public path = '/comments/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newRoutes: AuthRoutes = createCommentRoutes(
            this.path,
            this.writeComment
        );
        createRoutes(newRoutes, this.router);
    }

    private writeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id: profile_id } = req.profile!;
        const { news_id, content } = req.body;
        console.log('hi');
        try {
            const data = await CommentService.writeComment({
                profile_id,
                news_id,
                content,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default CommentsMobileController;
