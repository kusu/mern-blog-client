import React, { useState, useEffect } from "react";
import axios from "axios";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList";
import Header from "../../components/Home/Header";
import SearchBar from "../../components/Home/SearchBar";
import "./styles.css";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get(REACT_APP_API_URL + "/api/blog");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.categories.some((category) =>
        category.toLowerCase().includes(searchKey.toLowerCase().trim())
      )
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    fetchPosts(); // Retrieve all blogs again
    setSearchKey("");
  };

  return (
    <div className="wrapper">
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? (
        <EmptyList />
      ) : (
        <BlogList blogs={blogs} key={blogs._id} />
      )}
    </div>
  );
};

export default Home;
