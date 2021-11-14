import Joi from 'joi';

export default function validadeCheckout(obj) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    products: Joi.array().items(
      Joi.object({
        productId: Joi.number().required(),
        qty: Joi.number().required(),
      }),
    ),
  });
  const validation = schema.validate(obj);
  return !validation.error;
}
