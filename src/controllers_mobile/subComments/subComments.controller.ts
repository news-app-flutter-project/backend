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
            this.writeSubComment,
            this.likeSubComment,
            this.dislikeSubComment,
            this.updateComment
        );
        createRoutes(newRoutes, this.router);
    }

    private writeSubComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id: profile_id } = req.profile!;
        const { comment_id, content } = req.body;
        try {
            const data = await SubCommentService.writeSubComment({
                comment_id,
                profile_id,
                content,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private likeSubComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id } = req.profile!;
        const { sub_comment_id } = req.body;
        console.log(id, sub_comment_id);
        try {
            const data = await SubCommentService.handleLike({
                profile_id: id,
                sub_comment_id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private dislikeSubComment = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { id } = req.profile!;
            const { sub_comment_id } = req.body;
            console.log(id, sub_comment_id);
            try {
                const data = await SubCommentService.handleDislike({
                    profile_id: id,
                    sub_comment_id,
                });
                response.success({ code: StatusCodes.CREATED, data });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private updateComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { sub_comment_id, content } = req.body;
        try {
            const data = await SubCommentService.editSubComment({
                id: sub_comment_id,
                content: content,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default SubCommentsMobileController;
