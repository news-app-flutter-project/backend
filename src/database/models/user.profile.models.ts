import { Sequelize, DataTypes, Model } from "sequelize";

export interface TestAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TestModel extends Model<TestAttributes> implements TestAttributes {
  public id?: number;
  public name!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const initTestModel = (sequelize: Sequelize) => {
  TestModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "test",
      sequelize,
    }
  );

  return TestModel;
};
