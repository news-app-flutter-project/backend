import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface MemoFolder extends TimeStampModel {
        id: number;
        profile_id: number;
        name: string;
    }
}

export type MemoFolderCreateInterface = Omit<
    MemoFolder,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class MemoFolderModel
    extends Model<MemoFolder, MemoFolderCreateInterface>
    implements MemoFolder
{
    public id!: number;
    public profile_id!: number;
    public name!: string;
}

export const MemoFolderGenerator = (
    sequelize: Sequelize
): typeof MemoFolderModel => {
    MemoFolderModel.init(
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'memo_folder',
            tableName: 'memo_folder',
        }
    );
    return MemoFolderModel;
};
