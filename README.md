# 03 — Environment Variables, Exception Handling, Transactions, and Pagination

## In This Branch
- Installing Config module to set up environment variables.
- Replacing database details with environment variables.
- Creating custom config files.
- Validating environment variables with the Joi package.
- Exception handling.
- Transactions and TypeORM `QueryRunner`.
- Implementing pagination.
- Defining a unified response shape.

---

## Notes

- NestJS uses the `.env` package behind the scenes but provides more functionality for different environments when you install the Config module.
- Using `process.env` to access environment variables works, but using `ConfigService` offers more control and flexibility.
- For Jest to work properly with environment variables:
  - Adjust the `rootDir` in both the `jest` config in `package.json` and in the `jest-e2e.json` file.
  - Add `modulePaths` in both with `[["<rootDir>"]]` as a value.
  - This adjustment ensures environment variables work correctly in testing.
- `NODE_ENV` is set by NestJS and shows the current running environment. Use it to set appropriate configurations in the `AppModule`.
- The `registerAs` function in NestJS enables you to create custom config files with namespaces, which can be used in modules via the `ConfigModule`.
- You can create configs specific to a module in large-scale apps.  
  **Example:** If a user fetches profile data from Google using an API key, inject this config only in the `UserModule` to be used in its services.
- Validating environment variables with Joi:
  - Sets a clear schema for expected envs.
  - Shows descriptive errors if any are missing.
  - Helps new developers understand required configuration.
- Handle exceptions in **service files** since they contain your business logic.
- NestJS provides many built-in exception classes that cover most common cases—use them when possible.
- **Identifying Points of Failure (POFs)** is the first step in exception handling. Common POFs include:
  - Database interactions.
  - Model constraints (e.g., duplicate keys).
  - External API calls (e.g., fetching a Google profile).
- Logging exceptions/errors to the database can be valuable for debugging and monitoring.
- NestJS allows custom exceptions using the `HttpException` class.
- If you’re using an **array of DTOs** as a type, validation won’t apply to nested objects automatically:
  - Create a new DTO that uses `@ValidateNested()` and the `@Type()` decorator for proper validation.
- It’s a **great practice** to standardize pagination as part of the **global response shape** for all list endpoints:
  - This makes it easy for frontend integration and consistent pagination rules.
  - See `slides/paginated-response.png` for an example response format.
- Enable `enableImplicitConversion` in the `ValidationPipe` in `main.ts` to allow automatic type conversion, avoiding the need for manual conversion decorators in each DTO property.
- Typically, you create a **global pagination DTO** and merge it with other query DTOs using `IntersectionType`.
- Creating a **pagination provider** with a shared interface that defines the response shape for all paginated fetches is highly recommended.  
  - See the `common/paginating` directory for an example of modular pagination functionality.
