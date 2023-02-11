import express from "express";
import { CategoryController } from '../controllers/CategoryController';

const categoryController = new CategoryController();

export const routerCategory = express.Router({
    strict:true
});

routerCategory.route('/category/listall').get(categoryController.listAll);
routerCategory.route('/category/listplaces/:id').get(categoryController.listPlaces);