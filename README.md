# Load Dotenv

This package automatic load the package dotenv based on the build or --env parameter

### Default
Tis package will look in the `process.env.NODE_ENV` to determine which file is to load

 - `production`:  file name is .env.prod
 - `development`: file name is .env

### Parameter
You can use the parameter --env with your command to specify the name of the file in the root directory

#### Example
`--env .env.my-enviroment`
