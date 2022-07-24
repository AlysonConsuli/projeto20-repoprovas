import Joi from "joi";
export var signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.ref("password")
});
export var signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
