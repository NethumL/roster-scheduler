import pick from 'lodash/pick';
import Joi from 'joi';
import objId from 'joi-objectid';

const objectId = objId(Joi);

const WardValidationSchema = {
  name: Joi.string().required().min(1).label('Name'),
  description: Joi.string().required().label('Description'),
  personInCharge: objectId().required().label('Person in charge'),
  numberOfDutyCycles: Joi.number().required().min(1).label('Number of duty cycles'),
  shifts: Joi.array().items(objectId()).min(1).unique().label('Shifts/Duty cycles');
  minNumberOfDoctors: Joi.number().min(0).label('Minimum number of doctors'),
  maxNumberOfLeaves: Joi.number().min(0).max(31).label('Maximum number of leave dates'),
  minNumberOfDoctorsPerShift: Joi.number().min(0).label('Minimum number of doctors per shift'),
  allowAdjacentShifts: Joi.boolean().required().label('Same doctor has not to be given both last shift of the day & first shift of the next Day'),
  doctors: Joi.array().items(objectId()).required().unique().label('Doctors'),
};

export default function validateWard(ward, props = []) {
  const schema =
    props.length === 0
      ? Joi.object(WardValidationSchema)
      : Joi.object(pick(WardValidationSchema, props));
  const object = props.length === 0 ? ward : pick(ward, props);

  return schema.validate(object, { abortEarly: false });
}
