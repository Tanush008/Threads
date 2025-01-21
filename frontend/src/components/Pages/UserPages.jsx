import React, { useEffect, useState } from 'react'
import UserHeader from '../UserHeader'
import UserPost from '../UserPost'
import { useParams } from 'react-router-dom';
import { showHooks } from '../hooks/showHooks';
const UserPages = () => {
    const [user, setUser] = useState(null);
    const toast = showHooks();
    const { username } = useParams();
    useEffect(() => {   
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                // console.log(res);
                // console.log(username);
                const data = await res.json();
                console.log(data.name);
                if (data.error) {
                    toast('Error', data.error, 'error')
                    return;
                }
                setUser(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [username, toast])
    if (!user) {
        return null;
    }

    
    return (
        <>
            <UserHeader user={user} />
            <UserPost likes={455} postImages={'public/post1.png'} postTitle={"This my first post"} replies={213} />
            <UserPost likes={332} postImages={'public/post2.png'} postTitle={"@ post"} replies={123} />
            <UserPost likes={443} postTitle={"Helloo"} replies={222} />
        </>
    )
}

export default UserPages