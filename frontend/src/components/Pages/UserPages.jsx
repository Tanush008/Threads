import React, { useEffect, useState } from 'react'
import UserHeader from '../UserHeader'
import UserPost from '../UserPost'
import { useParams } from 'react-router-dom';
import { showHooks } from '../hooks/showHooks';
const UserPages = () => {
    const [user, setUser] = useState({
        name: "",
        username: ""
    });
    const toast = showHooks();
    const { username } = useParams();

    useEffect(() => {
        const getPosts = async () => {
            if (!user) return;
            // setFetchingPosts(true);
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                // showToast("Error", error.message, "error");
                console.log(error);

                // setUser([]);
            }
        };
        getPosts();
    }, [username, toast])
    if (!user) {
        return null;
    }

    return (
        <>
            <UserHeader user={user}/>
            <UserPost likes={455} postImages={'public/post1.png'} postTitle={"This my first post"} replies={213} />
            <UserPost likes={332} postImages={'public/post2.png'} postTitle={"@ post"} replies={123} />
            <UserPost likes={443} postTitle={"Helloo"} replies={222} />
        </>
    )
}

export default UserPages