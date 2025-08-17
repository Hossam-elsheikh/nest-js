# 03 — Unit and E2E Testing

## In This Branch
- Unit Testing 
- e2e Testing
---

## Notes

- nestjs has a tight integration with jest testing library
- insure that you have the correct configuration in the package.json jest object, and in the jest-e2e.json file in test directory
- beforeEach runs before each test, and beforeAll runs before all tests, and as well as afterEach and afterAll
- use filter to run tests on a particular file (eg: npm run test:watch -- app.controller), here we've a name filter
- jest provides us with a lot of functionalities out of the box for writing mocks as well as pipes
- Importance of End-to-End Testing: It emphasizes the holistic approach of verifying that API endpoints return the correct data and perform as expected.
- e2e tests should live in the test directory
- it's recomended that you use the same db type you're using in production, to include the features, you create a test database and use it in e2e tests
- use it.todo to remind yourself of the test that you should write 
- unit test improve the quality of your code, while e2e test insures that your app behaves the way it should behave, if you're short in time and you have to choose between them, choose e2e
- you should clear test db between tests, to prevent conflicts
- superTest is a library that lets you run the server inside the test
- Faker is useful for generating fake data to test easily