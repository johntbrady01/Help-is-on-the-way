import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        isHero: false,
        isAdmin: false,
    })
    const [citizen, setCitizen] = useState({
        address: "",
        phoneNumber: "",
        userId:""
    })

     const [userId, setUserId] = useState()

   

    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    setUserId(createdUser.id)
                    localStorage.setItem("help_user", JSON.stringify({
                        id: createdUser.id,
                        hero: createdUser.isHero,
                        admin: createdUser.isAdmin,
                    
                        
                    }))
                    
                }
            })
            
            .then(()=>{ 
                fetch("http://localhost:8088/citizens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(citizen)
            })
                .then(res => res.json())
                .then(createdCitizen => {
                    if (createdCitizen.hasOwnProperty("id")) {
                         JSON.stringify({
                            id: createdCitizen.id,
                            address: createdCitizen.address,
                            phoneNumber: createdCitizen.phoneNumber,
                            userId:userId
                        
    
                        })
                    }
                    navigate("/")
                })})
               
                
            
    }

    const handleRegister = (e) => {

       
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    const updateCitizen = (evt) => {
        const copy = {...citizen}
        copy[evt.target.id] = evt.target.value
        setCitizen(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Help Is On The Way</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input onChange={updateCitizen}
                        type="address" id="address" className="form-control"
                        placeholder="Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateCitizen}
                        type="phoneNumber" id="phoneNumber" className="form-control"
                        placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

