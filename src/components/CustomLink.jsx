import {NavLink} from "react-router-dom";

export default function CustomLink({children, to, ...props}) {
    return (
        <NavLink to={to}
            className={({isActive}) =>
                isActive ? "underline" : ""
            }
            {...props}
        >
            {children}
        </NavLink>
    )
}