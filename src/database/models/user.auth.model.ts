import { Sequelize, DataTypes, Model } from "sequelize";

declare global {
  interface UserAuth extends TimeStampModel {
    id: number;
    username: string;
    kakao_id: number;
    kakao_access_token: string | null;
    kakao_access_token_date: Date | null;
    kakao_refresh_token: string | null;
    kakao_refresh_token_date: Date | null;
    app_access_token: string | null;
    app_access_token_date: Date | null;
    app_refresh_token: string | null;
    app_refresh_token_date: Date | null;
  }
}

// creator type that is required to create the instance of NewsModel class
export type UserAuthCreateInterface = Omit<
  UserAuth,
  | "id"
  | "app_access_token"
  | "app_access_token_date"
  | "app_refresh_token_date"
  | "app_refresh_token"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

export class UserAuthModel
  extends Model<UserAuth, UserAuthCreateInterface>
  implements UserAuth
{
  public id!: number;
  public username!: string;
  public kakao_id!: number;
  public kakao_access_token!: string | null;
  public kakao_access_token_date!: Date | null;
  public kakao_refresh_token!: string | null;
  public kakao_refresh_token_date!: Date | null;
  public app_access_token!: string | null;
  public app_access_token_date!: Date | null;
  public app_refresh_token!: string | null;
  public app_refresh_token_date!: Date | null;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;
  public deletedAt: Date | null | undefined;
}

export const UserAuthGenerator = (
  sequelize: Sequelize
): typeof UserAuthModel => {
  UserAuthModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      kakao_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      kakao_access_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kakao_access_token_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      kakao_refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kakao_refresh_token_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      app_access_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      app_access_token_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      app_refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      app_refresh_token_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      // automate createdAt and updatedAt
      // i actually dont need to specify these keys above
      timestamps: true,
      // automate deletedAt
      paranoid: true,
      modelName: "user_auth",
      tableName: "user_auth",
    }
  );
  return UserAuthModel;
};
