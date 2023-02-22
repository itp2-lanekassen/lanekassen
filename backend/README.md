# Lanekassen backend application

Running .NET 6

## Initialize database

Open postgres cli and enter:

```sql
-- Create the database
create database lanekassen;
-- Create the user
create user lanekassen_admin with password 'lanekassen-2023';
-- Add user to database
grant all privileges on database lanekassen to lanekassen_admin;
-- Change to new database 
\c lanekassen
-- Grant rights
grant all on schema public to lanekassen_admin;
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

## Running in development

This will reload the application when making changes. *Changes in `program.cs` may not work without a full restart*

```bash
dotnet watch run
```

## Running for production

```bash
dotnet run
```
