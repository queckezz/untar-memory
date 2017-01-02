
const { createReadStream } = require('fs')
const concat = require('concat-stream')
const gunzip = require('gunzip-maybe')
const MemoryFs = require('memory-fs')
const fileType = require('file-type')
const { dirname } = require('path')
const tar = require('tar')

module.exports = untarToMemory

function untarToMemory (file, mfs) {
  mfs = mfs || new MemoryFs()
  const tarball = 'string' === typeof file?
        createReadStream(file) :
        file

  return new Promise((resolve, reject) => {
    tarball
      .pipe(gunzip())
      .pipe(tar.Parse())
      .on('entry', (entry) => {
        const path = '/' + entry.props.path
        mfs.mkdirpSync(dirname(path))

        entry.pipe(concat((buf) => {
          const encoding = fileType(buf) ? 'binary' : 'utf8'
          mfs.writeFileSync(path, buf, encoding)
        }))
      })
      .on('end', () => resolve(mfs))
      .on('error', reject)
  })
}
