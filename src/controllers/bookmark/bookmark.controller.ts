import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createSearchRoutes } from './bookmark.routes';
import { bookmarkService } from './bookmark.service';

class BookmarkController implements Controller {
    public path = '/bookmark';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createSearchRoutes(
            this.path,
            this.bookmark,
            this.listAllBookmarks,
            this.createFolder,
            this.listAllFolders,
            this.allocate,
            this.updateFolderName,
            this.removeBookmarkFromFolder
        );
        createRoutes(newsRoutes, this.router);
    }

    private bookmark = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { id: news_id } = req.news!;
        try {
            const data = await bookmarkService.bookmarkNews(
                profile_id!,
                news_id!
            );
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private listAllBookmarks = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;

        try {
            const data = await bookmarkService.listAllBookmarks(profile_id!);
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private createFolder = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { name } = req.body;
        try {
            const data = await bookmarkService.createFolder(profile_id!, name);
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private listAllFolders = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        try {
            const data = await bookmarkService.listAllFolders(profile_id!);
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private allocate = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { folder_id, bookmark_id } = req.body;
        try {
            const data = await bookmarkService.allocate(
                profile_id!,
                folder_id,
                bookmark_id
            );
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private updateFolderName = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { new_name, folder_id } = req.body;
        try {
            const data = await bookmarkService.updateFolderName(
                profile_id!,
                folder_id,
                new_name
            );
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private removeBookmarkFromFolder = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const profile_id = req.profile_id;
            const { bookmark_id, folder_id } = req.body;
            console.log(profile_id, bookmark_id, folder_id);
            try {
                await bookmarkService.removeBookmarkFromFolder(
                    profile_id!,
                    bookmark_id,
                    folder_id
                );
                response.success({
                    code: StatusCodes.CREATED,
                    data: 'bookmarked removed',
                });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );
}

export default BookmarkController;
