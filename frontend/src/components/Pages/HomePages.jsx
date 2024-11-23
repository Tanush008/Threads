import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePages = () => {
    return (
        <>
            <Link to={"/markzuckerberg"}>
                <Flex w={'full'} justifyContent={'center'}>
                    <Button mx={'auto'}>
                        Visit Profile Page
                    </Button></Flex>
            </Link>
        </>
    )
}

export default HomePages