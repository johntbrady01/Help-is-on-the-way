import { Link } from "react-router-dom"


export const Requests = ({requestObject, currentUser, heroes}) => {
   

 
          
        const filteredHeroes= heroes.find(hero => hero.id===requestObject.heroesId)
                
            
        console.log(filteredHeroes)



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
            requestObject.heroesId
                ?<div>{filteredHeroes?.user?.name} is on their way</div>
                :"A superhero will be there soon"
        }

    </div>
    </section>

}