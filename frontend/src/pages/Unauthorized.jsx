import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import unauthorizedLogo from '../assets/unauthorized.jpg';
import { Link } from 'react-router';

const Unauthorized = () => {
    return (
        <>
            <div className='p-6 m-auto text-center' style={{margin: "auto", backgroundColor: "#e66969ff", fontFamily: "JosefinSans", height: "100vh"}}>
                <h1 className='font-bold text-3xl'>Unauthorized Access</h1>
                {/* mt-20 ml-20 */}
                <p className='lead'>You do not have permission to view this page.</p>

                <div className='p-6'>
                    <img src={unauthorizedLogo} alt="Unauthorized" className="img-fluid p-6 m-auto w-50" style={{marginBottom: "20px", margin: "auto", borderRadius: "50px"}} />
                </div>

                <div className='p-6'>
                    <Link to={'/login'} className='btn text-white p-3 hover:bg-blue-300 rounded' style={{backgroundColor: "#78b7dbff"}}>Return to Login</Link>
                </div>
            </div>
        </>
    )
}

export default Unauthorized;