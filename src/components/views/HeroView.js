import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/home"
import { RequestList } from "../requests/RequestList"


export const HeroViews = () => {
	return (
        <Routes>
                    <Route path="home" element={<Home /> } />

                <Route path="requests" element={<RequestList /> } />

        </Routes>
    )
}