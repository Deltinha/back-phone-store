import Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
  password: Joi.string().min(6).max(15).required(),
  cep: Joi.string().required().length(9),
  state: Joi.string().required(),
  city: Joi.string().required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  addressNumber: Joi.string().required(),
  complement: Joi.string(),
  cpf: Joi.string().required().length(11),
  phoneNumber: Joi.string().required().min(8).max(15),
});

const validation = schema.validate(req.body);

const body = {
  firstName,
  lastName,
  email,
  password,
  cep,
  state,
  city,
  neighborhood,
  street,
  addressNumber,
  complement,
  cpf,
  phoneNumber,
};
