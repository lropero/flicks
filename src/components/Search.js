import React, { useContext, useEffect, useState } from 'react'
import debounce from 'debounce'
import styled, { withTheme } from 'styled-components/native'
import { Container, Content, Form, Icon, Input, Item } from 'native-base'
import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'

import { Favorites as FavoritesContext } from 'flicks/src/contexts'
import { Footer, Header } from 'flicks/src/components'
import { useTMDbAPI } from 'flicks/src/hooks'

const Details = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 2px 0 0 10px;
`

const Favorite = styled.View`
  height: 40px;
  justify-content: flex-end;
  margin-top: -40px;
  padding-right: 6px;
`

const Left = styled.View`
  align-items: flex-end;
`

const Movie = styled.View`
  flex-direction: row;
  padding: 10px 10px 0;
`

const Overview = styled.Text`
  color: ${({ theme }) => theme.mineShaft};
  font-size: 12px;
`

const Poster = styled.View`
  background-color: ${({ theme }) => theme.mineShaft};
  padding: 1px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.sanMarino};
  font-size: 16px;
`

const Search = ({ theme }) => {
  const api = useTMDbAPI()
  const [movies, setMovies] = useState([])
  const [term, setTerm] = useState('')
  const { dispatchFavorite, favorites } = useContext(FavoritesContext)

  useEffect(() => {
    const fetch = async () => {
      const movies = term.length ? await api.search(term) : await api.popular()
      setMovies(movies)
    }
    fetch()
  }, [term])

  const handleChangeText = debounce((term) => {
    setTerm(term)
  }, 500)

  const renderItem = ({ item }) => {
    const size = Math.floor(Dimensions.get('window').width / 4)
    return (
      <Movie>
        <Left>
          <Poster>
            <Image
              source={{ uri: `http://image.tmdb.org/t/p/w185/${item.poster_path}` }}
              style={{ height: size, width: size }}
            />
          </Poster>
          <Favorite>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleFavorite({
                id: item.id,
                overview: item.overview,
                poster: `http://image.tmdb.org/t/p/w185/${item.poster_path}`,
                title: item.title
              })}
            >
              <Icon
                name='heart'
                style={{
                  color: favorites.map((favorite) => favorite.id).includes(item.id) ? theme.red : `${theme.titanWhite}ee`,
                  fontSize: 38
                }}
              />
            </TouchableOpacity>
          </Favorite>
        </Left>
        <Details>
          <Title numberOfLines={1}>{item.title}</Title>
          <Overview numberOfLines={4}>{(item.overview.length && item.overview) || 'No overview available'}</Overview>
        </Details>
      </Movie>
    )
  }

  const toggleFavorite = (movie) => {
    if (!favorites.map((favorite) => favorite.id).includes(movie.id)) {
      dispatchFavorite({
        type: 'ADD',
        payload: movie
      })
    } else {
      dispatchFavorite({
        type: 'REMOVE',
        payload: movie.id
      })
    }
  }

  return (
    <Container>
      <Header />
      <Content
        contentContainerStyle={{ height: '100%' }}
        scrollEnabled={false}
      >
        <Form>
          <Item last>
            <Input
              onChangeText={handleChangeText}
              placeholder='Search movies'
            />
          </Item>
        </Form>
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={renderItem}
        />
      </Content>
      <Footer />
    </Container>
  )
}

export default withTheme(Search)
