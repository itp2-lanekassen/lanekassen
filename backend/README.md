# Lanekassen backend application

Running .NET 6

## Initialize database

Open postgres cli and enter:

```sql
-- create the database
create database lanekassen;
-- create the user
create user lanekassen_admin with password 'lanekassen-2023';
-- add user to database
grant all privileges on database lanekassen to lanekassen_admin;
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

## Running the application

```bash
dotnet run
```
