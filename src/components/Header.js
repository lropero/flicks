import React from 'react'
import styled from 'styled-components/native'
import { Header as HeaderNB } from 'native-base'

const Title = styled.Text`
  align-self: flex-end;
  color: ${({ theme }) => theme.sanMarino};
  font-size: 22px;
  padding-bottom: 12px;
`

const Header = () => (
  <HeaderNB><Title>Flicks</Title></HeaderNB>
)

export default Header
