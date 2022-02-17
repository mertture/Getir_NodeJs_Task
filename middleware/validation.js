const Joi = require("joi");

module.exports = { 
    recordValidation: async(req, res, next) => {
    console.log(req.body);
    const recordRequestSchema = Joi.object({
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required(),
      minCount: Joi.number().min(0).required(),
      maxCount: Joi.number().min(0).greater(Joi.ref("minCount")).required(),
    });
    const options = {
        abortEarly: false, // include all errors
    };

    try {
        
        const recordBody = await recordRequestSchema.validateAsync(req.body, options);
        req.body = recordBody;
        next();
    
    }
    catch (error) {
        return res.status(400).send({code: 1, msg: `Validation error: ${error.message}`});
    }
  }
};
