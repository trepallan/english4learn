interface api {
  url: string;
  method: string;
  body: any;
  headers: any;
}

export interface ApiConfig {
  method: string;
  path: string;
  body?: any;
}

const url = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
};

// Request interceptor
export default async function api(config: {
  method: string;
  path: string;
  body?: any;
}) {
  console.log(url);
  const { method, path, body } = config;
  const api: api = {
    url: `${url}` + path,
    method,
    body,
    headers,
  };

  const response = await fetch(api.url, {
    method: api.method,
    headers: api.headers,
    body: JSON.stringify(api.body),
  });
  return response;
}
