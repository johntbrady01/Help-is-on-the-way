import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import white from "../photos/white.png"

export const HeroNav = () => {
    const navigate = useNavigate()

    return <>
            <img src ={white} className="logoWhite" />
        <ul className="navbar">
             
              <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/requests">Requests</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/heroes">Heroes</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cities">Cities</Link>
            </li>
            {
                localStorage.getItem("help_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("help_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    </>
}