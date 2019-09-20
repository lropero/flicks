import axios from 'axios'

import config from 'flicks/config'

const useTMDbAPI = () => {
  return {
    popular: async () => {
      let movies = []
      try {
        const response = await axios.get(`${config.api}/movie/popular?api_key=${config.apiKey}`)
        movies = (response.status === 200 && response.data.results.sort((a, b) => a.popularity < b.popularity ? 1 : -1)) || movies
      } catch (error) {
        console.error(error.toString())
      }
      return movies
    },
    search: async (term) => {
      let movies = []
      try {
        const response = await axios.get(`${config.api}/search/movie?api_key=${config.apiKey}&query=${encodeURIComponent(term)}`)
        movies = (response.status === 200 && response.data.results.sort((a, b) => a.popularity < b.popularity ? 1 : -1)) || movies
      } catch (error) {
        console.error(error.toString())
      }
      return movies
    }
  }
}

export default useTMDbAPI
