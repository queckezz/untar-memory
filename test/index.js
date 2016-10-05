
const untarToMemory = require('../src')
const MemoryFs = require('memory-fs')
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

test('should allow existing memory-fs to be passed in', (t) => {
  const mfs = new MemoryFs()
  mfs.writeFileSync('/text.txt', 'hello world', 'utf8')
  untarToMemory(join(__dirname, './fixture.tgz'), mfs)
    .then(() => {
      t.equal(mfs.readFileSync('/text.txt', 'utf8'), 'hello world')
      t.true(mfs.statSync('/package/readme.md', 'utf8').isFile())
      t.end()
    })
})
