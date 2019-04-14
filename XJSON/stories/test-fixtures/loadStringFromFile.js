export default async function loadStringFromFile(uri) {
  const response = await fetch(uri);
  const text = await response.text();
  return text;
}
