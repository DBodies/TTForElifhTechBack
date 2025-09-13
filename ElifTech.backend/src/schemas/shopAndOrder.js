import Joi from 'joi';

export const shopQuerySchema = Joi.object({
  sort: Joi.string().valid('price_asc', 'price_desc', 'date_asc', 'date_desc'),
  favoritesFirst: Joi.boolean()
});


export const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      flowerId: Joi.string().required().messages({
        'any.required': 'flowerId is required'
      }),
      quantity: Joi.number().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
      }),
      priceAtOrder: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be at least 0',
        'any.required': 'Price at order is required'
      })
    })
  ).min(1).required().messages({
    'array.base': 'Items must be an array',
    'array.min': 'Order must contain at least one item',
    'any.required': 'Items are required'
  }),

  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': `"email" must be a valid email. Example: "example@gmail.com"`,
    'string.min': `"email" must be at least {#limit} characters`,
    'string.max': `"email" must be at most {#limit} characters`,
    'any.required': 'Email is required'
  }),

  phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required().messages({
    'string.pattern.base': 'Phone number must contain 10–15 digits and may start with +',
    'any.required': 'Phone number is required'
  }),

  deliveryAddress: Joi.string().min(5).required().messages({
    'string.base': 'Delivery address must be a string',
    'any.required': 'Delivery address is required'
  }),

  clientTimezone: Joi.string().required().messages({
    'string.base': 'Timezone must be a string (e.g., "Europe/Kiev")',
    'any.required': 'Timezone is required'
  })
});
