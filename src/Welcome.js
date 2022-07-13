

function Welcome({ user }) {
    return (
        <div className="text-center mt-4">
            <span className="text-secondary font-weight-bold pl1">
                Welcome {user}
            </span>, {' '}
            <a href="/" className="text-primary font-weight-bold pl1">
                log out
            </a>
        </div>
    )
}

export default Welcome