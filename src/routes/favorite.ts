import express from "express";
import { FavoriteController } from "../controllers/FavoriteController";
import * as Auth from '../middleware/authenticate';

const favoriteController = new FavoriteController();

export const routerFavorite = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: API for managing favorites
 * /favorite:
 *   post:
 *     summary: Create a new favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeId:
 *                 type: integer
 *                 description: The ID of the place being favorited
 *             required:
 *               - placeId
 *     responses:
 *       201:
 *         description: Favorite created
 *       400:
 *         description: Invalid request body
 * /unfavorite:
 *   delete:
 *     summary: Delete a favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeId:
 *                 type: integer
 *                 description: The ID of the place to unfavorite
 *             required:
 *               - placeId
 *     responses:
 *       204:
 *         description: Favorite deleted
 *       400:
 *         description: Invalid request body
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
routerFavorite.route('/favorite').post(Auth.authorize(['Utilisateur', 'Administrateur']), favoriteController.create);
routerFavorite.route('/unfavorite').delete(Auth.authorize(['Utilisateur', 'Administrateur']), favoriteController.delete);