# 01 Basics

## In This Branch

- Creating modules and controllers manually or using the CLI:  
  `nest generate [type] [name]`
- Managing incoming requests with controllers
- Accessing route parameters, query parameters, headers, IP, and request body
- Using built-in pipes for validation and transformation
- Creating DTOs and using the `class-validator` package for enhanced validations
- Installing the `class-transformer` package to transform plain JavaScript objects into class instances (Nest does this automatically)
- Activating global pipes instead of applying them on each request individually
- Using the `@nestjs/mapped-types` library

---

### File Changes in This Branch

- Created a `users` directory containing:
  - `users.module.ts`
  - `users.controller.ts`
- Created a `dtos` directory inside `users`, with:
  - `create-user.dto.ts`
  - `get-users-params.ts`
  - `patch-user.dto.ts`
- Registered a global `ValidationPipe` in `main.ts` instead of applying it per request

---

### Notes

- `app.module.ts` should be placed directly inside the `src` directory so CLI generators work correctly
- Use the `--no-spec` flag to skip generating spec (test) files when using the CLI
- To create an optional path/route parameter (in Express 5), wrap it like this:  
  `users{/:id}/something`
- NestJS provides access to various elements of a request (e.g. params, query, headers) individually, without requiring full request hijacking
- **Slide 001**: NestJS simplifies error handling and validation via filters and exceptions, saving time and boilerplate
- `class-transformer` and `class-validator` often work together to enable declarative input validation and transformation—especially useful with DTOs
- Curious about how decorators and validation work under the hood? Check the `reflect-metadata` package, which Nest uses internally
- Set `whitelist: true` in the global `ValidationPipe` to strip any properties not defined in the DTO, protecting against malicious input
- Set `forbidNonWhitelisted: true` to explicitly throw an error when unexpected properties are present in the request
- Set `transform: true` to automatically transform incoming JSON payloads into actual instances of DTO classes—enabling proper type handling
- You can’t validate optional parameters directly with pipes—use a DTO, even for a single optional field
- To avoid duplicating validation logic between `create-user` and `patch-user` DTOs, use `@nestjs/mapped-types` to extend the former and automatically mark fields optional
