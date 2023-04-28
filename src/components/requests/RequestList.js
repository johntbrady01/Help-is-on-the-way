import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Requests} from "./Requests"
import "./Requests.css"


export const RequestList = () => {
    const [requests, setRequests] = useState([])
    const [heroes, setHeroes] =useState([])
    const [villianOnly, setVillianOnly] =useState(false)
    const [myCity, setMyCity] =useState(false)
    const [filteredRequests, setFiltered] =useState([])
    const navigate = useNavigate()

 
    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
    const helpHero= heroes.find(hero => helpUserObject.id==hero.userId)


    const getAllRequests = () => {
        fetch(`http://localhost:8088/requests?_expand=cities`)
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
        ()=>{
            if(villianOnly){
                const superVillianPresent = requests.filter(request => request.superVillianPresent)
                setFiltered(superVillianPresent)
            }
            else{
                setFiltered(requests)
            }
        },
        [villianOnly]

)

useEffect(
    ()=>{
        if(myCity){
            const myCityOnly = requests.filter(request => request.citiesId===helpHero.citiesId)
            setFiltered(myCityOnly)
        }
        else{
            setFiltered(requests)
        }
    },
    [myCity]

)

useEffect(
    ()=>{
        if(myCity&&villianOnly){
            const myCityOnly = requests.filter(request => request.citiesId===helpHero.citiesId)
            const myCityOnlyAndVillian= myCityOnly.filter(request => request.superVillianPresent)
            setFiltered(myCityOnlyAndVillian)
        }
        else{
            setFiltered(requests)
        }
    },
    []

)



    useEffect(
        ()=>{
            if(helpUserObject.hero){
                setFiltered(requests)
            }
            else{
                const myRequests = requests.filter(request => request.userId===helpUserObject.id)
                setFiltered(myRequests)
            }
        },
        [requests]
    )

   

   



    return <>

            <h2 className="requestsHeader">List of Requests</h2>
                    <div className="buttonContainer">
                    {
                         helpUserObject.hero
                         ?<>
                         </>
                         :<>
                         <button onClick={() => navigate("/requests/create")} className="newRequest">New Request</button>
                         </>
                    }
                    </div>
                    <div className="buttonContainer">
                    {
                         (helpUserObject.hero&&(villianOnly||myCity))
                         ?<>
                         <button onClick={()=>{
                            setVillianOnly(false) 
                            setFiltered(requests)
                            setMyCity(false)
                        }  }>Show All</button>
                         </>
                         :<>
                         </>
                    }
                    {
                         (helpUserObject.hero&&!villianOnly&&!myCity)
                         ?<>
                         <button className="villianButton" onClick={()=>{setVillianOnly(true) }  }>Supervillian present</button>
                         </>
                         :<>
                         </>
                    }
                     {
                         (helpUserObject.hero&&!myCity&&!villianOnly)
                         ?<>
                         <button onClick={()=>{setMyCity(true) }  }>My citites requests</button>
                         </>
                         :<>
                         </>
                    }
                    </div>
            <div className="containerContainer">
                <div className="container">
                    <article className="requests">
                    {   
                            filteredRequests.map(request=> <Requests  key={`request--${request.id}`}
                            heroes={heroes} 
                            currentUser={helpUserObject} 
                            requestObject={request}
                            getAllRequests={getAllRequests}
                            filteredRequests={filteredRequests}/>)
                    }
                    
                </article>
            </div>
          </div>
</>

}

