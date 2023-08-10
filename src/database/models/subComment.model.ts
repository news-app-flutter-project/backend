import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface SubComment extends TimeStampModel {
        id: number;
        comment_id: number;
        profile_id: number;
        content: string;
        isLike?: boolean;
        likeCount?: number;
    }
    type SubCommentCreateInterface = Omit<
        SubComment,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;

    type SubCommentUpdateInterface = Omit<
        SubComment,
        'createdAt' | 'updatedAt' | 'deletedAt' | 'profile_id' | 'comment_id'
    >;
}

export class SubCommentModel
    extends Model<SubComment, SubCommentCreateInterface>
    implements SubComment
{
    public id!: number;
    public comment_id!: number;
    public profile_id!: number;
    public content!: string;
}

export const SubCommentGenerator = (
    sequelize: Sequelize
): typeof SubCommentModel => {
    SubCommentModel.init(
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
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'sub_comment',
            tableName: 'sub_comment',
        }
    );
    return SubCommentModel;
};
