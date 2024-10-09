import { useNavigate } from "react-router"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Error 404: Page not found</h1>
            <button onClick={() => {
                navigate(-1)
            }}>Back</button>
        </div>
    )
}
