import {Link} from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="navbar">
            <h1>Janvi's Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create"  id="createBlog">Create Blog + </Link>
            </div>
        </nav>
    );
}

export default Navbar;
