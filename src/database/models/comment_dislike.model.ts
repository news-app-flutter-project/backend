// commentDislike.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface CommentDislike extends TimeStampModel {
        id: number;
        profile_id: number;
        comment_id: number;
    }
    type CommentDislikeCreateInterface = Omit<
        CommentDislike,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class CommentDislikeModel
    extends Model<CommentDislike, CommentDislikeCreateInterface>
    implements CommentDislike
{
    public id!: number;
    public profile_id!: number;
    public comment_id!: number;
}

export const CommentDislikeGenerator = (
    sequelize: Sequelize
): typeof CommentDislikeModel => {
    CommentDislikeModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            comment_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'comment',
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
            modelName: 'commentDislike',
            tableName: 'comment_dislike',
        }
    );
    return CommentDislikeModel;
};
