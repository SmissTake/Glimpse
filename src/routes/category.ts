import express from "express";
import { CategoryController } from '../controllers/CategoryController';

const categoryController = new CategoryController();

export const routerCategory = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 * /category/listall:
 *   get:
 *     summary: Get a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the category
 *                   label:
 *                     type: string
 *                     description: The label of the category
 *                   avatar:
 *                     type: string
 *                     description: The avatar of the category
 *                   is_active:
 *                     type: boolean
 *                     description: Whether the category is active or not
 * /category/listplaces/{id}:
 *   get:
 *     summary: Get a list of places for a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to get places for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of places for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the place
 *                   name:
 *                     type: string
 *                     description: The name of the place
 *                   description:
 *                     type: string
 *                     description: The description of the place
 *                   latitude:
 *                     type: number
 *                     description: The latitude of the place
 *                   longitude:
 *                     type: number
 *                     description: The longitude of the place
 *                   category_id:
 *                     type: integer
 *                     description: The ID of the category the place belongs to
 *                   is_active:
 *                     type: boolean
 *                     description: Whether the place is active or not
 *       404:
 *         description: Category not found
 */
routerCategory.route('/category/listall').get(categoryController.listAll);
routerCategory.route('/category/listplaces/:id').get(categoryController.listPlaces);