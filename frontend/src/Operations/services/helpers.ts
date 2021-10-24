export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export function api<T>(
  backendUrl: string,
  port: string,
  endpoint: string,
  method: API_METHODS = API_METHODS.GET,
  query: { [key: string]: string } = {}
): Promise<T> {
  let separatorBeforeQueryIfNeeded = "";

  if (Object.keys(query).length !== 0) {
    separatorBeforeQueryIfNeeded = "?";
  }

  return fetch(
    `${backendUrl}:${port}/${endpoint}${
      separatorBeforeQueryIfNeeded + new URLSearchParams(query)
    }`,
    {
      method,
    }
  ).then((response) => {
    if (!response.ok) {
      console.error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
