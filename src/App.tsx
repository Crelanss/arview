import React from 'react'
import styled from 'styled-components'

import Main from './components/Main'

const Container = styled.div`
  width:100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 200px;
`


const App: React.FC = () => {
  return (
      <Container>
          <Main/>
      </Container>
  )
}

export default App;
