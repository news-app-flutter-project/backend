import { Sequelize, DataTypes, Model } from "sequelize";

declare global {
  interface Auth extends TimeStampModel {
    id: number;
    kakao_id: number;
    kakao_access_token: string | null;
    kakao_access_token_expires_in: number | null;
    kakao_access_token_date: Date | null;
    kakao_refresh_token: string | null;
    kakao_refresh_token_expires_in: number | null;
    kakao_refresh_token_date: Date | null;
    app_access_token: string | null;
    app_access_token_date: Date | null;
    app_refresh_token: string | null;
    app_refresh_token_date: Date | null;
  }
}

// creator type that is required to create the instance of NewsModel class
export type UserAuthCreateInterface = Omit<
  Auth,
  | "id"
  | "username"
  | "app_access_token"
  | "app_access_token_date"
  | "app_refresh_token_date"
  | "app_refresh_token"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

export class AuthModel
  extends Model<Auth, UserAuthCreateInterface>
  implements Auth
{
  public id!: number;
  public kakao_id!: number;
  public kakao_access_token!: string | null;
  public kakao_access_token_expires_in!: number | null;
  public kakao_access_token_date!: Date | null;
  public kakao_refresh_token!: string | null;
  public kakao_refresh_token_expires_in!: number | null;
  public kakao_refresh_token_date!: Date | null;
  public app_access_token!: string | null;
  public app_access_token_date!: Date | null;
  public app_refresh_token!: string | null;
  public app_refresh_token_date!: Date | null;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;
  public deletedAt: Date | null | undefined;
}

export const AuthGenerator = (sequelize: Sequelize): typeof AuthModel => {
  AuthModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      kakao_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      kakao_access_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kakao_access_token_expires_in: {
        type: DataTypes.BIGINT.UNSIGNED,
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
      kakao_refresh_token_expires_in: {
        type: DataTypes.BIGINT.UNSIGNED,
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
      modelName: "auth",
      tableName: "auth",
    }
  );
  return AuthModel;
};
