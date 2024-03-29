import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    type Category =
        | 'business'
        | 'entertainment'
        | 'politics'
        | 'science'
        | 'sports'
        | 'technology'
        | 'world'
        | 'lifestyle';
    type Age = 10 | 20 | 30 | 40 | 50 | 60;
    type Sex = 'male' | 'female' | 'undefined';
    type Screen_Mode = 'dark' | 'light';
    type Text_Size = 'small' | 'large';
    interface Profile extends TimeStampModel {
        id: number;
        profile_img: string | null;
        name: string;
        email: string | null;
        nickname: string;
        sex: Sex;
        category:
            | [Category]
            | [Category, Category]
            | [Category, Category, Category];
        age: Age;
        birthday: string | null;
        screen_mode: Screen_Mode;
        text_size: Text_Size;
        auth_id: number;
    }
}

export type ProfileCreateInterface = Omit<
    Profile,
    'id' | 'screen_mode' | 'text_size' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class ProfileModel
    extends Model<Profile, ProfileCreateInterface>
    implements Profile
{
    public id!: number;
    public profile_img!: string;
    public name!: string;
    public birthday!: string | null;
    public email!: string | null;
    public nickname!: string;
    public sex!: Sex;
    public category!:
        | [Category]
        | [Category, Category]
        | [Category, Category, Category];
    public age!: Age;
    public screen_mode!: Screen_Mode;
    public text_size!: Text_Size;
    public auth_id!: number;
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
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sex: {
                type: DataTypes.ENUM('male', 'female', 'undefined'),
                allowNull: false,
            },
            category: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    isCategoryArray(value: Category[]) {
                        if (value.length < 1 || value.length > 3) {
                            throw new Error('Category should have 1-3 items');
                        }
                        for (const item of value) {
                            if (
                                ![
                                    'business',
                                    'entertainment',
                                    'politics',
                                    'science',
                                    'sports',
                                    'technology',
                                    'world',
                                    'lifestyle',
                                ].includes(item)
                            ) {
                                throw new Error(
                                    `Invalid category value: ${item}`
                                );
                            }
                        }
                    },
                },
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isIn: [[10, 20, 30, 40, 50, 60]],
                },
            },

            screen_mode: {
                type: DataTypes.ENUM('dark', 'light'),
                allowNull: false,
                defaultValue: 'light',
            },
            text_size: {
                type: DataTypes.ENUM('small', 'large'),
                allowNull: false,
                defaultValue: 'large',
            },
            auth_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'profile',
            tableName: 'profile',
        }
    );

    return ProfileModel;
};
