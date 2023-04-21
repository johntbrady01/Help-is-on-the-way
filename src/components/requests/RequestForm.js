import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RequestForm = () => {

    const [request, update] = useState({
        description:"",
        specificLocation:"",
        heroesId:9,
        superVillianPresent:false,
        superVillianName:"",
        citiesId:1
    })
    const [cities, setCities] = useState([])

    useEffect(
        () => {
          
           fetch(`http://localhost:8088/cities`)
           .then(response => response.json())
           .then((citiesArray) =>{
                setCities(citiesArray)
            })
           
        },
        [] 
    )



    const navigate=useNavigate()

    const localHelpUser = localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const requestToSendToApi ={
            userId:helpUserObject.id,
            description:request.description,
            specificLocation:request.specificLocation,
            citiesId:request.citiesId,
            superVillianPresent:request.superVillianPresent,
            superVillianName:request.superVillianName,
            heroesId:request.heroesId
           }

           return fetch(`http://localhost:8088/requests`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(requestToSendToApi)

                })
                .then(response => response.json())
                .then(() => {
                        navigate("/requests")
                }) 
}
return (
    <form className="requestForm">
        <h2 className="requestForm__title">New Request</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Brief description of problem"
                    value={request.description}
                    onChange={
                        (evt)=>{
                            const copy = {...request}
                            copy.description=evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="specificLocation">Specific Location:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Specific location of problem"
                    value={request.specificLocation}
                    onChange={
                        (evt)=>{
                            const copy = {...request}
                            copy.specificLocation=evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="city">City:</label>
                <select
                 onChange={
                    (evt)=>{
                        const copy = {...request}
                        copy.citiesId=parseInt(evt.target.value)
                        update(copy)
                    }}>
                {cities.map((city)=>{
                return <option 
                key={city.id}
                value={parseInt(city.id)}
                >{city.name}
                    </option>

               })}
               </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">There is a supervillian present:</label>
                <input type="checkbox"
                    value={request.superVillianPresent}
                    onChange={
                        (evt)=>{
                            const copy = {...request}
                            copy.superVillianPresent=evt.target.checked
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            {
                  request.superVillianPresent
            ?<div className="form-group">
                <label htmlFor="description">Supervillian spotted:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="What supervillian was spotted"
                    value={request.superVillianName}
                    onChange={
                        (evt)=>{
                            const copy = {...request}
                            copy.superVillianName=evt.target.value
                            update(copy)
                        }
                    } />
            </div>
            :""
              }
        </fieldset>
        <button 
            onClick={(clickEvent)=>{handleSaveButtonClick(clickEvent)}  }
        
        className="btn btn-primary">
            Submit Request
        </button>
    </form>

    )
    }
