import express from "express";
import { PlaceController } from '../controllers/PlaceController';
import * as Auth from '../middleware/authenticate';

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: API for managing places
 * 
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - town
 *         - latitude
 *         - longitude
 *         - accessibility_id
 *         - category_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the place
 *         title:
 *           type: string
 *           description: The title of the place
 *         description:
 *           type: string
 *           description: The description of the place
 *         town:
 *           type: string
 *           description: The town of the place
 *         latitude:
 *           type: number
 *           description: The latitude of the place
 *         longitude:
 *           type: number
 *           description: The longitude of the place
 *         accessibility_id:
 *           type: integer
 *           description: The id of the accessibility of the place
 *         category_id:
 *           type: integer
 *           description: The id of the category of the place
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the place was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the place was last updated
 *         is_active:
 *           type: boolean
 *           description: Whether the place is active or not
 *       example:
 *         title: Place Title
 *         description: Place Description
 *         town: Place Town
 *         latitude: 123.456
 *         longitude: 123.456
 *         accessibility_id: 1
 *         category_id: 1
 *         created_at: 2022-01-01T00:00:00.000Z
 *         updated_at: 2022-01-01T00:00:00.000Z
 *         is_active: true
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /place/show/{id}:
 *   get:
 *     summary: Get a place by id
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the place to retrieve
 *     responses:
 *       200:
 *         description: The place with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: The place with the specified id was not found
 * 
 * /place/update/{id}:
 *   put:
 *     summary: Update a place by id
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the place to update
 *       - in: body
 *         name: place
 *         description: The place to update
 *         schema:
 *           $ref: '#/components/schemas/Place'
 *         required: true
 *     responses:
 *       200:
 *         description: The updated place
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The place with the specified id was not found
 * 
 * /place/delete/{id}:
 *   delete:
 *     summary: Delete a place by id
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the place to delete
 *     responses:
 *       200:
 *         description: The place was deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The place with the specified id was not found
 * 
 * /place/listall:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: All places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 * 
 * /place/create:
 *   post:
 *     summary: Create a new place
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The place to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       200:
 *         description: The created place
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error creating place
 * 
 * /place/search:
 *   post:
 *     summary: Search for places
 *     tags: [Places]
 *     requestBody:
 *       description: The search query, limit, and offset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The search query
 *               limit:
 *                 type: integer
 *                 description: The maximum number of places to return
 *               offset:
 *                 type: integer
 *                 description: The number of places to skip before returning results
 *             example:
 *               query: "place"
 *               limit: 10
 *               offset: 0
 *     responses:
 *       200:
 *         description: The search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Error searching places
 */
const placeController = new PlaceController();

export const routerPlace = express.Router({
    strict:true
});

routerPlace.route('/place/show/:id').get(placeController.read);
routerPlace.route('/place/listall').get(placeController.listAll);
routerPlace.route('/place/count/:id').get(placeController.count);
routerPlace.route('/place/search').get(placeController.search);
routerPlace.route('/place/create').post(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.create);
routerPlace.route('/place/update/:id').put(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.update);
routerPlace.route('/place/delete/:id').delete(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.delete);