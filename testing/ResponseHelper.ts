export function returnOk(url: string = "", body = {}, headers: any = {}) {
  return returnResponse(url, body, headers);
}

export function returnNotFound(url: string = "", body = {}, headers: any = {}) {
  return returnResponse(url, body, headers, 404);
}

function returnResponse(
  url: string,
  body,
  headers: any = {},
  status: number = 200
) {
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/ld+json";
  }

  const result = new Response(JSON.stringify(body), {
    headers,
    status,
  });
  Object.defineProperty(result, "url", { value: url });
  return result;
}
