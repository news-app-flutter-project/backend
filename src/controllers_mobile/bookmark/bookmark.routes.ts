import {
    kakaoIdAuth,
    profileValidation,
    payloadValidation,
    tokenValidation,
    newsIdValidation,
    bodyValidation,
    tokenValidationProfile,
    bookmarkNewsValidation,
    bookmarkAllocationValidation,
    bookmarkFolderNameValidation,
    bookmarkValidation,
    queryValidation,
    bookmarkExistValidation,
    bookmarkFolderExistValidation,
} from '@/middlewares/index';
import {
    bookmark_validation,
    createFolder_validation,
    listAllFolders_validation,
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
                bookmarkNewsValidation(),
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
            method: 'post',
            path: `${path}/listAllFolders`,
            middleware: [
                bodyValidation(listAllFolders_validation),
                profileValidation(),
            ],
            handler: listAllFolders,
        },

        listBookmarksFromFolder: {
            method: 'post',
            path: `${path}/listBookmarksFromFolder`,
            middleware: [
                bodyValidation(listBookmarksFromFolder_validation),
                profileValidation(),
                bookmarkFolderExistValidation(),
            ],
            handler: listBookmarksFromFolder,
        },

        allocate: {
            method: 'post',
            path: `${path}/allocate`,
            middleware: [
                bodyValidation(allocate_validation),
                profileValidation(),
                bookmarkExistValidation(),
                bookmarkAllocationValidation(),
                bookmarkFolderExistValidation(),
            ],
            handler: allocate,
        },

        updateFolderName: {
            method: 'put',
            path: `${path}/updateFolderName`,
            middleware: [
                bodyValidation(updateFolderName_validation),
                profileValidation(),
                bookmarkFolderExistValidation(),
                bookmarkFolderNameValidation(),
            ],
            handler: updateFolderName,
        },

        removeBookmarkFromFolder: {
            method: 'delete',
            path: `${path}/removeBookmarkFromFolder`,
            middleware: [
                queryValidation(removeBookmarkFromFolder_validation),
                profileValidation(),
                bookmarkExistValidation(),
            ],
            handler: removeBookmarkFromFolder,
        },

        deleteBookmark: {
            method: 'delete',
            path: `${path}/deleteBookmark`,
            middleware: [
                queryValidation(deleteBookmark_validation),
                profileValidation(),
                bookmarkExistValidation(),
            ],
            handler: deleteBookmark,
        },

        deleteBookmarkFolder: {
            method: 'delete',
            path: `${path}/deleteBookmarkFolder`,
            middleware: [
                queryValidation(deleteBookmarkFolder_validation),
                profileValidation(),
                bookmarkFolderExistValidation(),
            ],
            handler: deleteBookmarkFolder,
        },
    };
}
