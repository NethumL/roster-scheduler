import pick from 'lodash/pick';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserValidationSchema = {
  username: Joi.string().required().min(3).max(63).label('Username'),
  name: Joi.string().required().min(3).max(63).label('Name'),
  password: joiPassword
    .string()
    .required()
    .min(8)
    .max(255)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .label('Password'),
  type: Joi.string()
    .valid('CONSULTANT', 'DOCTOR', 'ADMIN')
    .required()
    .label('Type'),
};

export default function validateUser(report, props = []) {
  const schema =
    props.length === 0
      ? Joi.object(UserValidationSchema)
      : Joi.object(pick(UserValidationSchema, props));
  const object = props.length === 0 ? report : pick(report, props);

  return schema.validate(object, { abortEarly: false });
}
