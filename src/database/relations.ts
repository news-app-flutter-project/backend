export const relations = (db: DB) => {
    // Auth:Profile = 1:1
    db.Auth.hasOne(db.Profile, {
        foreignKey: { name: 'auth_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.belongsTo(db.Auth, {
        foreignKey: { name: 'auth_id', allowNull: false },
        as: 'auth',
    });

    // Reads:Profile = M:1
    db.Reader.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.Reader, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'reads',
    });
    // Reads:News = M:1
    db.Reader.belongsTo(db.News, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'news',
    });
    db.News.hasMany(db.Reader, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'reads',
    });

    // Search:Profile = M:1
    db.Search.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.Search, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'searches',
    });

    // Bookmark:News = M:1
    db.BookMark.belongsTo(db.News, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'news',
    });
    db.News.hasMany(db.BookMark, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'bookmarks',
    });

    // Bookmark:Profile = M:1
    db.BookMark.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.BookMark, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'bookmarks',
    });

    // BookmarkFolder:Profile = M:1
    db.BookMarkFolder.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.BookMarkFolder, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'bookmark_folders',
    });

    // Bookmark:Bookmark_Folder = M:N
    db.BookMark.belongsTo(db.BookMarkFolder, {
        foreignKey: { name: 'folder_id', allowNull: true },
        as: 'folders',
    });
    db.BookMarkFolder.hasMany(db.BookMark, {
        foreignKey: { name: 'folder_id', allowNull: true },
        as: 'bookmarks',
    });

    // Memo:MemosFolder = M:1
    db.Memo.belongsTo(db.MemoFolder, {
        foreignKey: { name: 'memo_folder_id', allowNull: true },
        as: 'folder',
    });
    db.MemoFolder.hasMany(db.Memo, {
        foreignKey: { name: 'memo_folder_id', allowNull: true },
        as: 'memos',
    });

    // Profile:Memo = 1:M
    db.Profile.hasMany(db.Memo, {
        foreignKey: 'profile_id',
        as: 'memos',
    });
    db.Memo.belongsTo(db.Profile, {
        foreignKey: 'profile_id',
        as: 'profile',
    });

    // Profile:MemoFolder = 1:M
    db.Profile.hasMany(db.MemoFolder, {
        foreignKey: 'profile_id',
        as: 'memo_folders',
    });
    db.MemoFolder.belongsTo(db.Profile, {
        foreignKey: 'profile_id',
        as: 'profile',
    });

    // News:Memo = 1:1
    db.News.hasOne(db.Memo, {
        foreignKey: 'news_id',
        as: 'memo',
    });
    db.Memo.belongsTo(db.News, {
        foreignKey: 'news_id',
        as: 'news',
    });

    // Comment:Profile = M:1
    db.Comments.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.Comments, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'comments',
    });

    // Comment:News = M:1
    db.Comments.belongsTo(db.News, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'news',
    });
    db.News.hasMany(db.Comments, {
        foreignKey: { name: 'news_id', allowNull: false },
        as: 'comments',
    });

    // SubComment:Comment = M:1
    db.SubComment.belongsTo(db.Comments, {
        foreignKey: { name: 'comment_id', allowNull: false },
        as: 'comment',
    });
    db.Comments.hasMany(db.SubComment, {
        foreignKey: { name: 'comment_id', allowNull: false },
        as: 'subcomments',
    });

    // SubComment:Profile = M:1
    db.SubComment.belongsTo(db.Profile, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'profile',
    });
    db.Profile.hasMany(db.SubComment, {
        foreignKey: { name: 'profile_id', allowNull: false },
        as: 'subcomments',
    });
};
