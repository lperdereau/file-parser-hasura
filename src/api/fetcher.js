const fetch = require('node-fetch');

module.exports = {
  fetcher: (url, token, query, variables, headers) => {
    return fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
  },
  fetchAsync: async (url, token, fetcher, query, variables, headers) => {
    const response = await fetcher(url, token, query, variables, headers);
    if (!response.ok) {
      throw response;
    }
    try {
      return await response.json();
    } catch (err) {
      console.error("Error parsing JSON", err);
    }
  }
}
