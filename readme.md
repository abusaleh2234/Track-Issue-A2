# TRACK-ISSUE-A2

## Tech Stack
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken

## Installed Packages Dependencies
- npm init 
`npm install express dotenv bcrypt jsonwebtoken pg`
- .env 
` PORT=5000
CONNECTIONSTRING = your_postgresql_database_url
ACCESSSECRET = your_secret_key `

## Installed Packages Dev Dependencies

`npm install -D typescript tsx @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/pg`

## Api

- User Registration 
`POST https://track-issue-a2.vercel.app/api/auth/signup`

- User Login
`POST https://track-issue-a2.vercel.app/api/auth/login`

- Create Issue
`POST https://track-issue-a2.vercel.app/api/issues`

- Get All Issues
`GET https://track-issue-a2.vercel.app/api/issues?sort=newest`

- Get Single Issue 
`GET https://track-issue-a2.vercel.app/api/issues/:id`

- Update Issue
`PATCH https://track-issue-a2.vercel.app/api/issues/:id`

- Delete Issue 
`DELETE https://track-issue-a2.vercel.app/api/issues/:id`