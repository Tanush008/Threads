'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from './atoms/Authatoms'
import { showHooks } from './hooks/showHooks'
import userAtom from './atoms/userAtoms'

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const changeAuthState = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom);
    const toast = showHooks();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const handleLogin = async () => {
        try {
            const res = await fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    "Content": "application/json"
                },
                body: JSON.stringify(inputs),
            })
            // console.log(inputs);
            
            const data = await res.json();
            if (data.error) {
                toast('error', data.error, "error")
                return;
            }
            // console.log(data); 
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}

            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                </Stack>
                <Box w={{
                    sm: "400px",
                    base: "full"
                }}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>UserName</FormLabel>
                            <Input type="text"
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                value={inputs.username}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    value={inputs.password}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',

                                }}
                                onClick={handleLogin}>
                                Log In
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'} >
                                Does'nt have an Account? <Link color={'blue.400'} onClick={() => changeAuthState('SignUp')}>Sign Up </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}