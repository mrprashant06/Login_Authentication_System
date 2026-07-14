
3# Login Authentication System

![.NET](https://img.shields.io/badge/.NET-9.0-512BD4)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-2F9E6D)
![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-B7473D)
![JWT](https://img.shields.io/badge/Auth-JWT-B98324)

A full-stack authentication project built with ASP.NET Core, C#, SQL Server, Entity Framework Core, JWT Bearer authentication, and a responsive HTML/CSS/JavaScript frontend.

This is designed as a main GitHub portfolio project for a frontend and .NET developer.

## Project Highlights

- User registration and login
- Secure password hashing
- JWT token generation and validation
- Protected profile endpoint with `[Authorize]`
- SQL Server database with EF Core migrations
- Responsive frontend served by ASP.NET Core
- Clean folder structure and API documentation

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Backend | C#, ASP.NET Core Web API |
| Authentication | JWT Bearer, ASP.NET Core Authorization |
| Database | SQL Server Express, Entity Framework Core |
| API Docs | OpenAPI JSON |

## Folder Structure

```text
LoginAuthenticationSystem/
  Controllers/
  Data/
  Dtos/
  Migrations/
  Models/
  Services/
  Settings/
  wwwroot/
  docs/
```

## API Endpoints

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | JWT required |

More details: [docs/API.md](docs/API.md)

## Run Locally

```powershell
cd C:\Users\user\Desktop\DEMO\LoginAuthenticationSystem
dotnet restore
dotnet tool restore
dotnet tool run dotnet-ef database update
dotnet run
```

Open the app:

```text
http://localhost:5159
```

OpenAPI JSON:

```text
http://localhost:5159/openapi/v1.json
```

## Database

Default connection string:

```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=LoginAuthenticationSystemDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

Update `ConnectionStrings:DefaultConnection` in `appsettings.json` if your SQL Server instance name is different.

## GitHub Push

Push instructions are here:

[docs/GITHUB_PUSH.md](docs/GITHUB_PUSH.md)

## Portfolio Notes

This project demonstrates practical full-stack .NET skills:

- API design.
- Authentication flow.
- Database connectivity.
- Form validation.
- Responsive UI.
- Clean project organization.

For production, move the JWT key out of `appsettings.json` and store it in user secrets, environment variables, or a secure vault.
