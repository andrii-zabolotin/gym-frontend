import {Link, Outlet} from 'react-router-dom'

export default function UserLayout() {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Link to="about">About</Link>
                <Link to="profile">Profile</Link>
                <Link to="admin">Admin</Link>
            </header>

            <Outlet/>

        </>
    )
}
