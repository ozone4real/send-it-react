import Joi from 'joi-browser';

export const adminFormSchema = {
  presentLocation: Joi.string()
    .regex(/^[\w\s]{2,20}, [\w\s]{2,20}$/)
    .error(
      new Error(
        "invalid location or location length too long. Provide just city and state name seperated by a comma, e.g: 'Ikeja, Lagos'",
      ),
    ),
  status: Joi.string(),
  receivedAt: Joi.string(),
  receivedBy: Joi.string(),
};

export const destinationFormSchema = {
  streetAddress: Joi.string()
    .min(5)
    .required(),
  city: Joi.string()
    .min(2)
    .required(),
  state: Joi.string()
    .min(2)
    .required(),
};

export const createOrderFormSchema = {
  streetAddress1: Joi.string()
    .min(5)
    .required(),
  city1: Joi.string()
    .min(2)
    .required(),
  state1: Joi.string()
    .min(2)
    .required(),
  streetAddress2: Joi.string()
    .min(5)
    .required(),
  city2: Joi.string()
    .min(2)
    .required(),
  state2: Joi.string()
    .min(2)
    .required(),
  pickupTime: Joi.string().required(),
  parcelDescription: Joi.string()
    .min(2)
    .max(20)
    .required(),
  parcelWeight: Joi.string().required(),
};

export const signupFormSchema = {
  firstName: Joi.string()
    .min(2)
    .max(20)
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(20)
    .required(),
  phoneNo: Joi.string()
    .min(7)
    .max(15)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .alphanum()
    .min(7)
    .required(),
};

export const signinFormSchema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .alphanum()
    .min(7)
    .required(),
};
