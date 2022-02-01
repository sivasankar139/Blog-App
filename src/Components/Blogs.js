import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import '../Styling/blogs.css'
const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog__url = `https://gnews.io/api/v4/search?q=${searchInput}&token=94a0ae50772bb1352498b4f255170163`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(blog__url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);
  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles == 0 && (
            <h1 className="no__blogs">No blogs avalible. Search something else to read the blogs</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
