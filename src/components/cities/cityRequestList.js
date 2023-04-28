import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { CityRequests } from "./cityRequests"



export const CityRequestList = () => {
    const [requests, setRequests] = useState([])
    const [heroes, setHeroes] =useState([])
    const {cityId}=useParams()
    const [city, setCity] = useState([])



    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)


    const getAllRequests = () => {
        fetch(`http://localhost:8088/requests?citiesId=${cityId}`)
        .then(response => response.json())
        .then((requestArray) =>{
            setRequests(requestArray)
        })
    }

    useEffect(
        () => {
           
            getAllRequests()

                fetch(`http://localhost:8088/heroes?_expand=user`)
                .then(response => response.json())
                .then((heroArray) =>{
                    setHeroes(heroArray)
                })
        },
        [] 
    )
    useEffect(
        () => {
           

                fetch(`http://localhost:8088/cities?id=${cityId}`)
                .then(response => response.json())
                .then((data) =>{
                    const singleCity=data[0]
                    setCity(singleCity)
                })
        },
        [cityId] 
    )
  


    return <>

            <h2 className="requestsHeader">List of {city?.name}'s Requests</h2>
            <div className="containerContainer">
                <div className="container">
                    <article className="requests">
                    {   
                            requests.map(request=> <CityRequests  key={`request--${request.id}`}
                            heroes={heroes} 
                            currentUser={helpUserObject} 
                            requestObject={request}
                            getAllRequests={getAllRequests}/>)
                    }
                    
                </article>
            </div>
          </div>
</>

}