import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BiError } from "react-icons/bi";
import LoginWithGoogle from '../ShareableComponents/LoginWithGoogle';
import { AuthContext } from '../AuthConfigrationLayout/AuthConfigration';
import Swal from 'sweetalert2';
import PageTitle from '../PageTitle';

const LoginPage = () => {
    const [error, setError] = useState(null);
    const {handleloginuser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const loginuser = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        handleloginuser(email,password).then(res=>{
            form.reset();
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Successfully Login user!',
              })
              navigate(from);
        }).catch(error=>{
            setError(error.message);
        })
    };

    return (
        <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center'>
            <PageTitle>Login</PageTitle>
            <img className='w-3/5 mx-auto' src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1030,h_896/https://lisstech.com/wp-content/uploads/2020/07/Contact-1030x896.png" alt="" />
            <div className='p-5 w-4/5 mx-auto md:ml-0'>
                <form onSubmit={loginuser}>
                    <h1 className='text-3xl font-bold mb-7'>Login Account</h1>
                    <div className='font-para'>
                        <label className='font-semibold text-main text-opacity-90' htmlFor="email">Email Address</label>
                        <input className='block w-full border-b border-main border-opacity-25 px-3 py-2 outline-none text-secound text-sm' placeholder='Enter Email Address' type="email" name="email" id="email" />
                    </div>
                    <div className='font-para my-3'>
                        <label className='font-semibold text-main text-opacity-90' htmlFor="email">Password</label>
                        <input className='block w-full border-b border-main border-opacity-25 px-3 py-2 outline-none text-secound text-sm' placeholder='Password' type="password" name="password" id="pass" />
                    </div>

                    {
                        error && <span className='text-sm text-button flex gap-2 items-center'><BiError/>{error}</span>
                    }

                    <input className='px-5 py-2 font-bold text-white bg-button rounded-md shadow-sm hover:bg-buttonhover block mt-5' type="submit" value="Login" />

                    <h1 className='mt-5 text-sm'>I don't have an account! <NavLink to="/registration"><button className='font-bold text-main underline'>Create Account</button></NavLink></h1>

                </form>

                <LoginWithGoogle/>

            </div>
        </div>
    );
};

export default LoginPage;