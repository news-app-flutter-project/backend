// subCommentDislike.model.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface SubCommentDislike extends TimeStampModel {
        id: number;
        profile_id: number;
        sub_comment_id: number;
    }
    type SubCommentDislikeCreateInterface = Omit<
        SubCommentDislike,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class SubCommentDislikeModel
    extends Model<SubCommentDislike, SubCommentDislikeCreateInterface>
    implements SubCommentDislike
{
    public id!: number;
    public profile_id!: number;
    public sub_comment_id!: number;
}

export const SubCommentDislikeGenerator = (
    sequelize: Sequelize
): typeof SubCommentDislikeModel => {
    SubCommentDislikeModel.init(
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
            modelName: 'subCommentDislike',
            tableName: 'sub_comment_dislike',
        }
    );
    return SubCommentDislikeModel;
};
