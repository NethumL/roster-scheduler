import pick from 'lodash/pick';
import Joi from 'joi';
import objId from 'joi-objectid';

const objectId = objId(Joi);

const ShiftValidationSchema = {
  name: Joi.string().required().min(1).label('Name'),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
};

export default function validateShift(shift, props = []) {
  const schema =
    props.length === 0
      ? Joi.object(ShiftValidationSchema)
      : Joi.object(pick(ShiftValidationSchema, props));
  const object = props.length === 0 ? shift : pick(shift, props);

  return schema.validate(object, { abortEarly: false });
}
