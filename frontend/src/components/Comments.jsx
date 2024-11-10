import { Avatar, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Action from './Action'

const Comments = ({ comments, CommentTitle, CommentImg }) => {
    const [liked, setLiked] = useState(false)
    return (
        <>
            <Flex gap={4} py={2} my={2} w={'full'}>
                <Avatar src={CommentImg} size={'sm'} />
                <Flex gap={1} w={'full'} flexDirection={'column'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {CommentTitle}
                        </Text>
                        <Flex alignItems={'center'} gap={2}>
                            <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{comments}</Text>
                    <Action liked={liked} setLiked={setLiked} />
                    <Text fontSize={'sm'} color={'gray.light'}>
                        {200 + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default Comments