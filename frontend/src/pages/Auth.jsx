import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"


const Auth = () => {

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
                `http://localhost:3000/auth/${signup ? "signup" : "login"}`,
                data,
                {withCredentials: true}
            );
            if(response.status===200)navigate("/");

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
    <div>
        <div>
            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                {
                    signup ? <div>Signup</div> :<div>Login</div>
                }
                
                {
                    signup && 
                    <>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </>
                }
                
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />

                {errors.email && <p>{errors.email.message}</p>}

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}

                {
                    signup ?
                    <button>Register</button>  : <button>Login</button>

                }       
            </form>
            <div>
                {
                    signup ?( <button type="button" onClick={() => setSignup(false)}>Login</button> ):
                           ( <button type="button" onClick={() => setSignup(true)}>Register/Signup</button> )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Auth
