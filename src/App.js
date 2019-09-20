import React, { useReducer } from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import Navigator from 'flicks/src/Navigator'
import { Favorites } from 'flicks/src/contexts'
import { theme } from 'flicks/src/utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return [...state, action.payload]
    case 'REMOVE': return state.filter((favorite) => favorite.id !== action.payload)
  }
}

const App = () => {
  const [favorites, dispatchFavorite] = useReducer(reducer, [])

  return (
    <Favorites.Provider value={{ dispatchFavorite, favorites }}>
      <ThemeProvider theme={theme}>
        <>
          <StatusBar barStyle='dark-content' />
          <Navigator />
        </>
      </ThemeProvider>
    </Favorites.Provider>
  )
}

export default App
