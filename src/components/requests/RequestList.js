import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Requests} from "./Requests"
import "./Requests.css"


export const RequestList = () => {
    const [heroes, setHeroes] =useState([])
    const [villianOnly, setVillianOnly] =useState(false)
    const [myCity, setMyCity] =useState(false)
    const [filteredRequests, setFiltered] =useState([])
    const navigate = useNavigate()

 
    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
    const helpHero= heroes.find(hero => helpUserObject.id==hero.userId)


  

    const getFilteredRequests = () => {
        let url = `http://localhost:8088/requests?_expand=cities`
        if(myCity){
            const myCityId=helpHero.citiesId
            url +=`&citiesId=${myCityId} `
        
        }
         if(villianOnly){
           url += `&superVillianPresent=true`
        }
        if(!helpUserObject.hero){
            url += `&userId=${helpUserObject.id}`
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
        [villianOnly, myCity]

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
                         <button onClick={()=>{setMyCity(true) }  }>My cities requests</button>
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
                          
                            getFiltered={getFilteredRequests}
                            filteredRequests={filteredRequests}/>)
                    }
                    
                </article>
            </div>
          </div>
</>

}

