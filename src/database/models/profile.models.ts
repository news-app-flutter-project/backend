import { Sequelize, DataTypes, Model } from "sequelize";

declare global {
  type Category =
    | "business"
    | "entertainment"
    | "politics"
    | "science"
    | "sports"
    | "technology"
    | "world"
    | "lifestyle";
  type Age = "10" | "20" | "30" | "40" | "50" | "60" | "70";
  interface Profile extends TimeStampModel {
    id: number;
    profile_img?: string;
    name: string;
    birthday: string;
    sex: "male" | "female";
    category: Category;
    age: Age;
    auth_id?: number;
  }
}

type ProfileCreateInterface = Omit<Profile, "id">;

export class ProfileModel
  extends Model<Profile, ProfileCreateInterface>
  implements Profile
{
  public id!: number;
  public profile_img?: string;
  public name!: string;
  public birthday!: string;
  public sex!: "male" | "female";
  public category!: Category;
  public age!: Age;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const ProfileGenerator = (sequelize: Sequelize): typeof ProfileModel => {
  ProfileModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      profile_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          "business",
          "entertainment",
          "politics",
          "science",
          "sports",
          "technology",
          "world",
          "lifestyle"
        ),
        allowNull: false,
      },
      age: {
        type: DataTypes.ENUM("10", "20", "30", "40", "50", "60", "70"),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "profile",
      tableName: "profile",
    }
  );

  return ProfileModel;
};
