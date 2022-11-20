# Constraint Based Roster Scheduler

[![Tests](https://github.com/NethumL/roster-scheduler/actions/workflows/test.yml/badge.svg)](https://github.com/NethumL/roster-scheduler/actions/workflows/test.yml)

> A mobile-optimized web application to generate duty rosters for wards in a hospital.

## Usage

- Clone the repository

```sh
git clone https://github.com/NethumL/roster-scheduler
cd roster-scheduler
```

- Install [Node.js](https://nodejs.org)

- Install the required dependencies

```sh
npm install
```

- Set up a MongoDB server to use as a database
- Create a `.env.local` file with the required environment variables (see [environment variables section](#environment-variables))
- Run the webapp

```sh
npm run dev
```

- Set up the [roster generation service](https://github.com/NethumL/roster-scheduler-service), configure according to the [README.md](https://github.com/NethumL/roster-scheduler-service#readme), and run it

## Building for production

```sh
npm run build
```

## Deploying

- The Next.js app can be deployed on Vercel directly as shown in the [documentation](https://vercel.com/guides/deploying-nextjs-with-vercel)
- Set the required environment variables [on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- Make sure to set up a MongoDB server and set the corresponding `MONGODB_URI` environment variable
- Set up the [roster generation service](https://github.com/NethumL/roster-scheduler-service) and deploy on a server (eg: [render](https://render.com/docs/deploy-flask))

## Testing

- Create a `.env.test.local` file with the required environment variables (see [environment variables section](#environment-variables))
  - Additionally, set the `CI` environment variable to `1` before running the tests
  - Make sure to use a different database name in `.env.test.local`

### UI tests

- Build the webapp for production

```sh
npm run build
```

- Start the webapp for testing

```sh
NODE_ENV=test npm run start
```

- Separately, run the tests

```sh
NODE_ENV=test npx playwright test --workers 1
```

### Unit tests

```sh
npm run test:unit
```

### Load testing

- Install [Python](https://www.python.org)
- Install [Locust](https://locust.io)

```sh
pip install locust
```

- Start Locust

```sh
locust -f tests/load
```

- Open the Locust web interface (link will be in the output of the previous command)
- Configure the testing parameters and the host
- Run the test

## Environment variables

### `NEXT_PUBLIC_TITLE`

- Title for web application
- Will be shown in navbar and page title

### `MONGODB_URI`

- URI for MongoDB server, eg: `mongodb://admin:password@127.0.0.1:27017/cs3202?directConnection=true&authSource=admin`
- Make sure the database name is in the URI itself

### `TOKEN_SECRET`

- Needs to be a sufficiently long random string, eg: `DSAVDF+BTMgoBszC9zUJwHx1/s4Gc2ebz9oG1VjrBB8=`
- Can use the OpenSSL command line tool to generate one

```sh
$ openssl rand -base64 32
DSAVDF+BTMgoBszC9zUJwHx1/s4Gc2ebz9oG1VjrBB8=
```

### `SERVICE_HOST`

- Host of service that generates rosters, eg: "https://roster-scheduler-service.onrender.com" (repo available [here](https://github.com/NethumL/roster-scheduler-service))

### `SERVICE_SECRET`

- Shared secret between this webapp and the service
- Needs to be a sufficiently long random string, eg: `DSAVDF+BTMgoBszC9zUJwHx1/s4Gc2ebz9oG1VjrBB8=`
- Can use the OpenSSL command line tool to generate one (similar to [`TOKEN_SECRET`](#`TOKEN_SECRET`))

## Team

- 190332D Sasitha Kumarasinghe
- 190334K H. R. S. Kumari
- 190349K Nethum Lamahewage
