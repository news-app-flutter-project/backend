import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Search extends TimeStampModel {
        id: number;
        profile_id: number;
        keyword: string;
    }
}

export type SearchCreateInterface = Omit<
    Search,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class SearchModel
    extends Model<Search, SearchCreateInterface>
    implements Search
{
    public id!: number;
    public keyword!: string;
    public profile_id!: number;
}

export const SearchGenerator = (sequelize: Sequelize): typeof SearchModel => {
    SearchModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            profile_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'profile',
                    key: 'id',
                },
            },
            keyword: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'search',
            tableName: 'search',
        }
    );
    return SearchModel;
};
