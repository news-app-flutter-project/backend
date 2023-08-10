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
            this.writeComment,
            this.likeComment,
            this.dislikeComment
        );
        createRoutes(newRoutes, this.router);
    }

    private writeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id: profile_id } = req.profile!;
        const { news_id, content } = req.body;
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

    private likeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id } = req.profile!;
        const { comment_id } = req.body;

        try {
            const data = await CommentService.handleLike({
                profile_id: id,
                comment_id: comment_id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private dislikeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id } = req.profile!;
        const { comment_id } = req.body;

        try {
            const data = await CommentService.handleDislike({
                profile_id: id,
                comment_id: comment_id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default CommentsMobileController;
