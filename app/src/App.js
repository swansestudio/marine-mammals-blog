import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { baseUrl } from "./config";
import mockData from "./assets/posts.json";

import Layout from "./components/Layout";

import Home from "./components/Home";
import Post from "./components/Post";
import Create from "./components/Create";

// console.log(mockData)

function App() {
  let [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    let results = await fetch(`${baseUrl}/posts`).then((resp) => resp.json());
    setPosts(results);
    console.log("Load POST");
  };

  const fillInDB = async () => {
    await fetch(`${baseUrl}/posts/fill`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mockData.posts),
    });
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout fillInDB={fillInDB} />}>
            <Route
              path="/"
              element={<Home posts={posts} loadPosts={loadPosts} />}
            />
            <Route path="/create" element={<Create loadPosts={loadPosts} />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
