import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Reader extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        age: string;
        sex: Sex;
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
    public age!: string;
    public sex!: Sex;
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
            age: {
                type: DataTypes.ENUM('10', '20', '30', '40', '50', '60', '70'),
                allowNull: false,
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
