import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSignIn } from "@/hooks/api/auth/useSignIn";

import { SignInCard } from "./SignInCard";

export const SigninContainer = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

     const [signinForm, setSigninForm] = useState({
        email : '',
        password : '',
    });

    const {isPending, isSuccess, error, signInMutation} = useSignIn();

    const [validationError, setValidationError] = useState(null);

    async function  onSignInFormSubmit(e) {
        e.preventDefault();
        console.log("Sign In form submitted", signinForm);
        
        if(!signinForm.email || !signinForm.password){
            console.error("All fields are required");
            setValidationError({message : "All fields are required"});
            return;
        }
        
        setValidationError(null);

        await signInMutation({
            email : signinForm.email,
            password : signinForm.password,
        })
    }

    useEffect(()=>{
        if(isSuccess){
            setTimeout(()=>{
                navigate(from, { replace: true });
            }, 3000);
        }
    }, [isSuccess, navigate, from]);


    return (
        <SignInCard 
        error = {error}
        isPending = {isPending}
        isSuccess = {isSuccess}
        signinForm = {signinForm} 
        setSigninForm = {setSigninForm} 
        validationError = {validationError}
        onSignInFormSubmit = {onSignInFormSubmit}
        />
    )
}