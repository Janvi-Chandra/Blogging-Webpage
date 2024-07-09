import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const BlogList = ({ blogs, title, handleDelete }) => {
    return (
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p className="author">~ {blog.author}</p>
                    </Link>
                    <button className="deleteButton" onClick={() => handleDelete(blog.id)}>Delete Blog</button>
                </div>
            ))}
        </div>
    );
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired
};

BlogList.defaultProps = {
    blogs: []
};

export default BlogList;
