## Gaatha v2

Frontend application for Gaatha

## Clone

Clone repository: https://github.com/toggle-corp/gaatha-v2

```bash
git clone --recurse-submodules git@github.com:toggle-corp/gaatha-server.git server
```

## Development

Before you start, create `.env` file and set the environment variables for both client and server.

```
bash
cp .env.example .env
```

## Running

```bash
# Run backend
docker-compose up server

# Generate typings for the first time
docker-compose run --rm next bash -c 'yarn generate'

# Run frontend
docker-compose up next
```

## Run checks

```bash
docker-compose --profile test run --rm checks
```

## Building

```bash
docker-compose exec next bash -c 'yarn export'
```
