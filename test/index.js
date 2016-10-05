
const untarToMemory = require('../src')
const { join } = require('path')
const test = require('tape')

test('should untar to memory', (t) => {
  untarToMemory(join(__dirname, './fixture.tgz'))
    .then((mfs) => {
      t.true(mfs.statSync('/package/readme.md', 'utf8').isFile())
      t.true(mfs.statSync('/package/test', 'utf8').isDirectory())
      t.end()
    })
})
