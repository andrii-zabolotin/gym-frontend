import {NavLink, Outlet} from 'react-router-dom'

export default function StaffLayout() {

    return (
        <>
            <header>
                <h2>K4 Club Admin</h2>
                <nav>
                    <ul style={{listStyle: "none"}}>
                        <li><NavLink end to="/admin">Home</NavLink></li>
                        <li><NavLink end to="attendances">Відвідування</NavLink></li>
                        <li><NavLink end to="users">Користувачі</NavLink></li>
                        <li><NavLink end to="trainings">Тренування</NavLink></li>
                        <li><NavLink end to="subscriptions">Підписки</NavLink></li>
                        <li><NavLink end to="permission-groups">Групи дозволів</NavLink></li>
                        <li><NavLink end to="profile">Profile</NavLink></li>
                    </ul>
                </nav>
            </header>

            <Outlet/>

        </>
    )
}
