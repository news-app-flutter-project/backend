// commentLike.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface CommentLike extends TimeStampModel {
        id: number;
        profile_id: number;
        comment_id: number;
    }
    type CommentLikeCreateInterface = Omit<
        CommentLike,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class CommentLikeModel
    extends Model<CommentLike, CommentLikeCreateInterface>
    implements CommentLike
{
    public id!: number;
    public profile_id!: number;
    public comment_id!: number;
}

export const CommentLikeGenerator = (
    sequelize: Sequelize
): typeof CommentLikeModel => {
    CommentLikeModel.init(
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
            modelName: 'commentLike',
            tableName: 'comment_like',
        }
    );
    return CommentLikeModel;
};
