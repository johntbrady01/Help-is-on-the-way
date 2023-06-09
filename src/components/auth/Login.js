import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import blue from "../photos/blue.png"

export const Login = () => {
    const [email, set] = useState("batbruce@wayne.enterprises.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("help_user", JSON.stringify({
                        id: user.id,
                        hero: user.isHero,
                        admin: user.isAdmin
                    }))

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return <article className="addMargin">
        <main className="container--login">
             <img src ={blue} className="logoBlue" />
             <div>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="login-container">
                    <h1>Help Is On The Way</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    </div>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </div>
        </main>
        </article>
}

