import BlogList from './BlogList';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import useFetch from './useFetch';

const Home = () => {
    const { blogs, loading, setBlogs } = useFetch();

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    };

    return (
        <div className="home">
            {loading ? (
                <div className="loading-message">
                    <ClipLoader size={50} color={"#f1356d"} />
                </div>
            ) : (
                <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
            )}
        </div>
    );
};

export default Home;
