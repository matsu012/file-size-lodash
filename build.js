import webpack from 'webpack'
import lodash from 'lodash'
import { existsSync, readFileSync } from 'fs'

const webpackEntries = []

Object.keys(lodash).forEach(k => {
 if (typeof(lodash[k]) === 'function') {
  const filename = `${k}.js`
  const path = `./node_modules/lodash/${filename}`
  if (existsSync(path)) {
   functionNames.push(k)
   webpackEntries.push({
    entry: path,
    output: {
     filename,
    },
    mode: 'production'
   })
  }
 }
})

webpack(webpackEntries, (err, stats) => {
 if (err || stats.hasErrors()) {
   console.error(err)
   return
 }
 console.log('done!')
})