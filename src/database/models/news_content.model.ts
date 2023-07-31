// NewsContentModel
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface NewsContent extends TimeStampModel {
        id: number;
        news_id: number;
        sentence_no: number;
        content: string;
    }
}

export type NewsContentCreateInterface = Omit<
    NewsContent,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class NewsContentModel
    extends Model<NewsContent, NewsContentCreateInterface>
    implements NewsContent
{
    public id!: number;
    public news_id!: number;
    public sentence_no!: number;
    public content!: string;

    public createdAt: Date | undefined;
    public updatedAt: Date | undefined;
    public deletedAt: Date | null | undefined;
}

export const NewsContentGenerator = (
    sequelize: Sequelize
): typeof NewsContentModel => {
    NewsContentModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            sentence_no: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'NewsContent',
            tableName: 'news_content',
        }
    );
    return NewsContentModel;
};
