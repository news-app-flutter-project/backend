export const relations = (db: DB) => {
  // Auth:Profile = 1:1
  db.AuthFinal.hasOne(db.Profile, {
    foreignKey: { name: "auth_id", allowNull: false },
    as: "profile",
  });
  db.Profile.belongsTo(db.AuthFinal, {
    foreignKey: { name: "auth_id", allowNull: false },
    as: "auth",
  });
};
