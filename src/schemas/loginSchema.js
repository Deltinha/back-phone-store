import Joi from 'joi';

export default function validalidateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: Joi.string().min(6).max(15).required(),
  });

  const validation = schema.validate(obj);
  return validation.error;
}
