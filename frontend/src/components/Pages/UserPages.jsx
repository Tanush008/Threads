import React from 'react'
import UserHeader from '../UserHeader'
import UserPost from '../UserPost'
const UserPages = () => {
    return (
        <>
            <UserHeader />
            <UserPost likes={455} postImages={'public/post1.png'} postTitle={"This my first post"} replies={213} />
            <UserPost likes={332} postImages={'public/post2.png'} postTitle={"@ post"} replies={123} />
            <UserPost likes={443}  postTitle={"Helloo"} replies={222} />
        </>
    )
}

export default UserPages