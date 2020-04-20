import fetch from 'node-fetch'
import csv from 'csv-parser'

const NY_TIMES_STATE_DATA_URL =
  'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv'

async function parseDataset(dataset) {
  const response = await fetch(NY_TIMES_STATE_DATA_URL)

  return new Promise((resolve, reject) => {
    const data = []
    response.body
      .pipe(csv())
      .on('data', (chunk) => {
        data.push(chunk)
      })
      .on('end', () => {
        console.log('data', data)
        return resolve(data)
      })
      .on('error', reject)
  })
}

export async function handler(event, context, callback) {
  const stateData = await parseDataset()

  console.log('stateData', stateData)

  return {
    statusCode: 200,
    body: JSON.stringify(stateData),
  }
}
