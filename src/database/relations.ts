export const relations = (db: DB) => {
  // Auth:Profile = 1:1
  db.Auth.hasOne(db.Profile, {
    foreignKey: { name: "auth_id", allowNull: false },
    as: "profile",
  });
  db.Profile.belongsTo(db.Auth, {
    foreignKey: { name: "auth_id", allowNull: false },
    as: "auth",
  });
};
