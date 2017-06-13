

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(resp => resp.json());
}

export function fetchJson(url) {
  return fetch(url)
    .then(resp => resp.json());
}

export function fetchAuthenticated(url, jwt) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  .then(resp => {
    if (resp.status >= 200 && resp < 300) {
      return resp;
    }

    const error = new Error(resp.json());
    error.response = resp;
    throw error;
  })
  .then(resp => resp.json());
}
