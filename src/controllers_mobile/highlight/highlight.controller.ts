import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createHighlightRoutes } from './highlight.routes';
import { highlightService } from './highlight.service';

class HighlightMobileController implements Controller {
    public path = '/highlight/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createHighlightRoutes(
            this.path,
            this.highlight
        );
        createRoutes(newsRoutes, this.router);
    }

    private highlight = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const news = req.news!;
        const profile = req.profile!;
        const sentence_no = req.sentence_no!;
        try {
            const data = await highlightService.highlight({
                news,
                profile,
                sentence_no,
            });
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default HighlightMobileController;
