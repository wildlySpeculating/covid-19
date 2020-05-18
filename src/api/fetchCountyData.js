export default async function fetchCountyData() {
  const data = await fetch('/.netlify/functions/getNYTCountyData').then((res) => res.json())

  return data
}
