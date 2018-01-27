export default {
  login (axios, email, password) {
    return axios.post('login.json', {
      email: email,
      password: password
    })
  },
  profile: {
    view (axios, apiToken) {
      return axios.get('profile.json', {
        headers: { 'x-api-key': apiToken }
      })
    },
    edit (axios, apiToken, data) {
      return axios.patch('profile.json', data, {
        headers: { 'x-api-key': apiToken }
      })
    },
    changePassword (axios, apiToken, data) {
      return axios.patch('profile/change-password.json', data, {
        headers: { 'x-api-key': apiToken }
      })
    }
  },
  guests: {
    view (axios, apiToken, id) {
      return axios.get(`guests/${id}.json`, {
        headers: { 'x-api-key': apiToken }
      })
    },
    addTickets (axios, apiToken, id) {
      return axios.patch(`guests/add_tickets/${id}.json`, null, {
        headers: { 'x-api-key': apiToken }
      })
    }
  },
  casts: {
    index (axios, apiToken, page = 1) {
      return axios.get('casts.json', {
        headers: { 'x-api-key': apiToken },
        params: { page: page }
      })
    },
    view (axios, apiToken, id) {
      return axios.get(`casts/${id}.json`, {
        headers: { 'x-api-key': apiToken }
      })
    },
    like (axios, apiToken, id) {
      return axios.post(`casts/like/${id}.json`, null, {
        headers: { 'x-api-key': apiToken }
      })
    },
    select (axios, apiToken, id) {
      return axios.post(`casts/select/${id}.json`, null, {
        headers: { 'x-api-key': apiToken }
      })
    }
  },
  home: {
    likedCasts (axios, apiToken) {
      return axios.get('home/liked-casts.json', {
        headers: { 'x-api-key': apiToken }
      })
    },
    selectedCasts (axios, apiToken) {
      return axios.get('home/selected-casts.json', {
        headers: { 'x-api-key': apiToken }
      })
    },
    likingGuests (axios, apiToken) {
      return axios.get('home/liking-guests.json', {
        headers: { 'x-api-key': apiToken }
      })
    },
    selectingGuests (axios, apiToken) {
      return axios.get('home/selecting-guests.json', {
        headers: { 'x-api-key': apiToken }
      })
    }
  },
  messages: {
    index (axios, apiToken, userId, page = 1) {
      return axios.get(`messages/${userId}.json`, {
        headers: { 'x-api-key': apiToken },
        params: { page: page }
      })
    },
    add (axios, apiToken, data) {
      return axios.post('messages.json', data, {
        headers: { 'x-api-key': apiToken }
      })
    },
    unreadCount (axios, apiToken) {
      return axios.get('messages/unread-count.json', {
        headers: { 'x-api-key': apiToken }
      })
    }
  }
}
