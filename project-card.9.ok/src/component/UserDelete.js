import React from 'react';
import { useLocation, Link } from "react-router-dom"; // 추가된 부분
import { useEffect, useState } from "react";
import axios from "axios";

function UserDelete() {

    const location = useLocation();
    
    const EDU_CODE = location.state?.EDU_CODE;
    
    return(
            {EDU_CODE}
    )
}

export default UserDelete