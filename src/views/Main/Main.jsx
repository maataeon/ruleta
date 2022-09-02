import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Roulette from '../../components/Roulette/Roulette';

const Main = () => {
  return (
    <Container>
      <Typography>Main</Typography>
      <Roulette />
    </Container>
  )
}

export default Main