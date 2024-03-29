import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Reader extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        age: Age;
        sex: Sex;
        category: Category;
    }
}

export type ReaderCreateInterface = Omit<
    Reader,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class ReaderModel
    extends Model<Reader, ReaderCreateInterface>
    implements Reader
{
    public id!: number;
    public profile_id!: number;
    public news_id!: number;
    public age!: Age;
    public sex!: Sex;
    public category!: Category;
}

export const ReaderGenerator = (sequelize: Sequelize): typeof ReaderModel => {
    ReaderModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            profile_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'profile',
                    key: 'id',
                },
            },
            news_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'news',
                    key: 'id',
                },
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isIn: [[10, 20, 30, 40, 50, 60]],
                },
            },
            sex: {
                type: DataTypes.ENUM('male', 'female'),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'reader',
            tableName: 'reader',
            indexes: [
                {
                    unique: true,
                    fields: ['profile_id', 'news_id'],
                },
            ],
        }
    );
    return ReaderModel;
};
