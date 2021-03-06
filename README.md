# dept

[![NPM version][npm-image]][npm-url] [![npm module downloads][npm-downloads-image]][npm-downloads-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![License: MIT][license-image]][license-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

Dependencies templates management CLI to install your fixed NPM or Yarn dependencies and cofing files to your project.

## Usage

```bash
$ dept -h
Usage: dept <command> [options]

Commands:
  dept list                    Show all templates                  [aliases: ls]
  dept show [templateName]     Show a template in details           [aliases: s]
  dept default [templateName]  Use a template by default           [aliases: df]
  dept install [templateName]  Install dependencies and config files from a
                               template                             [aliases: i]
  dept add [templateName]      Add a template with '--data' or '--file'
                               options                              [aliases: a]
  dept remove [templateName]   Remove a template                    [aliases: r]
  dept rename [templateName]   Rename a template name
  [newTemplateName]                                                [aliases: mv]
  dept view [templateName]     View a filed in a template
  [viewStatement]                                                   [aliases: v]
  dept update [templateName]   Update a field in a template
  [updateStatement]                                                 [aliases: u]
  dept export [templateName]   Export a JSON template file          [aliases: e]
  dept listenv                 Show all package managers          [aliases: env]
  dept useenv [environment]    Use a package manager              [aliases: use]
  dept json2yaml               Convert a JSON format to a YAML
                               format with '--data' or '--file'
                               options                             [aliases: jy]
  dept yaml2json               Convert a YAML format to a JSON
                               format with '--data' or '--file'
                               options                             [aliases: yj]

Options:
  --version, -v  Show version                                          [boolean]
  --data, -d     Specify a JSON or YAML data string with 'add',
                 'json2yaml' or 'yaml2json'                             [string]
  --file, -f     Specify a JSON or YAML file with 'add', 'json2yaml'
                 or 'yaml2json'                                         [string]
  --filename, -n  Specify a filename of a JSON or YAML file with 'export',
                  'json2yaml' or 'yaml2json'                            [string]
  --out-dir, -o   Specify an output directory path to export a JSON or YAML
                  file with 'export', 'json2yaml' or 'yaml2json'        [string]
  --help, -h     Show help                                             [boolean]
```

## Template JSON/YAML format

You can define the following properties.

- `dependencies`: NPM package `dependencies`
- `devDependencies`: NPM package `devDependencies`
- `files`: Config files like `.eslintrc`, `.travis.yml` and so on. If file extension is 'yaml' or 'yml', it is exported as a YAML file.

JSON example:

```json
{
  "dependencies": {
    "module-name-A": "1.0.0"
  },
  "devDependencies": {
    "module-name-B": "*",
    "module-name-C": "^2.1.1"
  },
  "files": {
    "file-name-A.json": {
      "any-prop-1": [
        "any-element-1",
        "any-element-2",
        "any-element-3"
      ],
      "any-prop-2": {
        "any-value-1": 123,
        "any-value-2": true,
        "any-value-3": "something"
      },
      "any-prop-3": "anything"
    },
    "file-name-B.txt": "Hello World",
    "file-name-C.yml": {
      "any-value": "any-value",
      "any-list": [
        "any-element-1",
        "any-element-2"
      ]
    }
  }
}
```

YAML example:

```yaml
dependencies:
  module-name-A: 1.0.0
devDependencies:
  module-name-B: '*'
  module-name-C: ^2.1.1
files:
  file-name-A.json:
    any-prop-1:
      - any-element-1
      - any-element-2
      - any-element-3
    any-prop-2:
      any-value-1: 123
      any-value-2: true
      any-value-3: something
    any-prop-3: anything
  file-name-B.txt: Hello World
  file-name-C.yml:
    any-value: any-value
    any-list:
      - any-element-1
      - any-element-2
```

Real world's templates' examples are [HERE](/examples/EXAMPLES.md).

## Use cases

### Install your fixed template to your existing project

You can add your fixed template with `dept add` then install the template to your existing project with `dept install`.
And you can set a default template with `dept default`.

```bash
$ dept add react-eslint-prettier -f ./template.json
$ dept default react-eslint-prettier
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ cd your-app # Already NPM installed
$ dept install
```

### Install your fixed template in your new project

It initializes your new project automatically if `package.json` doesn't exist.

```bash
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ mkdir your-new-app
$ cd your-new-app # NOT NPM installed
$ dept install
```

### Install your fixed template in your new project with Yarn

You can also use `yarn` instead of `npm` after you change a package manager with `env` and `use`.

```bash
$ dept env
* npm
  yarn
$ dept use yarn
$ dept env
  npm
* yarn
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ mkdir your-new-app
$ cd your-new-app # NOT Yarn installed
$ dept install
```

### Specify a template from your fixed templates

Of course, you can specify a template you'd like to use in your project after `dept install`.

```bash
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ cd your-app
$ dept install express-typescript
```

### View a field in a template

You can view a field in a template with `dept view`.

```bash
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ dept view express-typescript "dependencies"
{
        "express": "^4.16.0",
        "mongoose": "*"
}
$ dept view express-typescript "dependencies.express"
"^4.16.0"
```

### Update a field in a template

You can update a field in a template with `dept update`.
Either `dependencies`, `devDependencies` or `files` is updatable.

```bash
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ dept update express-typescript "dependencies={\"express\":\"^4.16.4\", \"mongoose\":\">=5.3.10\"}"
```

### Export a template file as JSON format

You can export a JSON template file with `dept export` to share it.

```bash
$ dept list
* react-eslint-prettier
  express-typescript
  vue-nuxt
$ dept export react-eslint-prettier --filename fixed-react-eslint-prettier.json --out-dir ./fixed-templates-dir
```

## Helper commands

### Convert a JSON file to a YAML file

You  can convet a JSON file to a YAML file with `dept json2yaml`.

```bash
$ dept json2yaml --file ./data.json --filename your-data.yml --out-dir ./converted-dir
$ ls ./converted-dir/
your-data.yml
$ dept jy -f ./data.json # Short expression
$ ls ./
data.yml
```

### Convert a YAML file to a JSON file

You  can convet a YAML file to a JSON file with `dept yaml2json`.

```bash
$ dept yaml2json --file ./data.yml --filename your-data.json --out-dir ./converted-dir
$ ls ./converted-dir/
your-data.json
$ dept yj -f ./data.yml # Short expression
$ ls ./
data.json
```

[npm-url]: https://npmjs.org/package/dept
[npm-image]: https://badge.fury.io/js/dept.svg
[npm-downloads-url]: https://npmjs.org/package/dept
[npm-downloads-image]: https://img.shields.io/npm/dt/dept.svg
[travis-url]: https://travis-ci.org/keidrun/dept
[travis-image]: https://secure.travis-ci.org/keidrun/dept.svg?branch=master
[depstat-url]: https://david-dm.org/keidrun/dept
[depstat-image]: https://david-dm.org/keidrun/dept.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[greenkeeper-url]: https://greenkeeper.io/
[greenkeeper-image]: https://badges.greenkeeper.io/keidrun/dept.svg
