import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(REACT_APP_API_URL + "/api/blog/" + id);
        setBlog(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchPost();
  }, [id]); // Include 'id' in the dependency array

  return (
    <>
      <Link className="blog-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">
              Published {new Date(blog.createdAt).toDateString()} by {blog.username}
            </p>
            <h1>{blog.title}</h1>
          </header>
          <img src={`${REACT_APP_API_URL}/uploads/${blog.photo}`} alt="cover" />
          <ul className="tags" id="list">
            {blog.categories.map((c) => (
              <p className="chip">{c}</p>
            ))}
          </ul>
          <p className="blog-desc">{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};



export default Blog;
