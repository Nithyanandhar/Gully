import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/userSlice'

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signup , setSignup] = useState(false);

    useEffect(()=>{
        reset()
    },[signup])

    const loginSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters")
    })

    const signupSchema = z.object({
        username: z.string().min(4, "Username must be at least 4 characters"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters")
    })


    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signup ? signupSchema : loginSchema)
    })

    const onSubmit =async (data) => {
        try{
            console.log(data);
            const response = await axios.post(
                `http://localhost:8080/auth/${signup ? "signup" : "login"}`,
                data,
                {withCredentials: true}
            );
            console.log(response.data.user)
            dispatch(setUser(response.data.user));
            if(response.status===200 || response.status===201)navigate("/");

        }
        catch(error){
            if(error.response?.status ===409 ){
                setError("email",{
                    type : "serveer",
                    message : error.response.data.message
                })
        
            }
            if(error.response?.status ===400 ){
                setError("email",{
                    type : "serveer",
                    message : error.response.data.message
                })
            }
            else{

                console.log(error);
            }
        }
    }


  return (
  
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
                >
                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-bold text-white">
                            {signup ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-slate-400 text-sm mt-2">
                            {signup
                                ? "Create your account to get started"
                                : "Login to continue to your account"}
                        </p>
                    </div>

                    {
                        signup &&
                        <>
                            <label className="text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                {...register("username")}
                            />
                            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
                        </>
                    }

                    <label className="text-sm font-medium text-slate-300">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                        {...register("email")}
                    />

                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

                    <label className="text-sm font-medium text-slate-300">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                        {...register("password")}
                    />

                    {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

                    {
                        signup ?
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-3 transition duration-200 active:scale-[0.98]">
                            Register
                        </button> :
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-3 transition duration-200 active:scale-[0.98]">
                            Login
                        </button>
                    }
                </form>

                <div className="mt-6 text-center">
                    {
                        signup
                        ? (
                            <p className="text-slate-400 text-sm">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition"
                                    onClick={() => setSignup(false)}
                                >
                                    Login
                                </button>
                            </p>
                        )
                        : (
                            <p className="text-slate-400 text-sm">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition"
                                    onClick={() => setSignup(true)}
                                >
                                    Register
                                </button>
                            </p>
                        )
                    }
                </div>

            </div>
        </div>


  )
}

export default Auth
