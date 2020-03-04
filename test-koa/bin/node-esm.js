#!/usr/bin/env node

/**
 * Node - run esm module
 */
'use strict'

// eslint-disable-next-line
require = require('esm')(module)

const args = process.argv.slice(2)
const path = require('path')
const chalk = require('chalk')

if (!args.length) {
	console.log(chalk.red('Need to specify esm module file path to run.'))
	process.exit()
}

require(path.join('..', args[0].trim()))
