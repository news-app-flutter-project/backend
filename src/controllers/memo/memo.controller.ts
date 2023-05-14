import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createMemoRoutes } from './memo.routes';
import { memoService } from './memo.service';

class MemoController implements Controller {
    public path = '/memo';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newRoutes: AuthRoutes = createMemoRoutes(
            this.path,
            this.registerMemo,
            this.updateMemo,
            this.listMemo,
            this.createFolder,
            this.listFolders,
            this.allocate,
            this.updateFolderName,
            this.listmemosFromFolder,
            this.removeMemoFromFolder,
            this.deleteMemo,
            this.deleteMemoFolder
        );
        createRoutes(newRoutes, this.router);
    }

    private registerMemo = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { news_id, content } = req.body;
        try {
            const data = await memoService.registerMemo({
                news_id,
                content,
                profile_id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private updateMemo = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { content, memo_id: id } = req.body;
        try {
            const data = await memoService.updateMemo({
                content,
                id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private listMemo = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        try {
            const data = await memoService.listMemo({ profile_id });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private createFolder = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { name } = req.body;
        try {
            const data = await memoService.createFolder({ profile_id, name });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private listFolders = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        try {
            const data = await memoService.listFolders({ profile_id });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private allocate = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { id, folder_id } = req.body;
        try {
            await memoService.allocate({
                profile_id,
                id,
                folder_id,
            });
            response.success({ code: StatusCodes.CREATED });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private updateFolderName = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { name, folder_id: id } = req.body;
        try {
            await memoService.updateFolderName({ name, id });
            response.success({ code: StatusCodes.CREATED });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private listmemosFromFolder = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const profile_id = req.profile_id!;
            const { folder_id } = req.body;
            try {
                const data = await memoService.listmemosFromFolder({
                    profile_id,
                    folder_id,
                });
                response.success({ code: StatusCodes.CREATED, data });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private removeMemoFromFolder = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { id } = req.body;
            try {
                await memoService.removeMemoFromFolder({ id });
                response.success({ code: StatusCodes.CREATED });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private deleteMemo = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { id } = req.body;
        try {
            const data = await memoService.deleteMemo({
                id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private deleteMemoFolder = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { folder_id } = req.body;
        try {
            const data = await memoService.deleteMemoFolder({
                profile_id,
                folder_id,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default MemoController;
