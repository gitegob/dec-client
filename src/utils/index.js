import Joi from 'joi';

export const pusher = (history, path) => {
  if (history.location.pathname === path) history.replace(path);
  else history.push(path);
};

export const fetcher = async (url, config) => {
  try {
    const data = await fetch(url, config);
    const res = data.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const validator = (obj, valSchema) => {
  const schema = {
    entrySchema: Joi.object({
      customerrefno: Joi.string()
        .min(1)
        .trim()
        .regex(/^[\s0-9]{1,}$/)
        .required()
        .error(new Error("Customer ref number is required and must be a set of numbers")),
      customername: Joi.string()
        .min(3)
        .trim()
        .regex(/^[\sA-Za-z.,-]{1,}$/)
        .required()
        .error(new Error('Customer name must be alteast 3 letters')),
      citystate: Joi.string()
        .min(3)
        .trim()
        .regex(/^[\sA-Za-z.,-]{1,}$/)
        .required()
        .error(new Error('City and state must be alteast 3 letters')),
      guarantorname: Joi.string()
        .min(3)
        .trim()
        .regex(/^[\sA-Za-z.,-]{1,}$/)
        .required()
        .error(new Error('Guarantor name must be alteast 3 letters')),
      guarantorrefno: Joi.string()
        .min(1)
        .trim()
        .regex(/^[\s0-9]{1,}$/)
        .required()
        .error(new Error("Guarantor ref number is required and must be a set of numbers")),
      amount: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Amount is required and must be a number')),
      DPRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Down Payment Rate is required and must be a number')),
      loanPeriod: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Loan Period is required and must be a number')),
      AIRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Annual Interest Rate is required and must be a number')),
      PVRRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Purchase Value Reduction Rate is required and must be a number')),
      MPRRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Monthly Principal Reduction Rate is required and must be a number')),
      TIRRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Total Interest Reduction Rate is required and must be a number')),
      PTRRate: Joi.string()
        .regex(/^[0-9.]{1,}$/)
        .min(1)
        .trim()
        .required()
        .error(new Error('Property Tax Reduction Rate is required and must be a number')),
    }),
    addUserSchema: Joi.object({
      username: Joi.string()
        .regex(/^[a-zA-Z]([a-zA-Z0-9_.]){3,20}$/)
        .required()
        .error(new Error('Username must be 4-20 characters with letters and numbers and start with a letter')),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z]).{5,128}$/)
        .required()
        .error(new Error('Weak Password (atleast 6 characters with atleast 1 capital letter)')),
    }),

  };
  const { error } = schema[valSchema].validate(obj);
  return error?.message;
};

export const errorTimeout = (seterror) => setTimeout(() => {
  seterror('');
}, 2000);