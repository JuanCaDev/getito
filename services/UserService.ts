export default {
  async getUser(accessToken: string) {
    try {
      const res = await fetch('https://api.mercadolibre.com/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message)
      return json
    } catch (e) {
      throw Error(e.message)
    }
  },

  async saveUser(user) {
    try {
      const res = await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          store: user.store,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          permalink: user.permalink,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      return json
    } catch (e) {
      throw Error(e.message)
    }
  }
}