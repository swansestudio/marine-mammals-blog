import PostSummary from "../components/PostSummary";
import { baseUrl } from "../config";

import '../styles/home.css'



export default function App(props) {

  const { posts, loadPosts } = props;

  const deletePost = async (id) => {
    await fetch(`${baseUrl}/posts/${id}`, {
      method: "DELETE",
    });
    loadPosts();
  };


  return (
    <div className='home'>
      {posts && posts.length === 0
        ? <div className="no-posts"><h4>There's No Posts Yet</h4></div>
        : (<div className="all-posts">
          <h4>All Posts:</h4>
          {posts.map(post => <PostSummary {...post} deletePost={deletePost} key={post._id} />)}
        </div>)
      }
      <div className='footer'>
        <p>©2023 Swansestudio</p>
        <p>
          This project uses the MongoDB logo, which is copyright ©MongoDB, Inc. All rights reserved. <br/>
          <a href="https://www.mongodb.com/">Learn more about MongoDB</a>.
        </p>
      </div>
    </div>
  )
}
