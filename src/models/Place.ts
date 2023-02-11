import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../config/database';

import { User } from './User';
import { Accessibility } from './Accessibility';
import { Category } from './Category';
import { Comment } from './Comment';
import { PicturePlace } from './PicturePlace';
import { Favorite } from './Favorite';

export class Place extends Model
{
    declare id: number;
    declare title: string;
    declare description: string;
    declare history: string;
    declare town: string;
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
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    history: {
        type: DataTypes.STRING,
        allowNull: true
    },
    town: {
        type: DataTypes.STRING,
        allowNull: true
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoriesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    accessibilitiesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Accessibility,
            key: 'id'
        }
    },
    usersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},
{
    sequelize,
    tableName: "places",
    createdAt: "created_at",
    updatedAt: false
}
);


PicturePlace.belongsTo(Place, {foreignKey: 'placesId'});
Place.hasMany(PicturePlace, {foreignKey: 'placesId'});

Place.belongsTo(Category, {foreignKey: "categoriesId"});
Category.hasOne(Place, {foreignKey: "categoriesId"});

Place.belongsTo(Accessibility, {foreignKey: "accessibilitiesId"});
Accessibility.hasOne(Place, {foreignKey: "accessibilitiesId"});

Place.belongsTo(User, {as:'postedBy', foreignKey: "usersId"});
User.hasMany(Place, {as:'posted', foreignKey: "usersId"});

Comment.belongsTo(Place, {foreignKey: "placesId"});
Place.hasMany(Comment, {foreignKey: "placesId"});

Place.belongsToMany(User, {
    through: Favorite,
    as: 'FavoriteUsers',
    foreignKey: 'placesId'
});

User.belongsToMany(Place, {
    through: Favorite,
    as: 'FavoritePlaces',
    foreignKey: 'usersId'
});