import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/database'

import { User } from './UserTemplate'

export class Place extends Model
{
    declare id: number;
    declare title: string;
    declare description: string;
    declare history: string;
    declare latitude: number;
    declare longitude: number;
    declare keyword: string;
    declare categoriesId: number;
    declare accessibilitiesId: number;
    declare usersId: number;
    declare created_at: Date;
}

Place.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    history: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    categoriesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        }
    },
    accessibilitiesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Accessibility,
            key: 'id',
        }
    },
    usersId: {
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


Place.belongsTo(Category, {foreignKey: "idCategories"});
Category.hasOne(Place, {foreignKey: "idCategories"});

Place.belongsTo(Accessibility, {foreignKey: "idAccessibilities"});
Accessibility.hasOne(Place, {foreignKey: "idAccessibilities"});

Place.belongsTo(User, {foreignKey: "idUsers"});
User.hasOne(Place, {foreignKey: "idUsers"});