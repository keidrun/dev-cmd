#!/usr/bin/env node
import yargs from 'yargs'
import cmds from './cmds'

const argv = yargs // eslint-disable-line
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'list',
    aliases: ['ls'],
    describe: 'Show all templates',
  })
  .command({
    command: 'show [templateName]',
    aliases: ['s'],
    describe: 'Show a template in details',
  })
  .command({
    command: 'default [templateName]',
    aliases: ['df'],
    describe: 'Use a template by default',
  })
  .command({
    command: 'install [templateName]',
    aliases: ['i'],
    describe: 'Install dependencies and config files from a template',
  })
  .command({
    command: 'add [templateName]',
    aliases: ['a'],
    describe: "Add a template with '--data' or '--file' options",
  })
  .command({
    command: 'remove [templateName]',
    aliases: ['r'],
    describe: 'Remove a template',
  })
  .command({
    command: 'rename [templateName] [newTemplateName]',
    aliases: ['mv'],
    describe: 'Rename a template name',
  })
  .command({
    command: 'view [templateName] [viewStatement]',
    aliases: ['v'],
    describe: 'View a filed in a template',
  })
  .command({
    command: 'update [templateName] [updateStatement]',
    aliases: ['u'],
    describe: 'Update a filed in a template',
  })
  .command({
    command: 'export [templateName]',
    aliases: ['e'],
    describe: 'Export a JSON template file',
  })
  .command({
    command: 'listenv',
    aliases: ['env'],
    describe: 'Show all package managers',
  })
  .command({
    command: 'useenv [environment]',
    aliases: ['use'],
    describe: 'Use a package manager',
  })
  .command({
    command: 'json2yaml',
    aliases: ['jy'],
    describe: "Convert a JSON format to a YAML format with '--data' or '--file' options",
  })
  .command({
    command: 'yaml2json',
    aliases: ['yj'],
    describe: "Convert a YAML format to a JSON format with '--data' or '--file' options",
  })
  .option('data', {
    alias: 'd',
    describe: "Specify a JSON or YAML data string with 'add', 'json2yaml' or 'yaml2json'",
    type: 'string',
  })
  .option('file', {
    alias: 'f',
    describe: "Specify a JSON or YAML file with 'add', 'json2yaml' or 'yaml2json'",
    type: 'string',
  })
  .option('filename', {
    alias: 'n',
    describe: "Specify a filename of a JSON or YAML file with 'export', 'json2yaml' or 'yaml2json'",
    type: 'string',
  })
  .option('out-dir', {
    alias: 'o',
    describe:
      "Specify an output directory path to export a JSON or YAML file with 'export', 'json2yaml' or 'yaml2json'",
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .alias('version', 'v').argv

const command = argv._[0]

if (command === 'list' || command === 'ls') {
  cmds.list()
} else if (command === 'show' || command === 's') {
  cmds.show(argv.templateName)
} else if (command === 'default' || command === 'd') {
  cmds.setDefault(argv.templateName)
} else if (command === 'install' || command === 'i') {
  cmds.install(argv.templateName)
} else if (command === 'add' || command === 'a') {
  if (argv.data) {
    cmds.add(argv.templateName, argv.data)
  } else if (argv.file) {
    cmds.addFromFile(argv.templateName, argv.file)
  } else {
    console.log("Specify --data or --file options with 'add'")
  }
} else if (command === 'remove' || command === 'r') {
  cmds.remove(argv.templateName)
} else if (command === 'rename' || command === 'mv') {
  cmds.rename(argv.templateName, argv.newTemplateName)
} else if (command === 'view' || command === 'v') {
  cmds.viewFile(argv.templateName, argv.viewStatement)
} else if (command === 'update' || command === 'u') {
  cmds.updateFile(argv.templateName, argv.updateStatement)
} else if (command === 'export' || command === 'e') {
  cmds.exportFile(argv.templateName, argv.filename, argv['out-dir'])
} else if (command === 'listenv' || command === 'env') {
  cmds.listEnvs()
} else if (command === 'useenv' || command === 'use') {
  cmds.useEnv(argv.environment)
} else if (command === 'json2yaml' || command === 'jy') {
  if (argv.data) {
    cmds.jsonToYaml(argv.data)
  } else if (argv.file) {
    cmds.jsonToYamlFromFile(argv.file, argv.filename, argv['out-dir'])
  } else {
    console.log("Specify --data or --file options with 'json2yaml'")
  }
} else if (command === 'yaml2json' || command === 'yj') {
  if (argv.data) {
    cmds.yamlToJson(argv.data)
  } else if (argv.file) {
    cmds.yamlToJsonFromFile(argv.file, argv.filename, argv['out-dir'])
  } else {
    console.log("Specify --data or --file options with 'yaml2json'")
  }
} else if (command) {
  console.log(`Not such a command: '${command}'`)
} else {
  yargs.showHelp()
}

if (process.env.NODE_ENV !== 'production') process.on('unhandledRejection', console.error.bind(console))
