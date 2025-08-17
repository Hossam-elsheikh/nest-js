import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import * as request from 'supertest';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.sample-data';
describe('[Users] @Post Endpoints', () => {
  // here we're loading the app entirely so that you don't care about injecting dependencies, but you may have if there're a lot of modules that slow the process
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;
  beforeEach(async () => {
    // instantiating encapsulated in bootstrapNestApplication function
    app = await bootstrapNestApplication();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close(); // you should close the app
  });

  //  todo is to enable jest to remind you of creating them later
  //   it.todo('/users - endpoint is public');

  it('/users - endpoint is public', () => {
    console.log(completeUser); // fake data

    return request(httpServer)
      .post('/users')
      .send({}) // sending empty object as we check if the endpoint is public or not,
      .expect(400); // expected bad request
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });
  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });
  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it('/users - valid request successfully creates user', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });
  it('/users - password is not reruned in response',  () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.password).toBeUndefined();
      });
  });
  it('/users - googleId is not reruned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.googleId).toBeUndefined();
      });
  });
});
