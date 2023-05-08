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
};
