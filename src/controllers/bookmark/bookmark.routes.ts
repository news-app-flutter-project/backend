import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    bookmarkValidation,
    bookmarkFolderNameValidation,
} from '@/middlewares/index';
import {
    bookmark_validation,
    createFolder_validation,
    allocate_validation,
} from './bookmark.validation';

export function createSearchRoutes(
    path: string,
    bookmark: any,
    listAllBookmarks: any,
    createFolder: any,
    listAllFolders: any,
    allocate: any
): AuthRoutes {
    return {
        bookmark: {
            method: 'post',
            path: `${path}/bookmark`,
            middleware: [
                bodyValidation(bookmark_validation),
                tokenValidationProfile(),
                newsIdValidation(),
                bookmarkValidation(),
            ],
            handler: bookmark,
        },
        listAllBookmarks: {
            method: 'get',
            path: `${path}/listAllBookmarks`,
            middleware: [tokenValidationProfile()],
            handler: listAllBookmarks,
        },
        createFolder: {
            method: 'post',
            path: `${path}/createFolder`,
            middleware: [
                bodyValidation(createFolder_validation),
                tokenValidationProfile(),
                bookmarkFolderNameValidation(),
            ],
            handler: createFolder,
        },
        listAllFolders: {
            method: 'get',
            path: `${path}/listAllFolders`,
            middleware: [tokenValidationProfile()],
            handler: listAllFolders,
        },
        allocate: {
            method: 'put',
            path: `${path}/allocate`,
            middleware: [
                bodyValidation(allocate_validation),
                tokenValidationProfile(),
            ],
            handler: allocate,
        },
    };
}
