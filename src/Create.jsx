import { useState } from "react";

const Create = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] = useState('Michael');


    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {title,body,author};
        console.log(blog);
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
                onChange={(e)=> setTitle(e.target.value)}
                />

                <label>Blog Body:</label>
                <textarea placeholder="Enter blog content"
                required
                value={body}
                onChange={(e)=> setBody(e.target.value)}> </textarea>

                <label>Blog Author:</label>
                <select value={author}
                onChange={(e)=> setAuthor(e.target.value)}>
                    <option value="Emily">Emily</option>
                    <option value="Michael">Michael</option>
                    <option value="Sarah">Sarah</option>
                </select>

                <button className="AddBlog">Add Blog!</button>
            </form>
        </div>
     );
}
 
export default Create;