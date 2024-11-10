import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
const UserHeader = () => {
    const toast = useToast()
    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({
                title: 'Account created.',
                description: "URL copied.",
                status: 'success',
                duration: 300,
                isClosable: true,
            })
        })
    }
    return (
        <VStack alignItems={"start"} gap={4}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Mark-Zuckerberg</Text>
                    <Flex alignItems={"center"} gap={3}>
                        <Text fontSize={"sm"}>markzuckerberg</Text>
                        <Text fontSize={"xs"} bg={'gray.dark'} color={"gray.light"} p={1} borderRadius={"full"}>threads.next</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Mark Zuckerbert"
                        src="public/zuck-avatar.png"
                        size={{
                            base:'md',
                            md: 'xl'
                        }} />
                </Box>
            </Flex>

            <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2K followers</Text>
                    <Box w={1} h={1} bg={'gray.light'} borderRadius={"full"} ></Box>
                    <Link color={'gray.light'}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                        <Menu>
                            <MenuButton>
                                <Box className='icon-container_2'>
                                    <CgMoreO size={24} cursor={"pointer"} />
                                </Box>
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid white"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack >
    )
}

export default UserHeader