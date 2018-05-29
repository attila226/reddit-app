import React, { Component } from 'react';
import Post from './../Post/Post';

function PostList (props) {
    const listItems = props.data;

    return (
        <div>
            {listItems.map((post) => 
                <Post key={post.id} {...post}/>
            )}
        </div>
    );
};

export default PostList;