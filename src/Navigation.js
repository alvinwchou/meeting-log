import { FaUsers } from "react-icons/fa"
import { Link } from "react-router-dom"

function Navigation({ user }) {
    return (
        <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">
                    <FaUsers className="mr-1" /> Meeting Log
                </Link>

                <div className="navbar-nav ml-auto">
                    {user ?
                        <>
                            <Link className="nav-item nav-link" to="/meetings">
                                meetings
                            </Link>
                            <Link className="nav-item nav-link" to="/login">
                                log out
                            </Link>
                        </>
                    :
                        <>
                            <Link className="nav-item nav-link" to="/login">
                                log in
                            </Link>
                            <Link className="nav-item nav-link" to="/register">
                                register
                            </Link>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navigation