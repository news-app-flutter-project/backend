import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Memo extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        memo_folder_id?: number | null;
        content: string;
    }
}

export type MemoCreateInterface = Omit<
    Memo,
    'id' | 'memo_folder_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class MemoModel
    extends Model<Memo, MemoCreateInterface>
    implements Memo
{
    public id!: number;
    public profile_id!: number;
    public news_id!: number;
    public memo_folder_id!: number | null;
    public content!: string;
}

export const MemoGenerator = (sequelize: Sequelize): typeof MemoModel => {
    MemoModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'news',
                    key: 'id',
                },
            },
            profile_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'profile',
                    key: 'id',
                },
            },
            memo_folder_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'memo_folder',
                    key: 'id',
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'memo',
            tableName: 'memo',
        }
    );
    return MemoModel;
};
