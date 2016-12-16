'use strict';

const to = require('to-case');
const generators = require('yeoman-generator');
const fileReader = require('html-wiring');

/**
 * Generates the different types of names for our routes
 * @param {String} routeName Route Name
 * @return {Array} Route objetcs
 */
const genRoutesNames = (routeName) => {
  const routeNames = {
    slugName: to.slug(routeName),
    pascalName: to.pascal(routeName),
    camelName: to.camel(routeName),
  };

  return routeNames;
};

/**
 * Updates the serverless.yml file with the new routes
 * @param  {Object} route Object containing all the route names
 * @param  {String} file String representation of our file
 * @return {String} Our modified version of the input file
 */
function updateYamlFile(route, file) {
  const hook = '### yeoman hook ###';
  let newFile = null;
  const insert = `  ${route.slugName}:\n` +
    `    handler: src/handlers/${route.slugName}.run\n` +
    '    events:\n' +
    '      - http:\n' +
    `          path: ${route.slugName}\n` +
    `          method: ${route.method}\n` +
    '          cors: true\n';

  if (file.indexOf(insert) === -1) {
    newFile = file.replace(hook, insert + hook);
  }

  return newFile;
}

/**
 * The route subgenerator
 */
const serverGenerator = generators.Base.extend({
  prompting: {
    ask() {
      return this.prompt([{
        name: 'routes',
        type: 'input',
        message: 'Route(s) name(s): (singular or comma separated)',
        filter: answer => answer.split(','),
        default: 'route1, route2',
      },
      ]).then((answers) => {
        this.routes = answers.routes.map(genRoutesNames);
      });
    },
    method() {
      const prompts = [];

      // We prepare the prompst for each route
      this.routes.forEach((route) => {
        prompts.push({
          name: `method-${route.camelName}`,
          type: 'list',
          message: `Route ${route.slugName} method:`,
          choices: [
            'get',
            'post',
            'put',
            'delete',
          ],
          default: 'get',
        });
      });

      return this.prompt(prompts).then((answers) => {
        this.routes.forEach((route) => {
          route.method = answers[`method-${route.camelName}`];
        });
      });
    },
  },
  writing: {
    routes() {
      // We get the serverless.yml file as a string
      const path = this.destinationPath('serverless.yml');
      let file = fileReader.readFileAsString(path);

      // We process each route
      this.routes.forEach((route) => {
        // We check the route doesn't already exists
        if (
          this.fs.exists(this.destinationPath(`src/handlers/${route.slugName}.js`))
        ) {
          this.log(`Route ${route.slugName} already exists`);
        } else {
          // All good
          this.fs.copy(
            this.templatePath('./../../app/templates/src/handlers/api.js'),
            this.destinationPath(`src/handlers/${route.slugName}.js`)
          );
          file = updateYamlFile(route, file);
        }
        // We add the unit test for the route
        this.fs.copyTpl(
          this.templatePath('./../../app/templates/test/api.js'),
          this.destinationPath(`test/${route.slugName}.js`), {
            routeName: route.slugName,
          }
        );
      });
      // Once done we rewrite the serverless.yml file
      this.write(path, file);
    },
  },
});

module.exports = serverGenerator;
