# 03 Connecting to PostgreSQL and Setting Relations with TypeORM

## In This Branch

- Connecting to the PostgreSQL database using TypeORM  
- Using async configuration 
- Creating entity files and injecting repositories  
- Using `autoLoadEntities`  
- Defining a uni-directional one-to-one relationship  
- Using `cascade`  
- Querying with eager loading  
- Deleting related entities in uni- and bi-directional one-to-one relationships  
- Implementing one-to-many relationships (bi-directional)  
- Creating uni-directional and bi-directional many-to-many relationships  
- Implementimg soft delets

---

## Notes

- The `synchronize` option in the TypeORM config module indicates whether the database schema should be auto-created on every app launch. **Don't use it in production** — it’s helpful only during debugging and development.

- The `@PrimaryGeneratedColumn()` decorator auto-generates an incremental ID using TypeORM.

- Criteria used in DTOs and entity definitions must match for proper validation and mapping.

- Choose column types carefully in entity definitions — especially if you plan to switch databases. For example, the `date` type is `timestamp` in PostgreSQL and `datetime` in MySQL.

- TypeORM provides many useful column decorators, such as `@DeleteDateColumn` for **soft deletes**.

- `autoLoadEntities` scans modules' `imports` arrays to automatically detect and register entities for table creation.

- Setting `cascade: true` in the `@OneToOne` decorator's config allows auto-creation of related records.  
  Example: If a `Tag` is provided in a blog post request, TypeORM will create the `Tag` record first, then the `Post`, and link them automatically.

- Setting `eager: true` in `@OneToOne` config allows automatic fetching of related data, without needing to manually specify relations in `find()` queries.

- For deleting related entities:
  - In **uni-directional** relationships: delete the entity holding the **foreign key (FK)** first.
  - In **bi-directional** relationships: you can cascade deletes for convenience and code cleanliness.

- A **bi-directional** relationship is created by defining an inverse side for each entity. This allows fetching related data from either side using `find()`.

- The FK should always be in the entity/table that is meant to be deleted when the main entity is removed.

- Using `cascade` properly can save a lot of boilerplate code and logic.

- In a **one-to-many** relationship:
  - The FK is always on the "many" side.
  - No need to use `@JoinColumn`; `@ManyToOne` provides it automatically.

- Before injecting a foreign repository inside a service, consider if the operation can be handled inside the foreign service itself — then call that service instead.

- A `@ManyToMany` relationship creates a **junction table** containing the IDs from both related entities.

- In **uni-directional many-to-many** relationships (e.g., posts ↔ tags):
  - Use `@JoinTable()` in the **owning** entity (e.g., `Post`) to define the relationship.
  - When this entity is deleted (`Post`), related junction records (`post_tags_tag`) are deleted automatically.
  - However, deleting a `Tag` will throw a foreign key constraint error **unless** you specify `onDelete: 'CASCADE'` in the `@ManyToMany` config on the `Tag` side.

- **Soft deletes**:
  - Require a **separate endpoint**, as they often include business-specific logic.
  - Soft deleting a record (via `@DeleteDateColumn`) **doesn't remove** it from the DB but flags it as inactive.
  - Soft deletes **don’t affect junction tables**.
  - TypeORM handles soft deletes internally: soft-deleted records are **excluded** from normal queries like `findAll()` unless you set `{ withDeleted: true }` in the query options.