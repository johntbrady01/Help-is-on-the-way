import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/home"
import { RequestForm } from "../requests/RequestForm"
import { RequestList } from "../requests/RequestList"
import { UpdateRequest } from "../requests/updateRequest"

export const CitizenViews = () => {
	return (
        <Routes>
                 <Route path="home" element={<Home /> } />

                <Route path="requests" element={<RequestList /> } />
                <Route path="requests/create" element={ <RequestForm /> } />
                <Route path="/requests/:requestId/edit" element={<UpdateRequest/>} />

        </Routes>
    )
}