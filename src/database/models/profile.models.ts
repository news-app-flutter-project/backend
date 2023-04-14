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
  type Sex = "male" | "female";
  interface Profile extends TimeStampModel {
    id: number;
    profile_img: string;
    name: string;
    birthday: string;
    sex: Sex;
    category:
      | [Category]
      | [Category, Category]
      | [Category, Category, Category];
    age: Age;
    auth_id?: number;
  }
}

export type ProfileCreateInterface = Omit<Profile, "id">;

export class ProfileModel
  extends Model<Profile, ProfileCreateInterface>
  implements Profile
{
  public id!: number;
  public profile_img!: string;
  public name!: string;
  public birthday!: string;
  public sex!: "male" | "female";
  public category!:
    | [Category]
    | [Category, Category]
    | [Category, Category, Category];
  public age!: Age;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
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
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      category: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          isCategoryArray(value: Category[]) {
            if (value.length < 1 || value.length > 3) {
              throw new Error("Category should have 1-3 items");
            }
            for (const item of value) {
              if (
                ![
                  "business",
                  "entertainment",
                  "politics",
                  "science",
                  "sports",
                  "technology",
                  "world",
                  "lifestyle",
                ].includes(item)
              ) {
                throw new Error(`Invalid category value: ${item}`);
              }
            }
          },
        },
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
