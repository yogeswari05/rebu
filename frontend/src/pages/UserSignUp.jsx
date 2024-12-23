import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignUp = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   
   const navigate = useNavigate();
   
   const [user, setUser] = React.useContext(UserDataContext);

   const submitHandler = async (e) => {
      e.preventDefault();
      const newUser = {
         fullname: {
            firstname: firstName,
            lastname: lastName
         },
         email: email,
         password: password
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);
      if (response.status === 201) {
         const data = response.data;
         setUser(data.user);
         localStorage.setItem('token', JSON.stringify(data.token));
         navigate('/home');
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
   }

   return (
      <div className='p-7 h-screen flex flex-col justify-between '>
         <div>
            <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png' alt='Uber Logo'></img>
            <form onSubmit={(e) => {
               submitHandler(e)
            }}>
               <h3 className="text-lg mb-2">What's your name</h3>
               <div className="flex gap-4 mb-7">
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm' placeholder='Firstname' type='text' />
                  <input value={lastName}  onChange={(e) => setLastName(e.target.value)} required className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm' placeholder='Lastname' type='text' />
               </div>
               <h3 className="text-lg mb-2">What's your email</h3>
               <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' placeholder='email@gmail.com' type='email' />
               <h3 className="text-lg mb-2">What's your password</h3>
               <input value={password} onChange={(e) => setPassword(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' placeholder='password' type='password' />
               <button className='flex items-center justify-center bg-black text-white w-full py-2 rounded'>Create Account</button>
            </form>
            <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Log in here</Link></p>
         </div>
         <div>
            <p className='text-xs leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS
               messages, including by automated means, from Uber and
               its affiliates to the number provided.
            </p>
         </div>
      </div>
   )
}

export default UserSignUp