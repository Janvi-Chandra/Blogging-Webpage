import { useState, useEffect, useRef } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import BlogList from './BlogList';
import "./App.css";

const Home = ({ blogs, loading, setBlogs }) => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    let filtered = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (sortOption === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "date") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, sortOption, blogs]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };

  const itemsPerPage = 10;
  const paginatedBlogs = filteredBlogs.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="home">
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select onChange={(e) => setSortOption(e.target.value)} className="sort-dropdown">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page > 0 ? page - 1 : 0)} className="pagination-button">Previous</button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page < Math.ceil(filteredBlogs.length / itemsPerPage) - 1 ? page + 1 : page)} className="pagination-button">Next</button>
      </div>
      {loading ? (
        <div className="loading-message">
          <ClipLoader size={50} color={"#f1356d"} />
        </div>
      ) : (
        <BlogList blogs={paginatedBlogs} title="All Blogs" handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
