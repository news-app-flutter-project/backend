import {
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    memoValidation,
    memoFolderNameValidation,
    memoAllocationValidation,
} from '@/middlewares/index';

import {
    register_memo_validation,
    update_memo_validation,
    createFolder_validation,
    allocate_validation,
    updateFolderName_validation,
    listmemosFromFolder_validation,
    removeMemoFromFolder_validation,
    deleteMemoFolder_validation,
} from './memo.validation';

export function createMemoRoutes(
    path: string,
    registerMemo: any,
    updateMemo: any,
    listMemo: any,
    createFolder: any,
    listFolders: any,
    allocate: any,
    updateFolderName: any,
    listmemosFromFolder: any,
    removeMemoFromFolder: any,
    deleteMemo: any,
    deleteMemoFolder: any
): AuthRoutes {
    return {
        registerMemo: {
            method: 'post',
            path: `${path}/registerMemo`,
            middleware: [
                bodyValidation(register_memo_validation),
                tokenValidationProfile(),
                newsIdValidation(),
                memoValidation(),
            ],
            handler: registerMemo,
        },
        updateMemo: {
            method: 'put',
            path: `${path}/updateMemo`,
            middleware: [
                bodyValidation(update_memo_validation),
                tokenValidationProfile(),
            ],
            handler: updateMemo,
        },
        listMemo: {
            method: 'get',
            path: `${path}/listMemo`,
            middleware: [tokenValidationProfile()],
            handler: listMemo,
        },
        createFolder: {
            method: 'post',
            path: `${path}/createFolder`,
            middleware: [
                bodyValidation(createFolder_validation),
                tokenValidationProfile(),
                memoFolderNameValidation(),
            ],
            handler: createFolder,
        },
        listFolders: {
            method: 'get',
            path: `${path}/listFolders`,
            middleware: [tokenValidationProfile()],
            handler: listFolders,
        },
        allocate: {
            method: 'put',
            path: `${path}/allocate`,
            middleware: [
                bodyValidation(allocate_validation),
                tokenValidationProfile(),
                memoAllocationValidation(),
            ],
            handler: allocate,
        },
        updateFolderName: {
            method: 'put',
            path: `${path}/updateFolderName`,
            middleware: [
                bodyValidation(updateFolderName_validation),
                tokenValidationProfile(),
            ],
            handler: updateFolderName,
        },
        listmemosFromFolder: {
            method: 'get',
            path: `${path}/listmemosFromFolder`,
            middleware: [
                bodyValidation(listmemosFromFolder_validation),
                tokenValidationProfile(),
            ],
            handler: listmemosFromFolder,
        },
        removeMemoFromFolder: {
            method: 'delete',
            path: `${path}/removeMemoFromFolder`,
            middleware: [
                bodyValidation(removeMemoFromFolder_validation),
                tokenValidationProfile(),
            ],
            handler: removeMemoFromFolder,
        },
        deleteMemo: {
            method: 'delete',
            path: `${path}/deleteMemo`,
            middleware: [
                bodyValidation(removeMemoFromFolder_validation),
                tokenValidationProfile(),
            ],
            handler: deleteMemo,
        },
        deleteMemoFolder: {
            method: 'delete',
            path: `${path}/deleteMemoFolder`,
            middleware: [
                bodyValidation(deleteMemoFolder_validation),
                tokenValidationProfile(),
            ],
            handler: deleteMemoFolder,
        },
    };
}
