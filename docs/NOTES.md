# Notes

## Create Solution

```bash
dotnet new sln -n StoreDesk
```

## Create API Project

```bash
dotnet new webapi -n StoreDesk.API --framework net10.0
```

## Add API Project to Solution

```bashdotnet sln add StoreDesk.API/StoreDesk.API.csproj
```

## Install Packages

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
```

## EF Core Commands

### Create Migration

```bash
dotnet ef migrations add InitialCreate
```

### Update Database

```bash
dotnet ef database update
```

### Remove Last Migration

```bash
dotnet ef migrations remove
```

### Run API

```bash
dotnet run
```
