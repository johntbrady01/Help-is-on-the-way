/*
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Employees.css"

export const HeroBios = () => {
    const {heroId}=useParams()
    const [hero, updateHero]=useState({})

    useEffect(
        () => {
           fetch(`http://localhost:8088/heroes?_expand=user&id=${heroId}`)
                .then(response => response.json())
                .then((data) =>{
                    const singleEmployee=data[0]
                    updateEmployee(singleEmployee)
                })
        },
        [employeeId] 
    )


    return <section className="employee">
    <header className="employee_header">{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
</section>
}
*/