const Joi = require('joi');

function formatErroArr(errorsObj) {
  // return errorsObj;
  return errorsObj.details.map((erObj) => ({
    field: erObj.path[0],
    error: erObj.message,
  }));
}

async function checkLoginBody(req, res, next) {
  // aprasom koks bus musu objektas
  const regSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().required(),
  });
  // testuojam ar attitinka objektas musu schema
  try {
    const validatonResult = await regSchema.validateAsync(req.body, {
      // rodyti visas klaidas
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkRegBodyy ===', error);
    // parasyti funkcija errorDetails(error)
    // grazina masyva kuriame yra objektas { field: name, err: "required field"}
    res.status(400).json(formatErroArr(error));
  }
}

async function checkRegBody(req, res, next) {
  // aprasom koks bus musu objektas
  const logSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().min(3),
    roleId: Joi.number().required(),
  });
  // testuojam ar attitinka objektas musu schema
  try {
    const validatonResult = await logSchema.validateAsync(req.body, {
      // rodyti visas klaidas
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkRegBodyy ===', error);
    // parasyti funkcija errorDetails(error)
    // grazina masyva kuriame yra objektas { field: name, err: "required field"}
    res.status(400).json(formatErroArr(error));
  }
}
async function checkItemBody(req, res, next) {
  // aprasom koks bus musu objektas
  const itemSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    price: Joi.number().required(),
    description: Joi.string().min(5).required(),
    image: Joi.string(),
    itemTypeId: Joi.number().min(1).max(1),
  });
  // testuojam ar attitinka objektas musu schema
  try {
    const validatonResult = await itemSchema.validateAsync(req.body, {
      // rodyti visas klaidas
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkItemBody ===', error);
    // parasyti funkcija errorDetails(error)
    // grazina masyva kuriame yra objektas { field: name, err: "required field"}
    res.status(400).json(formatErroArr(error));
  }
}
async function checkOrderBody(req, res, next) {
  // aprasom koks bus musu objektas
  const orderSchema = Joi.object({
    userId: Joi.number().required(),
    shopItemId: Joi.number().required(),
    quantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().required(),
  });
  // testuojam ar attitinka objektas musu schema
  try {
    const validatonResult = await orderSchema.validateAsync(req.body, {
      // rodyti visas klaidas
      abortEarly: false,
    });
    console.log('validatonResult ===', validatonResult);
    next();
  } catch (error) {
    console.log('error checkOrderBody ===', error);
    // parasyti funkcija errorDetails(error)
    // grazina masyva kuriame yra objektas { field: name, err: "required field"}
    res.status(400).json(formatErroArr(error));
  }
}
module.exports = {
  checkRegBody,
  checkItemBody,
  checkOrderBody,
  checkLoginBody,
};
