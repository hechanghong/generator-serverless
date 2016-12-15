const path       = require('path');
const yosay      = require('yosay');
const to         = require('to-case');
const generators = require('yeoman-generator');

const serverGenerator = generators.Base.extend({
  prompting: {
    welcome() {
      this.log(yosay(
        'Hello there, let\'s create a serverless architecture together!'
      ));
    },

    ask() {
      return this.prompt([{
        name    : 'projectName',
        type    : 'input',
        message : 'What is the project name:',
        filter  : answer => to.slug(answer),
        default : path.basename(this.destinationPath())
      }, {
        name    : 'projectDescription',
        type    : 'input',
        message : 'Enter the project description:'
      }, {
        name    : 'projectVersion',
        type    : 'input',
        message : 'Version:',
        default : '0.1.0'
      }, {
        name    : 'authorName',
        type    : 'input',
        message : 'Author name:',
        store   : true
      }, {
        name    : 'authorEmail',
        type    : 'input',
        message : 'Author email:',
        store   : true
      }]).then((answers) => {
        this.projectName        = answers.projectName;
        this.projectDescription = answers.projectDescription;
        this.projectVersion     = answers.projectVersion;
        this.authorName         = answers.authorName;
        this.authorEmail        = answers.authorEmail;
      });
    }
  },

  writing: {
    editorConfig() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },
    eslint() {
      this.fs.copy(
        this.templatePath('eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    },
    git() {
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    npm() {
      this.fs.copy(
        this.templatePath('npmrc'),
        this.destinationPath('.npmrc')
      );
    },
    readMe() {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          projectName       : this.projectName,
          projectDescription: this.projectDescription
        }
      );
    },
    jsdoc() {
      this.fs.copyTpl(
        this.templatePath('jsdoc.conf.json'),
        this.destinationPath('jsdoc.conf.json'), {
          projectName: this.projectName
        }
      );
    },
    packageJSON() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          projectName       : this.projectName,
          projectDescription: this.projectDescription,
          projectVersion    : this.projectVersion,
          authorName        : this.authorName,
          authorEmail       : this.authorEmail
        }
      );
    },
    serverlessYaml() {
      this.fs.copyTpl(
        this.templatePath('serverless.yml'),
        this.destinationPath('serverless.yml'), {
          projectName: this.projectName
        }
      );
    },
    yarn() {
      this.fs.copy(
        this.templatePath('yarn.lock'),
        this.destinationPath('yarn.lock')
      );
    },
    bin() {
      this.fs.copyTpl(
        this.templatePath('bin/ci.sh'),
        this.destinationPath('bin/ci.sh'), {
          projectName: this.projectName
        }
      );
      this.fs.copy(
        this.templatePath('bin/deploy.sh'),
        this.destinationPath('bin/deploy.sh')
      );
      this.fs.copy(
        this.templatePath('bin/function-lib.sh'),
        this.destinationPath('bin/function-lib.sh')
      );
    },
    config() {
      this.fs.copy(
        this.templatePath('config/env.dev'),
        this.destinationPath('config/.env.dev')
      );
      this.fs.copy(
        this.templatePath('config/env.prod'),
        this.destinationPath('config/.env.prod')
      );
    },
    test() {
      this.fs.copy(
        this.templatePath('test/api.js'),
        this.destinationPath('test/api.js')
      );
    },
    src() {
      this.fs.copy(
        this.templatePath('src/libs/README.md'),
        this.destinationPath('src/libs/README.md')
      );
      this.fs.copy(
        this.templatePath('src/models/README.md'),
        this.destinationPath('src/models/README.md')
      );
      this.fs.copy(
        this.templatePath('src/helpers/loggedError.js'),
        this.destinationPath('src/helpers/loggedError.js')
      );
      this.fs.copy(
        this.templatePath('src/helpers/logger.js'),
        this.destinationPath('src/helpers/logger.js')
      );
    }
  },
  install() {
    this.composeWith('serverless:route');
    this.npmInstall();
  },
  end() {
    this.log(yosay('Your project has been set up! \n Thanks and see you soon!'));
  }
});


module.exports = serverGenerator;
