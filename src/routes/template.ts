import express from "express";
import { TemplateController } from '../controllers/TemplateController';
import * as Auth from '../middleware/authenticate';

const templateController = new TemplateController();

export const router = express.Router({
    strict:true
});

router.route('/recipe/show/:id').get(templateController.read);
router.route('/recipe/showone/:name').get(templateController.showOne);
router.route('/recipe/list/:id').get(templateController.list)
router.route('/recipe/add').post(Auth.authorize(['Administrateur']), templateController.create);
router.route('/recipe/update/:id').put(Auth.authorize(['Administrateur']), templateController.update);