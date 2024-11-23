import { Button } from '@chakra-ui/react'
import React from 'react'
// import { login } from '../../../Backend/src/controllers/userControllers'
import { useRecoilState, useSetRecoilState } from 'recoil'
import userAtom from './atoms/userAtoms'
import { showHooks } from './hooks/showHooks'

export const Logout = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = showHooks();
    const handleOut = async () => {
        try {
            const res = await fetch('/api/users/logout', {
                method: "POST",
                headers: {
                    "Content": "application/json"
                }
            })
            const data = await res.json();
            if (data.error) {
                showToast("Errro", data.error, "error")
                return;
            }
            localStorage.removeItem("user-threads") 
            setUser(null);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <Button position={'fixed'} top={'30px'} right={'30px'} size={'sm'} onClick={handleOut}>
                Logout
            </Button>
        </>
    )
}
