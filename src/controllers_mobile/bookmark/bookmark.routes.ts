import {
    kakaoIdAuth,
    profileValidation,
    payloadValidation,
    tokenValidation,
    newsIdValidation,
    bodyValidation,
    tokenValidationProfile,
    bookmarkValidation,
    bookmarkFolderNameValidation,
    bookmarkAllocationValidation,
} from '@/middlewares/index';
import {
    bookmark_validation,
    bookmark_list_validation,
    createFolder_validation,
    allocate_validation,
    updateFolderName_validation,
    listBookmarksFromFolder_validation,
    removeBookmarkFromFolder_validation,
    deleteBookmark_validation,
    deleteBookmarkFolder_validation,
} from './bookmark.validation';

export function createSearchRoutes(
    path: string,
    bookmark: any,
    createFolder: any,
    listAllFolders: any,
    allocate: any,
    updateFolderName: any,
    listBookmarksFromFolder: any,
    removeBookmarkFromFolder: any,
    deleteBookmark: any,
    deleteBookmarkFolder: any
): AuthRoutes {
    return {
        bookmark: {
            method: 'post',
            path: `${path}`,
            middleware: [
                bodyValidation(bookmark_validation),
                profileValidation(),
                newsIdValidation(),
                bookmarkValidation(),
            ],
            handler: bookmark,
        },

        createFolder: {
            method: 'post',
            path: `${path}/createFolder`,
            middleware: [
                bodyValidation(createFolder_validation),
                profileValidation(),
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
            method: 'post',
            path: `${path}/allocate`,
            middleware: [
                bodyValidation(allocate_validation),
                tokenValidationProfile(),
                bookmarkAllocationValidation(),
            ],
            handler: allocate,
        },

        updateFolderName: {
            method: 'put',
            path: `${path}/updateFolderName`,
            middleware: [
                bodyValidation(updateFolderName_validation),
                tokenValidationProfile(),
                bookmarkFolderNameValidation(),
            ],
            handler: updateFolderName,
        },

        listBookmarksFromFolder: {
            method: 'post',
            path: `${path}/listBookmarksFromFolder`,
            middleware: [
                bodyValidation(listBookmarksFromFolder_validation),
                profileValidation(),
            ],
            handler: listBookmarksFromFolder,
        },

        removeBookmarkFromFolder: {
            method: 'delete',
            path: `${path}/removeBookmarkFromFolder`,
            middleware: [
                bodyValidation(removeBookmarkFromFolder_validation),
                tokenValidationProfile(),
            ],
            handler: removeBookmarkFromFolder,
        },

        deleteBookmark: {
            method: 'delete',
            path: `${path}/deleteBookmark`,
            middleware: [
                bodyValidation(deleteBookmark_validation),
                tokenValidationProfile(),
            ],
            handler: deleteBookmark,
        },

        deleteBookmarkFolder: {
            method: 'delete',
            path: `${path}/deleteBookmarkFolder`,
            middleware: [
                bodyValidation(deleteBookmarkFolder_validation),
                tokenValidationProfile(),
            ],
            handler: deleteBookmarkFolder,
        },
    };
}
