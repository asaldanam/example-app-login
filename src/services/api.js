export const checkSession = async () => {
  return request('api/check-session');
};

export const login = async (body) => {
  console.log('login', body)
  await request('api/login', { method: 'POST', body })
}

// Private

/** 
 * @param {string} path
 * @param {RequestInit | undefined} init
 */
const request = async (path, init) => {
  const response = await  fetch(`http://localhost:8080/${path}`, {
    mode: 'cors',
    credentials: 'include',
    ...(init || {}),
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  })

  if (response.status >= 400) {
    throw new Error(response.status);
  }

  return await response.json();
}