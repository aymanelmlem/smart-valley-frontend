import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function InstructorWithOutPinCodeProtectedRoute({children}) {
    const { employeeToken } = useSelector((state) => state.instructor);
    if(employeeToken){
        const data = jwtDecode(employeeToken);
        if ((data?.role == "instructor" && data?.state == "underRevising")||(data?.role == "instructor" && data?.state == "accepted") ||(data?.role == "instructor" && data?.state == "notInQueue")||(data?.role == "instructor" && data?.state == "initiallyAccepted")||(data?.role == "instructor" && data?.state == "rejected") ) {
            return children;
        }else {
            return <Navigate to="/login-employee" />;
        }
    }else {
        return <Navigate to="/login-employee" />;
    }

    
}
