import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Action from './Action'

const UserPost = ({ likes, postImages, postTitle, replies }) => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Link to="/markzuckerbert/post/1">
                <Flex gap={4} mb={3} py={5}>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Avatar size={"md"} name='Mark Zuckerberg' src='public/zuck-avatar.png' />
                        <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                        <Box position={"relative"}>
                            <Avatar size={"xs"}
                                name='John doe'
                                position={"absolute"}
                                src='https://bit.ly/tioluwani-kolawole'
                                top={'0px'}
                                left={'4px'}
                                padding={'2px'} />
                            <Avatar size={"xs"}
                                name='John doe'
                                position={"absolute"}
                                src='https://bit.ly/kent-c-dodds'
                                bottom={'0px'}
                                right={'-5px'}
                                padding={'2px'} />
                            <Avatar size={"xs"}
                                name='John doe'
                                position={"absolute"}
                                src='https://bit.ly/prosper-baba'
                                bottom={'0px'}
                                left={'4px'}
                                padding={'2px'} />
                        </Box>
                    </Flex>
                    <Flex flexDirection={'column'} flex={1} gap={2}>
                        <Flex justifyContent={"space-between"} w={"full"}>
                            <Flex w={"full"} alignItems={"center"}>
                                <Text fontSize={'sm'} fontWeight={"bold"}>markzuckerberg</Text>
                                <Image src='public\verified.png' h={4} w={4} ml={1} />
                            </Flex>
                            <Flex gap={4} alignItems={'center'}>
                                <Text>1d</Text>
                                <BsThreeDots />
                            </Flex>
                        </Flex>
                        <Text>{postTitle}</Text>
                        {postImages && (

                            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                                <Image src={postImages} w={'full'} />
                            </Box>
                        )}
                        <Flex gap={3} my={1}>
                            <Action liked={liked} setLiked={setLiked} />
                        </Flex>
                        <Flex alignItems={'center'} gap={2}>
                            <Text fontSize={'sm'} color={'gray.light'}>{replies} replies</Text>
                            <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                            <Text color={'gray.ligt'} fontSize={'sm'}>{likes} likes</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </>
    )
}

export default UserPost