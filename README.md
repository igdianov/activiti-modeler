# Unofficial Activiti Modeler Electron Application Beta

[![Build Status](https://travis-ci.org/igdianov/activiti-modeler.svg?branch=master)](https://travis-ci.org/igdianov/activiti-modeler)

An integrated modeling solution for BPMN and DMN based on [bpmn.io](http://bpmn.io).

![Activiti Modeler](docs/screenshot.png)

## Building the Application

```sh
# checkout 
git checkout 

# install dependencies
npm install

# execute all checks (lint, test and build)
npm run all

# build the application to ./dist
npm run build
```


### Development Setup

Spin up the application for development, all strings attached:

```
npm run dev
```


## License

MIT

Uses [bpmn-js](https://github.com/bpmn-io/bpmn-js), [dmn-js](https://github.com/bpmn-io/dmn-js), and [cmmn-js](https://github.com/bpmn-io/cmmn-js), licensed under the [bpmn.io license](http://bpmn.io/license).
