# roomkeeper

![version](https://img.shields.io/github/package-json/v/newt239/roomkeeper?style=flat)

Record the history of enter and exit rooms

![hero image](https://raw.githubusercontent.com/newt239/roomkeeper/main/src/app/opengraph-image.png)

## development

### setup

```
pnpm install
```

### start

```
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

### initialize database

```
pnpm migrate
```

### example of `.env`

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
BASIC_AUTH_USER=
BASIC_AUTH_PASSWORD=
BASIC_AUTH_ADMIN_USER=
BASIC_AUTH_ADMIN_PASSWORD=
```
