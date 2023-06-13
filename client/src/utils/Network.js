// network.js

const API_BASE_URL = "http://localhost:5000/";

async function sendRequest(url, method, body = null) {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  };
  //  console.log(token);
  const response = await fetch(`${API_BASE_URL}${url}`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred.");
  }

  return data;
}

export async function get(url) {
  return sendRequest(url, "GET");
}

export async function post(url, body) {
  return sendRequest(url, "POST", body);
}

export async function put(url, body) {
  return sendRequest(url, "PUT", body);
}
