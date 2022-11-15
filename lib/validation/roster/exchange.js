import Joi from 'joi';

export default Joi.object({
  shiftDate: Joi.date().iso().required(),
  shift: Joi.string().required(),
  otherDoctor: Joi.string().required(),
  otherShiftDate: Joi.date().iso().required(),
  otherShift: Joi.string().required(),
});
