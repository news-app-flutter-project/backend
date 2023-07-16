import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Comments extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        content: string;
        isLike?: boolean;
        likeCount?: number;
    }
    type CommentCreateInterface = Omit<
        Comments,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class CommentModel
    extends Model<Comments, CommentCreateInterface>
    implements Comments
{
    public id!: number;
    public profile_id!: number;
    public news_id!: number;
    public content!: string;
}

export const CommentGenerator = (sequelize: Sequelize): typeof CommentModel => {
    CommentModel.init(
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
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'comment',
            tableName: 'comment',
        }
    );
    return CommentModel;
};
