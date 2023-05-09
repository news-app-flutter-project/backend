import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Bookmark extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        folder_id?: number;
    }
}

export type BookmarkCreateInterface = Omit<
    Bookmark,
    'id' | 'profile_id' | 'folder_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class BookmarkModel
    extends Model<Bookmark, BookmarkCreateInterface>
    implements Bookmark
{
    public id!: number;
    public profile_id!: number;
    public news_id!: number;
    public folder_id?: number;
}

export const BookmarkGenerator = (
    sequelize: Sequelize
): typeof BookmarkModel => {
    BookmarkModel.init(
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
            folder_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'bookmark_folder',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'bookmark',
            tableName: 'bookmark',
        }
    );
    return BookmarkModel;
};
