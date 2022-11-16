import pick from 'lodash/pick';
import Joi from 'joi';
import objId from 'joi-objectid';

const objectId = objId(Joi);

const PrefereceValidationSchema = {
  doctor: objectId().required().label('Person in charge'),
  preferenceOrder: Joi.array()
    .items(objectId())
    .unique()
    .label('Preference Order'),
  leaveDates: Joi.array().items(Joi.date().iso()).unique().label('Leave Dates'),
};

export default function validatePreference(pref, props = []) {
  const schema =
    props.length === 0
      ? Joi.object(PreferenceValidationSchema)
      : Joi.object(pick(PreferenceValidationSchema, props));
  const object = props.length === 0 ? pref : pick(pref, props);

  return schema.validate(object, { abortEarly: false });
}
