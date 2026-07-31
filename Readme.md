# Slack Project

A Slack-like workspace and channel messaging app, with a React/Vite frontend and an Express/Socket.IO backend.

Supports user authentication, workspaces, channels, invite codes, text and image messages, and real-time channel updates.

## Repository layout

```text
.
├── Backend/     Express API, MongoDB models, Socket.IO handlers, mail queue
└── Frontend/    React/Vite single-page application
```

## Features

- Sign up / sign in with JWT-based authentication (bcrypt password hashing)
- Email verification flow (`/verify/:token`)
- Create, list, view, rename, and delete workspaces
- Workspace membership via six-character join codes
- Admin controls: add channels, reset join code, delete/rename workspace
- Real-time channel joining and message broadcasting via Socket.IO
- Image uploads via a backend-generated Cloudinary signature + direct browser upload

## Tech stack

**Frontend:** React 19, React Router, Vite, TanStack React Query, Axios, Socket.IO client, Tailwind CSS 4, Quill editor, Cloudinary upload

**Backend:** Node.js, Express 5 (ES modules), MongoDB (Mongoose), Socket.IO, JWT + bcrypt, Zod validation, Bull + Redis (email queue), Nodemailer (Gmail SMTP), Cloudinary

## Prerequisites

- Node.js and npm
- MongoDB instance
- Redis instance
- Cloudinary credentials (for image uploads)

## Backend setup

```powershell
cd Backend
npm install
```

Create `Backend/.env`:

```dotenv
PORT=3000
NODE_ENV=development
DEV_DB_URL=mongodb://127.0.0.1:27017/slack-project
PROD_DB_URL=
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRY=1d

MAIL_ID=your-gmail-address@example.com
MAIL_PASSWORD=your-gmail-app-password
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
ENABLE_EMAIL_VERIFICATION=true
APP_LINK=http://localhost:3000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_CLOUD_SECRET=
```

`DEV_DB_URL` is used when `NODE_ENV=development`; `PROD_DB_URL` is used when `NODE_ENV=production`.

Run in development mode:

```powershell
npm run dev
```

This runs ESLint autofix, then starts `nodemon src/index.js`. The HTTP API and Socket.IO server listen on `PORT` (3000 by default).

Other scripts: `npm run lint`, `npm run lint:fix`, `npm run format`.

## Frontend setup

```powershell
cd Frontend
npm install
```

Create `Frontend/.env`:

```dotenv
VITE_BACKEND_API_URL=http://localhost:3000/api/v1
VITE_BACKEND_SOCKET_URL=http://localhost:3000
```

Run:

```powershell
npm run dev
```

## HTTP API

All routes below are relative to `/api/v1` and require `x-access-token` unless stated otherwise.

### Authentication

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/users/signup` | Create a user and return a JWT |
| `POST` | `/users/signin` | Authenticate a user and return a JWT |

### Workspaces

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/workspaces` | Create a workspace |
| `GET` | `/workspaces` | List workspaces for the authenticated user |
| `GET` | `/workspaces/:workspaceId` | Get workspace details, members, and channels |
| `PUT` | `/workspaces/:workspaceId` | Update workspace data (admin-only) |
| `DELETE` | `/workspaces/:workspaceId` | Delete a workspace (admin-only) |
| `GET` | `/workspaces/join/:joinCode` | Look up an invite code |
| `POST` | `/workspaces/join/:joinCode` | Join a workspace with an invite code |
| `PUT` | `/workspaces/:workspaceId/channels` | Add a channel (admin-only) |
| `PUT` | `/workspaces/:workspaceId/members` | Add a member by user ID (admin-only) |
| `PUT` | `/workspaces/:workspaceId/joincode/reset` | Generate a new invite code (admin-only) |

### Channels, members, and messages

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/channels/:channelId` | Get a channel and its first page of messages |
| `GET` | `/members/workspace/:workspaceId` | Get the authenticated member record for a workspace |
| `GET` | `/messages/:channelId` | Get messages (supports `page` and `limit`) |
| `GET` | `/messages/pre-signed-url` | Get signed Cloudinary upload parameters |

`/verify/:token` is mounted outside the `/api/v1` prefix.

## Socket.IO events

- Client emits `joinChannel` with `{ channelId }` to join a channel room.
- Client emits `newMessage` with `channelId`, `body`, optional `image`, `senderId`, `workspaceId`.
- Server emits `newMessageReceived` to the channel room after a message is saved.

**Note:** Socket.IO handlers don't currently use the HTTP JWT middleware — message payloads are accepted from the socket event as-is. Review socket authentication/authorization before production use.

## Response shape

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "error": {}
}
```

Errors use the same shape with `success: false`, an empty `data` object, and a message.

## Data model

- `User`: email, username, hashed password, avatar URL, verification state/token
- `Workspace`: name, description, members with roles, join code, channel references
- `Channel`: name, owning workspace reference
- `Message`: body, optional image URL, channel/sender/workspace references, timestamps

## Known limitations

- MongoDB, Redis, mail, and Cloudinary credentials are external runtime dependencies not included in this repo (no `.env.example` provided).
- No frontend page for the email-verification flow yet (backend endpoint returns JSON only).
- Threads, drafts, and direct messages appear in the UI but lack complete backend implementations.
- No automated tests are included.