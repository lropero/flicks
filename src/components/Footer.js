import React from 'react'
import styled, { withTheme } from 'styled-components/native'
import { Footer as FooterNB, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const Icons = styled.View`
  align-self: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const Footer = ({ navigation, theme }) => {
  const { routeName } = navigation.state

  const navigate = (screen) => {
    if (screen !== routeName) {
      navigation.navigate(screen)
    }
  }

  return (
    <FooterNB>
      <Icons>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('Search')}>
          <Icon
            name='home'
            style={{
              color: routeName === 'Search' ? theme.sanMarino : theme.silver,
              fontSize: 38
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('Favorites')}>
          <Icon
            name='heart'
            style={{
              color: routeName === 'Favorites' ? theme.sanMarino : theme.silver,
              fontSize: 38
            }}
          />
        </TouchableOpacity>
      </Icons>
    </FooterNB>
  )
}

export default withNavigation(withTheme(Footer))
