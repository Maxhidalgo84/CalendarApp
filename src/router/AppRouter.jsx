import {  Route, Routes } from "react-router-dom"
import React from 'react'
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";


export const AppRouter = () => {

    const authStatus = 'not-authenticated';

  return (

    <Routes>
        {/* {
        TODO: {

        (authStatus === 'not-authenticated')
        
        } } */}

        <Route path="/auth/*" element={<LoginPage />} />
        <Route path="/*" element={<CalendarPage/>} />

      


    </Routes>

  )
}
