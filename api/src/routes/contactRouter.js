import express from 'express';
import contactController from '../controllers/contactController.js';

const contactRouter = express.Router();
contactRouter.post('/',(req,res) => {
    contactController.sendEmail(req,res);
});

export default contactRouter;