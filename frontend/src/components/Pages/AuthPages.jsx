import React from 'react'
import SignupCard from '../SignupCard'
import LoginCard from '../LoginCard'
import authScreenAtom from '../atoms/Authatoms'
import { useRecoilValue } from 'recoil'

const AuthPages = () => {
    const authScreenState = useRecoilValue(authScreenAtom)
    // console.log(authScreenState);
    return (
        <>
            {/* <SignupCard />
            <LoginCard /> */}
            {authScreenState === 'login' ? <LoginCard /> : <SignupCard />}
            {/* {authScreenAtom === 'SignUp' ? <SignupCard /> : <LoginCard />} */}
        </>
    )
}

export default AuthPages