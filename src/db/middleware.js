const Joi = require('joi');

function formatErrorArr(errorsObj) {
  return errorsObj.details.map((eObj) => ({
    field: eObj.path[0],
    error: eObj.message,
  }));
}

async function checkNewUser(req, res, next) {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    user_password: Joi.string().min(3).required(),
    user_email: Joi.string().email({ minDomainSegments: 2 }).required(),
    user_role_id: Joi.number().integer().min(1).required(),
  });

  try {
    const validationResult = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult', validationResult);
    next();
  } catch (error) {
    console.log('error in checkNewUser', error);
    res.status(400).json(formatErrorArr(error));
  }
}

async function checkLogin(req, res, next) {
  const schema = Joi.object({
    user_email: Joi.string().email({ minDomainSegments: 2 }).required(),
    user_password: Joi.string().min(3).required(),
  });

  try {
    const validationResult = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult', validationResult);
    next();
  } catch (error) {
    console.log('error in checkLogin', error);
    res.status(400).json(formatErrorArr(error));
  }
}
async function checkNewShopItem(req, res, next) {
  const schema = Joi.object({
    shop_item_name: Joi.string().min(3).max(30).required(),
    shop_item_price: Joi.number().required(),
    shop_item_description: Joi.string().min(3).required(),
    shop_item_image: Joi.string().min(3).required(),
    item_type_id: Joi.number().integer().min(1).required(),
  });

  try {
    const validationResult = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult', validationResult);
    next();
  } catch (error) {
    console.log('error in checkNewShopItem', error);
    res.status(400).json(formatErrorArr(error));
  }
}
async function checkNewOrder(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().integer().min(1).required(),
    shop_item_id: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required(),
    total_price: Joi.number().required(),
    status: Joi.string().min(3).required(),
  });

  try {
    const validationResult = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult', validationResult);
    next();
  } catch (error) {
    console.log('error in checkNewOrder', error);
    res.status(400).json(formatErrorArr(error));
  }
}

module.exports = {
  checkNewUser,
  checkLogin,
  checkNewShopItem,
  checkNewOrder,
};
