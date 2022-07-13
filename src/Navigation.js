import { FaUsers } from "react-icons/fa"

function Navigation({ user }) {
    return (
        <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">
                    <FaUsers className="mr-1" /> Meeting Log
                </a>

                <div className="navbar-nav ml-auto">
                    {user ?
                        <>
                            <a className="nav-item nav-link" href="/meetings">
                                meetings
                            </a>
                            <a className="nav-item nav-link" href="/login">
                                log out
                            </a>
                    </>
                    :
                        <>
                            <a className="nav-item nav-link" href="/login">
                                log in
                            </a>
                            <a className="nav-item nav-link" href="/register">
                                register
                            </a>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navigation