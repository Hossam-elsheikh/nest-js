# 03 — Authentication

## In This Branch
- Hashing and salting passwords using **bcrypt**.
- Creating hashing providers.
- User signup and signin flows.
- JSON Web Tokens (JWT).
- Guards and creating `AccessTokenGuard`.
- Custom decorators (metadata, parameter decorators).
- Refresh tokens.
- Google authentication.
- Enabling CORS.

---

## Notes

- Always **add a salt** when hashing passwords.  
  See the hash components diagram in `slides/hashed.png`.
- In NestJS, an **abstract class** is often used for something like a hashing provider because it defines a contract for multiple hashing implementations without tying the app to a specific library.  
  If you hard-code bcrypt everywhere, replacing it later becomes painful.
- To change the **HTTP success code** sent by a controller method, use `@HttpCode()`:
  ```ts
  @HttpCode(HttpStatus.OK)
  signin() { ... }

For example, you might return 200 instead of the default 201 after a signin.

    JWT structure:

        Header → algorithm & token type.

        Payload → claims (non-sensitive data).

        Signature → verifies the token hasn’t been altered.

    The payload is not encrypted—only base64 encoded—so do not store sensitive data inside.

    Any change to the payload or options will change the signature, invalidating the token.

    Guards can be applied:

        Globally via:

    { provide: APP_GUARD, useClass: AccessTokenGuard }

    If applied in one module, it will still affect others because APP_GUARD is global in scope.

    Locally at the controller or route level for module-specific protection.

- Decorators are all about metadata—they attach additional information to classes, methods, or parameters.

- To exclude routes from a global guard:

    Create a custom decorator that sets a metadata flag.

    Modify or build a guard to read this metadata and skip protection for flagged routes.

- How Guards Work:

    Authentication Guard → validates a user's access token.

    Authorization Logic → grants or denies access based on the authentication result.

    Role Management → optionally checks user roles for role-based access control.

    Global Guards → apply guard logic to all requests in the application.

- Refresh tokens should have a minimal payload—usually just the sub (user ID).

- Google Authentication Flow:

    Frontend requests Google login.

    Google completes login and sends a LoginTicket JWT to the frontend.

    Frontend sends this token to your NestJS backend.

    Backend verifies the token, creates or signs in the user, then issues access and refresh tokens.

- The frontend requires only the Client ID, not the Client Secret (which stays in the backend).

- Install the Google Auth library: npm install google-auth-library

- Enable CORS before starting the server: app.enableCors();