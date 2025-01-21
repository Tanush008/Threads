'use client'

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtoms'
import { useState } from 'react'
import { useRef } from 'react'
import usePreviewImage from '../hooks/usePreviewImage'
import { showHooks } from '../hooks/showHooks'

export default function UpdateProfile() {
    const [user, SetUser] = useRecoilState(userAtom);
    const [inputs, SetInputs] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio,
        email: user.email,
        profilePic: user.profilePic,
        password: "",
    })
    const toast = showHooks();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imageUrl })
            })
            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast("error", error, "error")
        }
    }
    const fileRef = useRef(null);
    const { handleImageChange, imageUrl } = usePreviewImage();
    return (
        <form onSubmit={handleSubmit}>
            <Flex
                align={'center'}
                justify={'center'}
                my={20}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <FormLabel>User Avatar</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imageUrl || user.profilePic}>
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="userName" >
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => SetInputs({ ...inputs, username: e.target.value })}
                            value={inputs.username}
                        />
                    </FormControl>
                    <FormControl id="FullName" >
                        <FormLabel>FullName</FormLabel>
                        <Input
                            placeholder="John"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => SetInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                        />
                    </FormControl>
                    <FormControl id="Bio" >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="Your Bio"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => SetInputs({ ...inputs, bio: e.target.value })}
                            value={inputs.bio}
                        />
                    </FormControl>
                    <FormControl id="email" >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="john@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            onChange={(e) => SetInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.500',
                            }}
                            type='submit'>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}