import express from "express";
import UserController from "../controllers/UserController";
import userValidation from "../validations/UserValidations";

const router = express.Router()

router.post('/register',
    userValidation,
    UserController.registerUser
)

export default router
