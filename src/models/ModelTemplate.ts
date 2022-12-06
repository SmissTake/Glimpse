import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/database'

import { User } from './UserTemplate'

export class ModelTemplate extends Model
{
    declare id: number;
    declare name: string;
    declare description: string;
    declare user_id: number;
    declare created_at: Date;
}

ModelTemplate.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
},
{
    sequelize,
    tableName: "Model",
    createdAt: "created_at",
}
);

ModelTemplate.belongsTo(User, {foreignKey: "idUsers"});
User.hasOne(ModelTemplate, {foreignKey: "idUsers"});