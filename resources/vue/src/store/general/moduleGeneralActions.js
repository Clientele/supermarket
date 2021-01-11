
import axios from '@/axios.js'

export default {


  // Fetch emails
  fetchEmails ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/api/apps/email/mails', { params: {filter: payload.filter} })
        .then((response) => {
         // commit('SET_MAILS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },


}
