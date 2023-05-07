import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    // rows for the news table
    interface News extends TimeStampModel {
        id: number;
        category: Category;
        keywords: string[] | null;
        title: string;
        description: string;
        content: string;
        creator: string[] | null;
        pub_date: Date;
        image_url: string | null;
        link: string | null;
        company: string | null;
        language: string | null;
        gpt_keywords: string[] | null;
    }
}

// creator type that is required to create the instance of NewsModel class
export type NewsCreateInterface = Omit<
    News,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'gpt_keywords'
>;

// Model<rows, creator>

export class NewsModel
    extends Model<News, NewsCreateInterface>
    implements News
{
    public id!: number;
    public category!: Category;
    public keywords!: string[] | null;
    public title!: string;
    public description!: string;
    public content!: string;
    public creator!: string[] | null;
    public pub_date!: Date;
    public image_url!: string | null;
    public link!: string | null;
    public company!: string | null;
    public language!: string | null;
    public gpt_keywords!: string[] | null;
    public createdAt: Date | undefined;
    public updatedAt: Date | undefined;
    public deletedAt: Date | null | undefined;
}

export const NewsGenerator = (sequelize: Sequelize): typeof NewsModel => {
    NewsModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            keywords: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            creator: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            pub_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            image_url: {
                type: DataTypes.STRING(2048),
                allowNull: true,
            },
            link: {
                type: DataTypes.STRING(2048),
                allowNull: true,
            },
            company: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            language: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            gpt_keywords: {
                type: DataTypes.JSON,
                allowNull: true,
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
            // automate createdAt and updatedAt
            // i actually dont need to specify these keys above
            timestamps: true,
            // automate deletedAt
            paranoid: true,
            modelName: 'News',
            tableName: 'news',
        }
    );
    return NewsModel;
};
