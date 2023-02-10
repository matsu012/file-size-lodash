import { readFileSync, writeFileSync } from 'fs'
import { gzipSizeSync } from 'gzip-size'
import big from 'big.js'
import json2md from 'json2md'



const functionNames = []

const fileSizes = functionNames.map(fn => {
 const path = `./dist/${fn}.js`
 const f = readFileSync(path)
 const size = f.toString().length
 const sizeZip = gzipSizeSync(f)
 return {
  functionName: fn,
  size,
  sizeZip
 }
}).sort((a, b) => {
 if (a.size < b.size) {
  return 1
 }
 if (a.size > b.size) {
  return -1
 }
 return 0
})
const table = {
 table: {
  headers: ['Function Name', 'File Size(kB)', 'Gzip file Size(kB)'],
  rows: fileSizes.map(f => ([
   f.functionName,
   big(f.size).div(1000).toFixed(1),
   big(f.sizeZip).div(1000).toFixed(1)
  ]))
 }
}
writeFileSync('./data.md', json2md(table))
