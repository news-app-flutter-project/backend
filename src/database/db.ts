import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIGS } from '@/common/constants';
import { NewsModel, NewsGenerator } from '@/database/models/news.models';
import { AuthModel, AuthGenerator } from '@/database/models/auth.model';
import { ProfileModel, ProfileGenerator } from './models/profile.models';
import { ReaderModel, ReaderGenerator } from './models/reader.model';
import { SearchModel, SearchGenerator } from './models/search.models';
import { BookmarkModel, BookmarkGenerator } from './models/bookmark.model';
import {
    Bookmark_FolderModel,
    Bookmark_FolderGenerator,
} from './models/bookmark_folder.model';
import { MemoModel, MemoGenerator } from './models/memo.model';
import {
    MemoFolderModel,
    MemoFolderGenerator,
} from './models/memo_folder.model';
import { CommentModel, CommentGenerator } from './models/comment.model';
import {
    SubCommentModel,
    SubCommentGenerator,
} from './models/subComment.model';
import { BadWordsModel, BadWordsGenerator } from './models/bad_words.model';
import {
    CommentLikeModel,
    CommentLikeGenerator,
} from './models/comment_like.model';
import {
    SubCommentLikeModel,
    SubCommentLikeGenerator,
} from './models/subComment_like.model';
import {
    NewsContentModel,
    NewsContentGenerator,
} from './models/news_content.model';
import { HighlightModel, HighlightGenerator } from './models/highlight.model';

import { relations } from './relations';
const sequelize = new Sequelize(SEQUELIZE_CONFIGS);

declare global {
    interface TimeStampModel {
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date | null;
    }

    interface DB {
        Sequelize: typeof Sequelize;
        sequelize: Sequelize;
        News: typeof NewsModel;
        Auth: typeof AuthModel;
        Profile: typeof ProfileModel;
        Reader: typeof ReaderModel;
        Search: typeof SearchModel;
        BookMarkFolder: typeof Bookmark_FolderModel;
        BookMark: typeof BookmarkModel;
        Memo: typeof MemoModel;
        MemoFolder: typeof MemoFolderModel;
        Comments: typeof CommentModel;
        SubComment: typeof SubCommentModel;
        BadWords: typeof BadWordsModel;
        CommentsLike: typeof CommentLikeModel;
        SubCommentLike: typeof SubCommentLikeModel;
        NewsContent: typeof NewsContentModel;
        Highlight: typeof HighlightModel;
    }
}

const db: DB = {
    Sequelize,
    sequelize,
    News: NewsGenerator(sequelize),
    Auth: AuthGenerator(sequelize),
    Profile: ProfileGenerator(sequelize),
    Reader: ReaderGenerator(sequelize),
    Search: SearchGenerator(sequelize),
    BookMarkFolder: Bookmark_FolderGenerator(sequelize),
    BookMark: BookmarkGenerator(sequelize),
    Memo: MemoGenerator(sequelize),
    MemoFolder: MemoFolderGenerator(sequelize),
    Comments: CommentGenerator(sequelize),
    SubComment: SubCommentGenerator(sequelize),
    BadWords: BadWordsGenerator(sequelize),
    CommentsLike: CommentLikeGenerator(sequelize),
    SubCommentLike: SubCommentLikeGenerator(sequelize),
    NewsContent: NewsContentGenerator(sequelize),
    Highlight: HighlightGenerator(sequelize),
};

relations(db);

export default db;
