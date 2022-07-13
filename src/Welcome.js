import { Link } from "react-router-dom"


function Welcome({ userName, logoutUser }) {
    return (
        <div className="text-center mt-4">
            <span className="text-secondary font-weight-bold pl1">
                Welcome {userName}
            </span>, {' '}
            <Link to="/login" className="text-primary font-weight-bold pl1" onClick={e => logoutUser(e)}>
                log out
            </Link>
        </div>
    )
}

export default Welcome