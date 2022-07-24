import Joi from "joi";
export var testSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().integer().positive().required(),
    teacherId: Joi.number().integer().positive().required(),
    disciplineId: Joi.number().integer().positive().required()
});
