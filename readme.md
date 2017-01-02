# untar-memory

> Untar a tarball to an [in-memory filesystem](https://github.com/webpack/memory-fs)

[![build status](https://img.shields.io/travis/queckezz/untar-memory.svg?style=flat-square)](https://travis-ci.org/queckezz/untar-memory)
[![npm version](https://img.shields.io/npm/v/untar-memory.svg?style=flat-square)](https://npmjs.org/package/untar-memory)
[![dependency status](https://img.shields.io/david/queckezz/untar-memory.svg?style=flat-square)](https://david-dm.org/queckezz/untar-memory)
[![license](https://img.shields.io/npm/l/untar-memory.svg?style=flat-square)](./license)
[![code style: standard](https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

## Installation

```bash
$ npm install untar-memory
```

## Example

```js
const untarToMemory = require('untar-memory')

untarToMemory('./tar-file.tgz') // or pass in an existing read stream
  .then((memoryFileSystem) => {
    memoryFileSystem.readFileSync('/package/readme.md', 'utf8')
    // -> # title ...
  })
```

## Tests

```bash
$ npm test 
```

## License

[MIT](./license)

