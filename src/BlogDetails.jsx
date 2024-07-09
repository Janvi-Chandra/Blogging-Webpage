import { useEffect, useRef, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

function BlogDetails() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

    const abortControllerRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}/posts`, {
                    signal: abortControllerRef.current?.signal,
                });
                const posts = await response.json();
                
                setPosts(posts);
                setFilteredPosts(posts);
            } catch (e) {
                if (e.name === "AbortError") {
                    console.log("Aborted");
                    return;
                }

                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        let filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

        if (sortOption === "name") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "date") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setFilteredPosts(filtered);
    }, [searchTerm, sortOption, posts]);

    const itemsPerPage = 10;
    const paginatedPosts = filteredPosts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    if (error) {
        return <div> Something went wrong! Please try again.</div>;
    }

    return (
        <div className="blog-details">
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
                <button onClick={() => setPage(page < Math.ceil(filteredPosts.length / itemsPerPage) - 1 ? page + 1 : page)} className="pagination-button">Next</button>
            </div>
            {isLoading && <div className="loading-message"><ClipLoader size={50} color={"#f1356d"} /></div>}
            {!isLoading && (
                <div className="blog-list">
                    {paginatedPosts.map((post) => (
                        <div className="blog-preview" key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <p className="author">User ID: {post.userId}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogDetails;
