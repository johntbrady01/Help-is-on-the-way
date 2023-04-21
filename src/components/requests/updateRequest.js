import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const UpdateRequest= () => {
    const {requestId}=useParams()

    const [request, updateRequest]= useState({
        description:"",
        userId:0,
    })

    const [feedback, setFeedback] = useState("")

    const navigate=useNavigate()

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(()=>{
        fetch(`http://localhost:8088/requests?id=${requestId}`)
            .then(response=>response.json())
            .then((data)=>{
                const requestObject=data[0]
                updateRequest(requestObject)
            })


    },  [])

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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

      

            return fetch(`http://localhost:8088/requests/${request.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
    })


            .then(response=>response.json())
            .then(()=>{
                
            })
            .then(() => {
                setFeedback("Request successfully saved")
            })
            .then(() => {
                navigate("/requests")
            })
    
    }
    return <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
        <form className="request">
            <h2 className="request__title">Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={request.description}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.description=evt.target.value
                                updateRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specific Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={request.specificLocation}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.specificLocation=evt.target.value
                                updateRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="city">City:</label>
                <select
                value={request.citiesId}
                 onChange={
                    (evt)=>{
                        const copy = {...request}
                        copy.citiesId=parseInt(evt.target.value)
                        updateRequest(copy)
                    }}>
                {cities.map((city)=>{
                return  <option 
                key={city.id}
                value={parseInt(city.id)}
                >{city.name}
                    </option>
               }
               )}
               </select>
            </div>
        </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">There a supervillian present:</label>
                    <input type="checkbox"
                        className="form-control"
                        value={request.superVillianPresent}
                        checked={request.superVillianPresent}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...request}
                                copy.superVillianPresent=evt.target.checked
                                updateRequest(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                    {
                         request.superVillianPresent
                      ?<div className="form-group">
                    <label htmlFor="superVillianName">Supervillian spotted:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={request.superVillianName}
                        onChange={
                            (evt) => {
                                const copy = {...request}
                                copy.superVillianName=evt.target.value
                                updateRequest(copy)
                            }
                        } />
                </div>
                 :""
                     }
            </fieldset>
            <button
                onClick={(clickEvent)=> handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Request
            </button>
        </form>
    </>


}
