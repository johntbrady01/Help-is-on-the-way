import { Outlet, Route, Routes } from "react-router-dom"
import { HeroesList } from "../heroes/heroesList"
import { RequestList } from "../requests/RequestList"


export const HeroViews = () => {
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
                <Route path="heroes" element={<HeroesList /> } />

            </Route>
        </Routes>
    )
}