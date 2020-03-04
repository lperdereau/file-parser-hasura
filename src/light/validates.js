Joi = require('joi');

module.exports = {
  csv: {
    payload: {
      csv: Joi.any()
        .meta({ swaggerType: 'file' })
        .optional()
        .allow('')
        .description('csv file'),
    },
  }
}