import Joi from 'joi';
import objId from 'joi-objectid';

const objectId = objId(Joi);

export default Joi.object({
  doctor: Joi.string().required().label('Doctor'),
});
