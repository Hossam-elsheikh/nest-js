import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  DB_PORT: joi.number().port().default(5432),
  DB_PWD: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_USER: joi.string().required(),
  PROFILE_API_KEY: joi.string().required(),
});
