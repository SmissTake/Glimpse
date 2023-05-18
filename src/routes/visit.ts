import express from "express";
import { VisiteController } from "../controllers/VisiteController";
import * as Auth from '../middleware/authenticate';

const visitController = new VisiteController();

export const routerVisit = express.Router({
    strict:true
});
/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: API for managing visits
 * /visit:
 *   post:
 *     summary: Create a new visit
 *     tags: [Visits]
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
 *                 description: The ID of the place being visited
 *             required:
 *               - placeId
 *     responses:
 *       201:
 *         description: Visit created
 *       400:
 *         description: Invalid request body
 * /unvisit:
 *   delete:
 *     summary: Delete a visit
 *     tags: [Visits]
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
 *                 description: The ID of the place to unvisit
 *             required:
 *               - placeId
 *     responses:
 *       204:
 *         description: Visit deleted
 *       400:
 *         description: Invalid request body
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
routerVisit.route('/visit').post(Auth.authorize(['Utilisateur', 'Administrateur']), visitController.create);
routerVisit.route('/unvisit').delete(Auth.authorize(['Utilisateur', 'Administrateur']), visitController.delete);