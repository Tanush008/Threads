import { Button, Container } from '@chakra-ui/react'
import UserPages from './components/Pages/UserPages'
import PostPages from './components/Pages/PostPages'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AuthPages from './components/Pages/AuthPages'

function App() {
  return (
    <>
      <Header />
      <Container maxW='620px'>
        <Routes>
          <Route path='/:username' element={<UserPages />} />
          <Route path='/:username/post/:pid' element={<PostPages />} />
          <Route path='/auth' element={<AuthPages />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
