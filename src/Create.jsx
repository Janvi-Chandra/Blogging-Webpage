import { useState } from "react";

const Create = ({ onAddBlog }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Your Name');

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author, id: Date.now(), date: new Date().toISOString() };
        onAddBlog(blog);
        setTitle('');
        setBody('');
        setAuthor('Your Name');
    }

    return ( 
        <div className="create">
            <h2>Wanna create something together?</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type="text" placeholder="Enter title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea placeholder="Enter blog content"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}> 
                </textarea>
                <label>Blog Author:</label>
                <input
                    type="text" placeholder="Enter author's name"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button className="AddBlog">Add Blog!</button>
            </form>
        </div>
    );
}

export default Create;
