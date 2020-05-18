export default async function fetchStateData() {
  const data = await fetch('/.netlify/functions/getNYTStateData').then((res) => res.json())

  return data
}
