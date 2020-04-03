const helpers = require('../../lernaHelpers');
const { join, resolve } = require('path');
const { REMOVE_NPM_SCOPE } = require('../helpers');

const packagesRoot = resolve(__dirname, '../../../packages');

const packageTypes = {
  general: 0,
  pf4: 4
};

const packageConfigs = {
  [packageTypes.general]: {
    name: 'General',
    value: packageTypes.general,
    location: packagesRoot
  },
  [packageTypes.pf4]: {
    name: 'PatternFly 4',
    value: packageTypes.pf4,
    location: packagesRoot
  }
};

function setPackageGenerators(plop) {
  plop.setGenerator('Package', {
    description: 'A new package for the monorepo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should the package name be?',
        async validate(input) {
          const packages = await helpers.getPfPackages(false);
          const pkgConfigs = packages.map(pkg => pkg.toJSON());
          const matchingPackage = pkgConfigs.find(p => p.name === input);
          return matchingPackage ? `Packages already exits at ${matchingPackage.location}` : true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe this package'
      },
      {
        type: 'list',
        choices: Object.keys(packageConfigs).map(key => packageConfigs[key]),
        name: 'packageType',
        message: 'What type of package is it?'
      },
      {
        type: 'confirm',
        name: 'includeTypings',
        message: 'Will TypeScript definitions be included?'
      }
    ],
    actions: answers => {
      const packageConfig = packageConfigs[answers.packageType];
      const packageBaseTemplate = join(packageConfig.location, `./{{${REMOVE_NPM_SCOPE} name}}/`);

      return [
        {
          type: 'add',
          path: join(packageBaseTemplate, `package.json`),
          templateFile: resolve(__dirname, './package.json.hbs')
        },
        {
          type: 'add',
          template: '// placeholder\n',
          path: join(packageBaseTemplate, 'src/index.js')
        },
        {
          type: 'add',
          path: join(packageBaseTemplate, 'tsconfig.json'),
          templateFile: resolve(__dirname, './tsconfig.json.hbs')
        },
        {
          type: 'add',
          path: join(packageBaseTemplate, 'tsconfig.cjs.json'),
          templateFile: resolve(__dirname, './tsconfig.cjs.json.hbs')
        },
        {
          type: 'add',
          path: join(packageBaseTemplate, `.npmignore`),
          templateFile: resolve(__dirname, './.npmignore.hbs')
        },
        {
          type: 'add',
          template: '# {{name}}',
          path: join(packageBaseTemplate, 'README.md')
        }
      ].filter(Boolean);
    }
  });
}

module.exports = setPackageGenerators;
