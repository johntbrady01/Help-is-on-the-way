import { Link, useNavigate } from "react-router-dom"


export const CityRequests = ({requestObject, currentUser, heroes, getAllRequests}) => {
   

    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
          
        const filteredHeroes= heroes.find(hero => hero.id===requestObject.heroesId)
        const helpHero= heroes.find(hero => helpUserObject.id==hero.userId)
        const navigate = useNavigate()
                
         

        const deleteButton = () => {
            if(!currentUser.hero) {
                return <button onClick={()=>{
                
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



    return<>
     <section className="request">
    <header className="rheader">
        {
            currentUser.hero
                ?`Request number: ${requestObject.id}`
                :<Link to={`/requests/${requestObject.id}/edit`}>Request: {requestObject.id}</Link>
        }
        
    </header>
    <div className="words">
    <div>Description: {requestObject?.description}</div>
    <div>Location: {requestObject?.specificLocation}, {requestObject?.cities?.name} </div>
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
                ?<div>
                <div className="nameContainer">
                    <div className="heroName"><Link  to={`/heroes/${filteredHeroes?.user?.id}`}className="heroesName"> {filteredHeroes?.user?.name}</Link></div>
                    is on their way 
                </div>
                    <div className="requestSymbolContainer"><img src={filteredHeroes?.symbol} className="requestSymbol"/></div>
                </div>
                :"A superhero will be there soon"
        }


    </div>
    </div>
    <footer className="footer">
        {
            <div className="button">{deleteButton()}</div>
        }
         {
            (requestObject.heroesId<9)
            ?""
            :<div className="button">{claimButton()}</div>
        }
    </footer>
    </section>

    </>

}