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
  JWT_SECRET:joi.string().required(),
  JWT_TOKEN_AUDIENCE:joi.string().required(),
  JWT_TOKEN_ISSUER:joi.string().required(),
  JWT_ACCESS_TOKEN_TTL:joi.number().required(),
  JWT_REFRESH_TOKEN_TTL:joi.number().required(),
  GOOGLE_CLIENT_ID:joi.string().required(),
  GOOGLE_CLIENT_SECRET:joi.string().required(),
  API_VERSION:joi.string().required(),
  S3_BUCKET_NAME:joi.string().required(),
  S3_BUCKET_REGION:joi.string().required(),
  S3_ACCESS_KEY:joi.string().required(),
  S3_SECRET_KEY:joi.string().required(),
  CLOUDFRONT_DISTRO_URL:joi.string().required(),
  MAIL_HOST:joi.string().required(),
  SMTP_USERNAME:joi.string().required(),
  SMTP_PASSWORD:joi.string().required()

});


