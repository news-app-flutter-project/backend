// HighlightModel
import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Highlight extends TimeStampModel {
        id: number;
        profile_id: number;
        news_id: number;
        news_content_id: number;
    }
}

export type HighlightCreateInterface = Omit<
    Highlight,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class HighlightModel
    extends Model<Highlight, HighlightCreateInterface>
    implements Highlight
{
    public id!: number;
    public profile_id!: number;
    public news_id!: number;
    public news_content_id!: number;

    public createdAt: Date | undefined;
    public updatedAt: Date | undefined;
    public deletedAt: Date | null | undefined;
}

export const HighlightGenerator = (
    sequelize: Sequelize
): typeof HighlightModel => {
    HighlightModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            profile_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            news_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            news_content_id: {
                type: DataTypes.INTEGER.UNSIGNED,
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
            modelName: 'Highlight',
            tableName: 'highlights',
        }
    );
    return HighlightModel;
};
