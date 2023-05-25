import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface BadWords extends TimeStampModel {
        id: number;
        words: string;
    }
    type BadWordsCreateInterface = Omit<
        BadWords,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class BadWordsModel
    extends Model<BadWords, BadWordsCreateInterface>
    implements BadWords
{
    public id!: number;
    public words!: string;
}

export const BadWordsGenerator = (
    sequelize: Sequelize
): typeof BadWordsModel => {
    BadWordsModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            words: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'bad_words',
            tableName: 'bad_words',
        }
    );
    return BadWordsModel;
};
