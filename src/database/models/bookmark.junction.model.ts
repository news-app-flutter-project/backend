import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface BookmarkFolderItem extends TimeStampModel {
        id: number;
        bookmark_id: number;
        folder_id: number;
        profile_id: number;
    }
}

export type BookmarkFolderItemCreateInterface = Omit<
    BookmarkFolderItem,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class BookmarkFolderItemModel
    extends Model<BookmarkFolderItem, BookmarkFolderItemCreateInterface>
    implements BookmarkFolderItem
{
    public id!: number;
    public bookmark_id!: number;
    public folder_id!: number;
    public profile_id!: number;
}
export const BookmarkFolderItemGenerator = (
    sequelize: Sequelize
): typeof BookmarkFolderItemModel => {
    BookmarkFolderItemModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            bookmark_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'bookmark',
                    key: 'id',
                },
            },
            folder_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'bookmark_folder',
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
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'bookmark_folder_item',
            tableName: 'bookmark_folder_item',
        }
    );
    return BookmarkFolderItemModel;
};
