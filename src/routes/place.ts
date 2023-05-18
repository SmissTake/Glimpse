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
 *         - accessibility_id
 *         - category_id
 *       properties:
 *           id:
 *             type: integer
 *             description: The auto-generated id of the place
 *           title:
 *             type: string
 *             description: The title of the place
 *           description:
 *             type: string
 *             description: The description of the place
 *           history:
 *             type: string
 *             description: The history of the place
 *           town:
 *             type: string
 *             description: The town of the place
 *           is_active:
 *             type: boolean
 *             description: Whether the place is active or not
 *           keyword:
 *             type: string
 *             description: The keywords associated with the place
 *           categoriesId:
 *             type: integer
 *             description: The ID of the category associated with the place
 *           accessibilitiesId:
 *             type: integer
 *             description: The ID of the accessibility associated with the place
 *           usersId:
 *             type: integer
 *             description: The ID of the user who posted the place
 *           created_at:
 *             type: string
 *             format: date-time
 *             description: The date and time the place was created
 *           PicturePlaces:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL of the picture associated with the place
 *           postedBy:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the user who posted the place
 *               pseudonym:
 *                 type: string
 *                 description: The pseudonym of the user who posted the place
 *               avatar:
 *                 type: string
 *                 description: The URL of the avatar of the user who posted the place
 *           Category:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: The label of the category associated with the place
 *           Accessibility:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: The label of the accessibility associated with the place
 *           Comments:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: string
 *                   description: The comment associated with the place
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the comment was created
 *                 PictureComments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: The URL of the picture associated with the comment
 *                 postedBy:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user who posted the comment
 *                     pseudonym:
 *                       type: string
 *                       description: The pseudonym of the user who posted the comment
 *                     avatar:
 *                       type: string
 *                       description: The URL of the avatar of the user who posted the comment
 *           FavoriteUsers:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the favorite
 *                 Favorite:
 *                   type: object
 *                   properties:
 *                     usersId:
 *                       type: integer
 *                       description: The ID of the user who favorited the place
 *                     placesId:
 *                       type: integer
 *                       description: The ID of the place that was favorited
 *       example:
 *         title: Fonderie Abandonnee
 *         description: Fonderie Abandonnée dans les alentours de Rennes. Lieu agréable mais protégé et parfois dangereux
 *         history: Histoire de la fonderie
 *         town: Rennes
 *         is_active: true
 *         keyword: fonderie, abandonnée, Rennes
 *         categoriesId: 1
 *         accessibilitiesId: 2
 *         usersId: 1
 *         created_at: 2022-12-06T10:23:01.000Z
 *         PicturePlaces:
 *           - url: https://example.com/place1.jpg
 *           - url: https://example.com/place2.jpg
 *         postedBy:
 *           id: 1
 *           pseudonym: JohnDoe
 *           avatar: https://example.com/avatar.jpg
 *         Category:
 *           label: Abandoned places
 *         Accessibility:
 *           label: Difficult access
 *         Comments:
 *           - comment: This place is amazing!
 *             created_at: 2022-12-07T10:23:01.000Z
 *             PictureComments:
 *               - url: https://example.com/comment1.jpg
 *               - url: https://example.com/comment2.jpg
 *             postedBy:
 *               id: 2
 *               pseudonym: JaneDoe
 *               avatar: https://example.com/avatar2.jpg
 *           - comment: I've been there too, it's really cool!
 *             created_at: 2022-12-08T10:23:01.000Z
 *             PictureComments:
 *               - url: https://example.com/comment3.jpg
 *             postedBy:
 *               id: 3
 *               pseudonym: BobSmith
 *               avatar: https://example.com/avatar3.jpg
 *         FavoriteUsers:
 *           - id: 1
 *             Favorite:
 *               usersId: 2
 *               placesId: 1
 *           - id: 2
 *             Favorite:
 *               usersId: 3
 *               placesId: 1
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
 *   get:
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