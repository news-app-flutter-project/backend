import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Bookmark_Folder extends TimeStampModel {
        id: number;
        profile_id: number;
        name: string;
    }
}

export type Bookmark_FolderCreateInterface = Omit<
    Bookmark_Folder,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Bookmark_FolderModel
    extends Model<Bookmark_Folder, Bookmark_FolderCreateInterface>
    implements Bookmark_Folder
{
    public id!: number;
    public profile_id!: number;
    public name!: string;
}

export const Bookmark_FolderGenerator = (
    sequelize: Sequelize
): typeof Bookmark_FolderModel => {
    Bookmark_FolderModel.init(
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
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'bookmark_folder',
            tableName: 'bookmark_folder',
        }
    );
    return Bookmark_FolderModel;
};
