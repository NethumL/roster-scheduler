import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export default Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .messages({
      'string.pattern.base':
        '"Name" must only contain alpha-numeric characters and spaces',
    })
    .label('Name'),
  username: Joi.string().required().alphanum().label('Username'),
  password: joiPassword
    .string()
    .required()
    .min(8)
    .max(256)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .label('Password'),
  userType: Joi.valid('CONSULTANT', 'DOCTOR').required().label('Type'),
});
