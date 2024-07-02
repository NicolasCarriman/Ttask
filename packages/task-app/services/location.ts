
export async function getLocations(query: string) {
  const input = query;
  const inputType = 'textquery';

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=${inputType}&key=${"AIzaSyD0_ge9d2Ee5X4p2Bq7DIACs6rUMHGsmUE"}`;
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  });

  const response = fetch(request).then(r => r.json());
  return response;
}
