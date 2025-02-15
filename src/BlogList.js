const BlogList = ({ blogs, title, handleDelete }) => {
    console.log('Blogs:', blogs); 
  
    return (
      <div className="blog-list">
        <h2>{title}</h2>
        {blogs.map(blog => (
          <div className="blog-preview" key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p> 
            <button onClick={() => handleDelete(blog.id)} className="deleteButton">Delete</button>
          </div>
        ))}
      </div>
    );
  }
  
  export default BlogList;
  