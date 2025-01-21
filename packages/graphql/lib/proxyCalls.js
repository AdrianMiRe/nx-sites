const proxyCalls = async (query) => {
  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  });

  const { data, errors } = await response.json();

  return {
    data,
    errors
  }
}

export default proxyCalls;