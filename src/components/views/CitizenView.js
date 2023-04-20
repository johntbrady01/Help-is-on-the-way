import { Outlet, Route, Routes } from "react-router-dom"
import { RequestForm } from "../requests/RequestForm"
import { RequestList } from "../requests/RequestList"
import { UpdateRequest } from "../requests/updateRequest"

export const CitizenViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Help Is On The Way</h1>
                    <div>Superhero Service</div>

                    <Outlet />
                </>
            }>

                <Route path="requests" element={<RequestList /> } />
                <Route path="requests/create" element={ <RequestForm /> } />
                <Route path="/requests/:requestId/edit" element={<UpdateRequest/>} />

            </Route>
        </Routes>
    )
}