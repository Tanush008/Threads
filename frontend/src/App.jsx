import { Button, Container } from '@chakra-ui/react'
import UserPages from './components/Pages/UserPages'
import PostPages from './components/Pages/PostPages'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AuthPages from './components/Pages/AuthPages'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from './components/atoms/userAtoms'
import HomePages from './components/Pages/HomePages'
import { Logout } from './components/Logout'
import UpdateProfile from './components/Pages/UpdateProfile'

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <>
      <Header />
      <Container maxW='620px'>
        <Routes>
          <Route path='/Home' element={user ? <HomePages /> : <Navigate to='/auth' />} />
          <Route path='/:username' element={<UserPages />} />
          <Route path='/:username/post/:pid' element={<PostPages />} />
          <Route path='/auth' element={!user ? <AuthPages /> : <Navigate to='/' />} />
          {/* <Route path='/updateProfile' element={user ? <UpdateProfile /> : <Navigate to='/auth' />} /> */}
          <Route path='/update' element={<UpdateProfile />}/>
        </Routes>
        <Logout />
      </Container>
    </>
  )
}

export default App
