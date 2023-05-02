import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { CityRequests } from "./cityRequests"



export const CityRequestList = () => {
    const [filteredRequests, setFiltered] =useState([])
    const [heroes, setHeroes] =useState([])
    const [villianOnly, setVillianOnly] =useState(false)
    const {cityId}=useParams()
    const [city, setCity] = useState([])



    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)


    const getFilteredRequests = () => {
        let url = `http://localhost:8088/requests?citiesId=${cityId}`
       
         if(villianOnly){
           url += `&superVillianPresent=true`
        
        }
        
        fetch(`${url}`)
        .then(response => response.json())
        .then((requestArray) =>{
            setFiltered(requestArray)
        })

    }

    useEffect(
        () => {
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
            getFilteredRequests()
        },
        [villianOnly]

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
            <div className="buttonContainer">
                    {
                         (helpUserObject.hero&&villianOnly)
                         ?<>
                         <button onClick={()=>{setVillianOnly(false) }  }>Show All</button>
                         </>
                         :<>
                         </>
                    }
                    {
                         (helpUserObject.hero&&!villianOnly)
                         ?<>
                         <button onClick={()=>{setVillianOnly(true) }  }>Supervillian Present</button>
                         </>
                         :<>
                         </>
                    }
                    </div>
            <div className="containerContainer">
                <div className="cityRequestcontainer">
                    <article className="requests">
                    {   
                            filteredRequests.map(request=> <CityRequests  key={`request--${request.id}`}
                            heroes={heroes} 
                            currentUser={helpUserObject} 
                            requestObject={request}
                            getFiltered={getFilteredRequests}/>)
                    }
                    
                </article>
            </div>
          </div>
</>

}