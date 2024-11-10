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
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from './atoms/Authatoms'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [input, SetInput] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const changeAuthState = useResetRecoilState(authScreenAtom)
  const toast = useToast();
  const HandleSignUp = async () => {
    // console.log(input);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      localStorage.setItem("user-threads", JSON.stringify(data))
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        return
      }
      // console.log(data);

    } catch (error) {

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
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>FullName</FormLabel>
                  <Input type="text"
                    onChange={(e) => SetInput({ ...input, name: e.target.value })}
                    value={input.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text"
                    onChange={(e) => SetInput({ ...input, username: e.target.value })}
                    value={input.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                onChange={(e) => SetInput({ ...input, email: e.target.value })}
                value={input.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  onChange={(e) => SetInput({ ...input, password: e.target.value })}
                  value={input.password}
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
                onClick={HandleSignUp}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => changeAuthState('Login')}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}