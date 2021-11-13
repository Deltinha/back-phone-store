import Joi from 'joi';

export default function validalidateUserInfo(obj) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    cep: Joi.string().required().length(8),
    complement: Joi.string(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    neighborhood: Joi.string().required(),
    street: Joi.string().required(),
    addressNumber: Joi.string().required(),
    cpf: Joi.string().required().length(11),
    phoneNumber: Joi.string().required().min(8).max(15),
  });

  const validation = schema.validate(obj);
  return validation.error;
}
