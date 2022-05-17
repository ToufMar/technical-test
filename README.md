# server:

1 - First run `yarn install`
2 - create a local database
3 - Create a .env and Set a NODE_PORT={{YOUR PORT}}.
4 - Go to src/config/typeormConfig and set a database URL in dataSource
5 - Run `yarn sync-database` to synchronize your database with entities
6 - Run `yarn start` to launch the server

# client

1 - First run `yarn install`
2 - Define an API URL in src/dist/envConfig
3 - run `yarn start`
