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
};
