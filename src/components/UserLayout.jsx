import {NavLink, Outlet} from 'react-router-dom'
import CustomLink from "./CustomLink.jsx";

export default function UserLayout() {
    return (
        <>
            <header className="my-3">
                <nav>
                    <ul className="flex justify-between items-center">
                        <li className="text-2xl font-bold"><NavLink end to="/admin">
                            <svg width="54" height="35" viewBox="0 0 54 35" fill="none" className="size-10"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.82179 35L6.61724 0.0909081H15.0547L12.6172 14.8523H13.0775L27.0547 0.0909081H36.9922L22.0775 15.6705L31.4184 35H21.3275L14.9866 21.2784L10.8275 25.5909L9.25929 35H0.82179Z"
                                    fill="black"/>
                                <path
                                    d="M23.4651 29.2045L24.5561 22.625L42.6072 0.0909081H48.4538L46.9708 9.02273H43.5788L33.0106 22.2841L32.9424 22.5568H53.6697L52.5617 29.2045H23.4651ZM39.3686 35L40.6811 27.1932L41.3288 24.3125L45.3345 0.0909081H53.2265L47.4311 35H39.3686Z"
                                    fill="black"/>
                                <path
                                    d="M23.4651 29.2045L24.5561 22.625L42.6072 0.0909081H48.4538L46.9708 9.02273H43.5788L33.0106 22.2841L32.9424 22.5568H53.6697L52.5617 29.2045H23.4651ZM39.3686 35L40.6811 27.1932L41.3288 24.3125L45.3345 0.0909081H53.2265L47.4311 35H39.3686Z"
                                    fill="#FFC40C"/>
                            </svg>
                        </NavLink></li>
                        <div className="lg:flex space-x-5 shrink-0 font-bold hidden">
                            <CustomLink to="/">Home</CustomLink>
                            <CustomLink to="about">About</CustomLink>
                            <CustomLink to="profile">Profile</CustomLink>
                            <CustomLink to="admin">Admin</CustomLink>
                            <CustomLink to="login">Login</CustomLink>
                        </div>
                        <div className="lg:flex bg-white py-1 px-3 rounded-3xl space-x-5 hidden">
                            <li>
                                <svg width="32" height="25" viewBox="0 0 32 25" fill="none" className="size-5"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H28C30.2091 0.5 32 2.29086 32 4.5V20.5C32 22.7091 30.2091 24.5 28 24.5H4C1.79086 24.5 0 22.7091 0 20.5V4.5ZM4 2.5C2.89543 2.5 2 3.39543 2 4.5V4.93381L16 13.3338L30 4.93381V4.5C30 3.39543 29.1046 2.5 28 2.5H4ZM30 7.26619L20.5838 12.9159L30 18.7104V7.26619ZM29.9325 21.0172L18.6517 14.0752L16 15.6662L13.3483 14.0752L2.06753 21.0172C2.29549 21.8711 3.0743 22.5 4 22.5H28C28.9257 22.5 29.7045 21.8711 29.9325 21.0172ZM2 18.7104L11.4162 12.9159L2 7.26619V18.7104Z"
                                        fill="#FFC40C"/>
                                </svg>
                            </li>
                            <li><NavLink end to="profile">
                                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" className="size-5"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.5 17C21.0563 17 24.75 13.3063 24.75 8.75C24.75 4.19365 21.0563 0.5 16.5 0.5C11.9437 0.5 8.25 4.19365 8.25 8.75C8.25 13.3063 11.9437 17 16.5 17ZM22 8.75C22 11.7876 19.5376 14.25 16.5 14.25C13.4624 14.25 11 11.7876 11 8.75C11 5.71243 13.4624 3.25 16.5 3.25C19.5376 3.25 22 5.71243 22 8.75Z"
                                        fill="#FFC40C"/>
                                    <path
                                        d="M33 30.75C33 33.5 30.25 33.5 30.25 33.5H2.75C2.75 33.5 0 33.5 0 30.75C0 28 2.75 19.75 16.5 19.75C30.25 19.75 33 28 33 30.75ZM30.2499 30.7404C30.246 30.0618 29.8271 28.0287 27.9617 26.1633C26.168 24.3696 22.795 22.5 16.5 22.5C10.2049 22.5 6.83197 24.3696 5.03827 26.1633C3.17283 28.0287 2.75392 30.0618 2.75 30.7404H30.2499Z"
                                        fill="#FFC40C"/>
                                </svg>
                            </NavLink></li>
                        </div>
                        <li className="lg:hidden block"><NavLink end to="profile">Menu</NavLink></li>
                    </ul>
                </nav>
            </header>

            <div className="flex flex-col items-center justify-center">
                <Outlet/>
            </div>
        </>
)
}
