# Lanekassen backend application

Running .NET 6

## Initialize database

Open postgres cli and enter:

```sql
-- Create the database
create database <database>;
-- Create the user
create user <user> with password <password>;
-- Add user to database
grant all privileges on database <database> to <user>;
-- Change to new database 
\c <database>
-- Grant rights
grant all on schema public to <user>;
```

Installing entity framework:

```bash
dotnet tool install --global dotnet-ef
```

Setting up database tables:

```bash
dotnet ef migrations add InititalCreate
dotnet ef database update 
```

For adding a migration:

```bash
dotnet ef migrations add <name>
dotnet ef database update 
```

## Running in development

This will reload the application when making changes. *Changes in `program.cs` may not work without a full restart*

```bash
dotnet watch run
```

## Running for production

```bash
dotnet run
```
