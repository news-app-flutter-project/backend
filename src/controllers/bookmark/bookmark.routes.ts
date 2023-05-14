import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    bookmarkValidation,
    bookmarkFolderNameValidation,
    bookmarkAllocationValidation,
} from '@/middlewares/index';
import {
    bookmark_validation,
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
    listAllBookmarks: any,
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
            method: 'get',
            path: `${path}/listBookmarksFromFolder`,
            middleware: [
                bodyValidation(listBookmarksFromFolder_validation),
                tokenValidationProfile(),
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
