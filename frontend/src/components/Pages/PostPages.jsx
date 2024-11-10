import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Action from '../Action'
import Comments from '../Comments'

const PostPages = () => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={"center"} gap={3}>
                    <Avatar src='\zuck-avatar.png' size={'md'} name='Mark Zuckerberg' />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            Mark Zuckerberg
                        </Text>
                        <Image src='\verified.png' w='4' h={4} ml={4} />
                    </Flex>
                    <Flex gap={4} alignItems={'center'}>
                        <Text fontSize={'sm'} color={'gray.light'}>
                            1d
                        </Text>
                    </Flex>
                    <BsThreeDots />
                </Flex>
            </Flex>
            <Text my={3}>Let talk's about threads</Text>
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                <Image src='/post1.png' w={'full'} />
            </Box>

            <Flex my={3} gap={3}>
                <Action liked={liked} setLiked={setLiked} />
            </Flex>

            <Flex alignItems={"center"} gap={2}>
                <Text color={'gray.light'} fontSize={'sm'}>
                    253 replies
                </Text>
                <Box w={0.5} borderRadius={'full'} bg={'gray.light'}>   </Box>
                <Text>
                    {200 + (liked ? 1 : 0)} likes
                </Text>
            </Flex>
            <Divider my={4} />
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>😎😋</Text>
                    <Text color={'gray.light'}>Get the app to the Like,replies</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4} />
            <Comments comments={'Hey this look great'} CommentTitle={"Mark"} CommentImg={'https://bit.ly/dan-abramov'} />
            <Comments comments={'Very Goodd'} CommentTitle={'John'} CommentImg={'https://bit.ly/sage-adebayo'} />
            <Comments comments={'Guddo'} CommentTitle={'Bob'} CommentImg={'https://bit.ly/ryan-florence'} />
            <Comments comments={'Byeeee'} CommentTitle={'Hoee'} CommentImg={'https://bit.ly/code-beast'} />
        </>
    )
}

export default PostPages