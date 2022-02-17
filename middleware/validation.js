const Joi = require("joi");

module.exports = { 
    recordValidation: async(req, res, next) => {

    // Validate body input
    const recordRequestSchema = Joi.object({
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
      minCount: Joi.number().min(0).required(),
      maxCount: Joi.number().min(0).greater(Joi.ref("minCount")).required(),
    });
    const options = {
        abortEarly: false, // all errors
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
