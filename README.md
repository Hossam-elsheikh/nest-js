# 03 — Serialization, File uploads and SMTP

## In This Branch
- Serialization and interceptors  
- File uploads  
- Setup S3 and CloudFront  
- Uploading a file to an S3 bucket and saving the record in DB  
- Creating Emails service  
- EJS template engine  

---

## Notes

- **Purpose of Interceptors:**
  - Bind extra logic before/after method execution.
  - Transform the result returned or exception thrown from a function.
  - Extend the basic function behavior.
  - Override a function based on specific conditions (e.g., caching).
  
- NestJS provides built-in interceptors such as `ClassSerializerInterceptor`:
  - Apply it using `@UseInterceptors(ClassSerializerInterceptor)` on a controller.
  - Add `@Exclude()` on entity fields you want to hide from the serialized response.
  - You can later create **custom interceptors** with specific behaviors as needed.

- **Global interceptors** are great for:
  - Unifying response shapes across the app.
  - Sending additional metadata with every API response (e.g., `api-version`).
  - Create one using the Nest CLI, then register it in `app.module.ts` with:
    ```ts
    { provide: APP_INTERCEPTOR, useClass: YourInterceptor }
    ```
    This way, it intercepts and has access to all outgoing responses.

- When sending `multipart/form-data`, NestJS provides `FileInterceptor()` to extract the incoming file inside route handlers.

- **CloudFront CDN** distributes files stored in S3 buckets.  
  After uploading to S3, save the **CloudFront URL** in the database for faster delivery.  
  Required packages → `npm i aws-sdk` and `npm i -D @types/multer`

- If uploaded images are not previewing in the browser, it's likely because you didn’t set the `ContentType` MIME while calling the S3 `.upload()` method.

- To create a **mail service**:
  ```bash
  npm i @nestjs-modules/mailer nodemailer ejs

- be aware that templates directory not compiled by nest, and to do so you have to add assets array to nest-cli.json file in compiler options: "assets":[{"include":"./mail/template","outDir":"dist/"}]