import fetch from 'node-fetch'
import csv from 'csv-parser'

export async function fetchAndParseCSV(csvUrl) {
  const response = await fetch(csvUrl)

  return new Promise((resolve, reject) => {
    const data = []
    response.body
      .pipe(csv())
      .on('data', (chunk) => {
        data.push(chunk)
      })
      .on('end', () => {
        return resolve(data)
      })
      .on('error', reject)
  })
}
