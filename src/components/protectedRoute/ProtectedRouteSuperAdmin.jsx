import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteSuperAdmin({children}) {
    const { employeeToken } = useSelector((state) => state.instructor);
    if(employeeToken){
        const data=jwtDecode(employeeToken);
        if( data?.role == "superAdmin"){
            return children;
        }else{
            return <Navigate to="/login-employee"/>
        }
    }else{
        return <Navigate to="/login-employee"/>
    }
}
