import { Link } from "react-router-dom"


export const Requests = ({requestObject, currentUser, heroes, getAllRequests}) => {
   

    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
          
        const filteredHeroes= heroes.find(hero => hero.id===requestObject.heroesId)
        const helpHero= heroes.find(hero => helpUserObject.id==hero.userId)
                
         

        const deleteButton = () => {
            if(!currentUser.hero) {
                return <button onClick={()=>{
                    console.log(requestObject.id)
                    console.log(requestObject)
                    fetch(`http://localhost:8088/requests/${requestObject.id}`, {
                        method:"DELETE"
                    })
                    .then(()=>{
                        getAllRequests()
                    })

                }} className="request__delete">Delete</button>
            }
            else {
                    return ""
            }

        }

        const claimButton = () => {
            if(currentUser.hero) {
                return <button onClick={()=>{
                    fetch(`http://localhost:8088/requests/${requestObject.id}`, {
                        method:"PUT",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                           userId:requestObject.userId ,
                           description:requestObject.description,
                           specificLocation:requestObject.specificLocation,
                           citiesId:requestObject.citiesId,
                           superVillianPresent: requestObject.superVillianPresent,
                           superVillianName:requestObject.superVillianName,
                           heroesId: helpHero.id,
                        
                           

                      })

                    })
                    .then(()=>{
                        getAllRequests()
                    })

                }} className="request__delete">Claim</button>
            }
            else {

            }

        }



    return <section className="request">
    <header>
        {
            currentUser.hero
                ?`Request number: ${requestObject.id}`
                :<Link to={`/requests/${requestObject.id}/edit`}>Request: {requestObject.id}</Link>
        }
        
    </header>
    <div>Description: {requestObject.description}</div>
    <div>Location: {requestObject.specificLocation}, {requestObject.cities.name} </div>
    <div>
        {
            requestObject.superVillianPresent
                ?<div>Supervillian Spotted: {requestObject?.superVillianName}</div>
                :null
        }

    </div>
    <div>
        {
            (requestObject.heroesId<9)
                ?<div>{filteredHeroes?.user?.name} is on their way</div>
                :"A superhero will be there soon"
        }

    </div>
    <footer>
        {
            deleteButton()
        }
         {
            (requestObject.heroesId<9)
            ?""
            :<div>{claimButton()}</div>
        }
    </footer>
    </section>

}