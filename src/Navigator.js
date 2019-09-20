import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Favorites, Search } from 'flicks/src/components'

const Navigator = createStackNavigator({
  Favorites: { screen: Favorites },
  Search: { screen: Search }
}, {
  defaultNavigationOptions: {
    gesturesEnabled: false
  },
  headerMode: 'none',
  initialRouteName: 'Search',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0
    }
  })
})

export default createAppContainer(Navigator)
