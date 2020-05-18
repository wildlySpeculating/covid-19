import { fetchAndParseCSV } from '../helpers'

const NY_TIMES_COUNTY_DATA_URL =
  'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'

function processData(dataset) {
  return dataset.map((item) => ({
    ...item,
    date: item.date.split('-').slice(1).join('/'),
    cases: Number(item.cases),
    deaths: Number(item.deaths),
  }))
}

export async function handler(event, context, callback) {
  const data = await fetchAndParseCSV(NY_TIMES_COUNTY_DATA_URL)

  const processedData = processData(data)

  return {
    statusCode: 200,
    body: JSON.stringify(processedData),
  }
}
