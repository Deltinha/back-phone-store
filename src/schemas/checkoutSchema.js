import Joi from 'joi';

export default function validadeCheckoutSyntax(obj) {
  const schema = Joi.array().items(
    Joi.object({
      productId: Joi.number().required(),
      qty: Joi.number().required(),
    }),
  );
  const validation = schema.validate(obj);
  return !validation.error;
}
