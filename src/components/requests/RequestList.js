import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Requests} from "./Requests"
import "./Requests.css"


export const RequestList = () => {
    const [requests, setRequests] = useState([])
    const [heroes, setHeroes] =useState([])
    const [filteredRequests, setFiltered] =useState([])
    const navigate = useNavigate()

    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)


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
    {
        helpUserObject.hero
        ?<>
        </>
        :<>
        <button onClick={() => navigate("/requests/create")}>New Request</button>

        </>
        
    }




            <h2>List of Requests</h2>
            <article className="requests">
            {   
                    filteredRequests.map(request=> <Requests  key={`request--${request.id}`}
                    heroes={heroes} 
                    currentUser={helpUserObject} 
                    requestObject={request}
                    getAllRequests={getAllRequests}/>)
            }
            
        
          </article>
</>

}

