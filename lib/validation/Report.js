import pick from 'lodash/pick';
import Joi from 'joi';
import objId from 'joi-objectid';

const objectId = objId(Joi);

const ReportValidationSchema = {
  subject: Joi.string().required().min(3).max(255).label('Subject'),
  description: Joi.string().required().min(3).max(1023).label('Description'),
  user: objectId().required().label('User'),
  resolved: Joi.boolean().required().label('Resolved'),
};

export default function validateReport(report, props = []) {
  const schema =
    props.length === 0
      ? Joi.object(ReportValidationSchema)
      : Joi.object(pick(ReportValidationSchema, props));
  const object = props.length === 0 ? report : pick(report, props);

  return schema.validate(object, { abortEarly: false });
}
