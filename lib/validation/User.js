import _ from 'lodash';
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
    .max(12)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
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
      : Joi.object(_.pick(UserValidationSchema, props));
  const object = props.length === 0 ? report : _.pick(report, props);

  return schema.validate(object, { abortEarly: false });
}
