import { Sequelize, DataTypes, Model } from "sequelize";

declare global {
  interface UserAuth extends TimeStampModel {
    id: number;
    username: string;
    kakao_Id: number;
    kakao_accessToken: string | null;
    kakao_refreshToken: string | null;
    app_accessToken: string | null;
    app_refreshToken: string | null;
  }
}

// creator type that is required to create the instance of NewsModel class
export type UserAuthCreateInterface = Omit<
  UserAuth,
  | "id"
  | "app_accessToken"
  | "app_refreshToken"
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
  public kakao_Id!: number;
  public kakao_accessToken!: string | null;
  public kakao_refreshToken!: string | null;
  public app_accessToken!: string | null;
  public app_refreshToken!: string | null;
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
      kakao_Id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      kakao_accessToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      kakao_refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      app_accessToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      app_refreshToken: {
        type: DataTypes.STRING(255),
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
