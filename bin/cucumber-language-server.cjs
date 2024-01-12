#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
require('source-map-support').install()
const { startStandaloneServer } = require('../dist/cjs/src/wasm/startStandaloneServer')
const { NodeFiles } = require('../dist/cjs/src/node/NodeFiles')
const path = require('path')
const { version } = require('../dist/cjs/src/version')

const wasmBasePath = path.resolve(
  `${__dirname}/../node_modules/@binhtran432k/cucumber-language-service/dist`
)
const { connection } = startStandaloneServer(wasmBasePath, (rootUri) => new NodeFiles(rootUri))

// Don't die on unhandled Promise rejections
process.on('unhandledRejection', (reason, p) => {
  connection.console.error(
    `Cucumber Language Server ${version}: Unhandled Rejection at promise: ${p}, reason: ${reason}`
  )
})
