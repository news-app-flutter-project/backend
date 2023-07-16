// subCommentLike.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface SubCommentLike extends TimeStampModel {
        id: number;
        profile_id: number;
        sub_comment_id: number;
    }
    type SubCommentLikeCreateInterface = Omit<
        SubCommentLike,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class SubCommentLikeModel
    extends Model<SubCommentLike, SubCommentLikeCreateInterface>
    implements SubCommentLike
{
    public id!: number;
    public profile_id!: number;
    public sub_comment_id!: number;
}

export const SubCommentLikeGenerator = (
    sequelize: Sequelize
): typeof SubCommentLikeModel => {
    SubCommentLikeModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            sub_comment_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'sub_comment',
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
            modelName: 'subCommentLike',
            tableName: 'sub_comment_like',
        }
    );
    return SubCommentLikeModel;
};
