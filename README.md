# 02 Dependency Injection and Documentation

## In This Branch
  - creating a provider/service and inject it in the controller [intramodular_dependency]
  - moving the business logic to the service
  - inject users service inside posts service [intermodular_dependency]
  - using forwardRef function to apply [circular_dependency]
  - documenting code with compodoc, as well as api with swagger
  - validating arrays 
  - working with nested dtos and validating using ValidateNested with Type decorators
---

### Notes
  - after spending time manually creating modules, controllers, and services, try to get used to nest cli to avoid missing imports
  - you don't need extra steps of connecting 2 modules while dealing with orm later
  - you can only export providers/services through exports in the module, and you import the whole module in the target module
  - importing the whole module in the target module doesn't mean that it's all imported, it only imports the exported services only
  - when 2 modules needs each other you can't export and import each in another, because it's circular dependncy, instead you import them with forwardRef function, and inject services with forwardRef as well
  - nest auto generate documentation for us using [swagger] for api documentaion, and [COMPODOC] for code documentaion, after a certain config
  - api doc is hosted with the api, code doc is generated inside the app
  - newer versions of swagger auto group routes, so you don't need to use ApiTags to do this
  - consider using @ApiOperation, @ApiQuery, @ApiProperty and @ApiPropertyOptional to add details to the endpoints 
  - @Type() decorator used in nested dtos validations creats an instance of the dto to match and validate once the request come, it's crucial
  - PartialType imported from the mapped-types won't inherits swagger configs in inherited dto, so import PartialType from swagger instead
  - code documentation with compodoc is done automatically with compodoc which relies on JSDoc.
  - documentation coverage in compodoc will show 0% in every file because it expect you to put comments