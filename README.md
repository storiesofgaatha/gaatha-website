## Gaatha version 2

Client side Next app for Gaatha

## Development

Before you start, copy `.env.example` as `.env` and set the env variables.

Clone [gaatha server](https://github.com/toggle-corp/gaatha-server) into server

```bash
git clone git@github.com:toggle-corp/gaatha-server.git server
```

```bash
docker-compose up
```

```bash
# Generate graphql files
yarn generate

# Build web app
yarn build

# Typescript check
yarn typecheck

# Eslint check
yarn eslint

# Check unused files
yarn check-unused

# Run tests
yarn test
```

