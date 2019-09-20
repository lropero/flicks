import React, { useContext } from 'react'
import styled, { withTheme } from 'styled-components/native'
import { Container, Content, Icon } from 'native-base'
import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'

import { Favorites as FavoritesContext } from 'flicks/src/contexts'
import { Footer, Header } from 'flicks/src/components'

const Center = styled.View`
  background-color: ${({ theme }) => theme.silver};
  flex: 1;
  justify-content: center;
`

const Favorite = styled.View`
  height: 40px;
  justify-content: flex-end;
  margin-top: -40px;
  padding-right: 6px;
`

const Movie = styled.View`
  align-items: flex-end;
  margin: 10px 0 0 10px;
`

const Poster = styled.View`
  background-color: ${({ theme }) => theme.mineShaft};
  padding: 1px;
`

const Text = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.mineShaft};
  font-size: 18px;
`

const Favorites = ({ theme }) => {
  const { dispatchFavorite, favorites } = useContext(FavoritesContext)

  const removeFavorite = (movieId) => {
    dispatchFavorite({
      type: 'REMOVE',
      payload: movieId
    })
  }

  const renderItem = ({ item }) => {
    const size = Math.floor(Dimensions.get('window').width / 2) - 16
    return (
      <Movie>
        <Poster>
          <Image
            source={{ uri: item.poster }}
            style={{ height: size, width: size }}
          />
        </Poster>
        <Favorite>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => removeFavorite(item.id)}
          >
            <Icon
              name='heart'
              style={{
                color: theme.red,
                fontSize: 38
              }}
            />
          </TouchableOpacity>
        </Favorite>
      </Movie>
    )
  }

  return (
    <Container>
      <Header />
      <Content
        contentContainerStyle={{ height: '100%' }}
        scrollEnabled={false}
      >
        {favorites.length ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 10 }}
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={renderItem}
          />
        ) : <Center><Text>You have no favorite movies.</Text></Center>}
      </Content>
      <Footer />
    </Container>
  )
}

export default withTheme(Favorites)
