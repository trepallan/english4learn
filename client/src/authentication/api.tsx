interface apiConfig {
  url: string;
  method: string;
  body: any;
  headers: any;
}

const url = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
};

// Request interceptor
async function request(config: { method: string; path: string; body?: any }) {
  const { method, path, body } = config;
  const conf: apiConfig = {
    url: `${url}` + path,
    method,
    body,
    headers,
  };

  const response = await fetch(conf.url, {
    method: conf.method,
    headers: conf.headers,
    body: JSON.stringify(conf.body),
  });
  return response;
}

//   /$$$$$$  /$$$$$$$  /$$$$$$
//  /$$__  $$| $$__  $$|_  $$_/
// | $$  \ $$| $$  \ $$  | $$
// | $$$$$$$$| $$$$$$$/  | $$
// | $$__  $$| $$____/   | $$
// | $$  | $$| $$        | $$
// | $$  | $$| $$       /$$$$$$
// |__/  |__/|__/      |______/
export default class api {
  static get = (path: string) => request({ method: "GET", path });
  static post = (path: string, body: any) =>
    request({ method: "POST", path, body });
}
