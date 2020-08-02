# Example App

Example app for Typescript + Docker + Express + pm2 + Jest for BDD testing.

## Documentation

Documentation is declared in Postman. Do import the collection here: https://www.getpostman.com/collections/5bc95a02ef3dba87c304

## Development

Ensure you have Node.JS installed. First, create the environment file:

```
echo "PORT=8000" > .env
```

Then run the following:

```
$ npm run dev
```

## Running tests

We use `Jest` for Behavior-Driven Development. To run tests, please run the following:

```
$ npm t
```

Or in live-reload mode:

```
$ npm run test:watch
```

## Production

For production, start the server using `docker-compose`:

```
$ docker-compose up
```
