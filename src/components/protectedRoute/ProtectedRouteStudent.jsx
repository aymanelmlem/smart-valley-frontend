import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteStudent({children}) {
    if(localStorage.getItem("tokenStudent") != null){
        return children
    }else{
        return <Navigate to="/student-login"/>
    }
}


