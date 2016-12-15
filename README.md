# Generator Serverless
Yeoman generator for a lambda Serverless project

## Requirements

* Node V6.x
* Yeoman >= V1.8.5

## Generator installation

First of all, you are going to need [Yeoman](http://yeoman.io/):
```
npm install -g yo
```
Then get the generator:

```bash
npm i -g generator-serverless
```

## Usage

### Base generator

Once the link established, you can use it right away.
Create a new directory where you want your project to be and run it:
```
mkdir my-awesome-lambda
cd my-awesome-lambda
yo serverless
```
It will prompt some questions you need to answer to configure your project.
Default values are specified between parenthesis.
You now have a starter skeleton for a lambda project!

### Sub-generator

While working on your project, you can easily add a function/route by using the subgenerator.
In the root directory of your project, type:
```
yo serverless:route
```
Just like the base generator, it will prompt you to give the function(s) name(s).
It creates the handler files
 and modify the `serverless.yml` file according to.

## Unit Testing
TODO

## Features
### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org). Uses ESLint with the coming soon Exaprint JavaScript style guide.                                                                                                |
| Deploy Management tool                  	 | Deploy the server on AWS using [Serverless Framework](https://serverless.com/).                                                                                                                                                                          |
| Code Testing via Mocha throught [Jenkin-Mocha](https://github.com/stjohnjohnson/jenkins-mocha) (Mocha + Istanbul)                  | Single command to run your Mocha unit tests with both XUnit and LCov output (for Jenkins). |
| ES6 Code Coverage via Istanbul throught [Jenkin-Mocha](https://github.com/stjohnjohnson/jenkins-mocha) (Mocha + Istanbul)                  | Supports code coverage of ES6 code using istanbul and mocha. Reports are Jenkins ready. |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Object validation via [JOI](https://www.npmjs.com/package/joi)           | Object schema description language and validator for JavaScript objects. |
| Uses [yarn](https://yarnpkg.com) over npm            | Uses new released yarn package manager by facebook. You can read more about it [here](https://code.facebook.com/posts/1840075619545360) |
| Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code.    | It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code. |
| Has `.editorconfig`                    | It helps developers define and maintain consistent coding styles between different editors and IDEs.|
| [@use JSDoc](http://usejsdoc.org/) to generate JS Documentation | JSDoc 3 is an API documentation generator for JavaScript, similar to JavaDoc or PHPDoc. You add documentation comments directly to your source code, right along side the code itself. The JSDoc Tool will scan your source code, and generate a complete HTML documentation website for you. |
| Use [Plato](https://github.com/es-analysis/plato)     | Visualize JavaScript source complexity |
| Use [DotEnv](https://www.npmjs.com/package/dotenv)    | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env |
| Use [Winston JS](https://www.npmjs.com/package/winston) for logging purpose   | A multi-transport async logging library for Node.js |
| Use [Node Security Platform](https://nodesecurity.io/opensource) - NSP    | nsp is the main command line interface to the Node Security Platform. It allows for auditing a package.json or npm-shrinkwrap.json file against the API. |
| Use [Serverless Mocha Plugin](https://github.com/SC5/serverless-mocha-plugin) Enable it manually | A Serverless Plugin for the Serverless Framework which adds support for test driven development using mocha |
| Use [Serverless Offline Plugin](https://github.com/dherault/serverless-offline) Enable it manually   | Emulate AWS λ and API Gateway locally when developing your Serverless project |