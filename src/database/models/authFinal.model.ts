import { Sequelize, DataTypes, Model } from "sequelize";

declare global {
  interface AuthFinal extends TimeStampModel {
    id: number;
    kakao_id: number;
    kakao_access_token: string | null;
    kakao_access_token_expires_in: number | null;
    kakao_access_token_date: Date | null;
    kakao_refresh_token: string | null;
    kakao_refresh_token_expires_in: number | null;
    kakao_refresh_token_date: Date | null;
  }
  // creator type that is required to create the instance of NewsModel class
  type UserAuthCreateInterfaceFinal = Omit<
    AuthFinal,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  >;
}

export class AuthModelFinal
  extends Model<AuthFinal, UserAuthCreateInterfaceFinal>
  implements AuthFinal
{
  public id!: number;
  public kakao_id!: number;
  public kakao_access_token!: string | null;
  public kakao_access_token_expires_in!: number | null;
  public kakao_access_token_date!: Date | null;
  public kakao_refresh_token!: string | null;
  public kakao_refresh_token_expires_in!: number | null;
  public kakao_refresh_token_date!: Date | null;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;
  public deletedAt: Date | null | undefined;
}

export const AuthGeneratorFinal = (
  sequelize: Sequelize
): typeof AuthModelFinal => {
  AuthModelFinal.init(
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
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "authFinal",
      tableName: "authFinal",
    }
  );
  return AuthModelFinal;
};
