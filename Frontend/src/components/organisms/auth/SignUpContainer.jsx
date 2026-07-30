import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSignUp } from "@/hooks/api/auth/useSignUp";

import { SignUpCard } from "./SignUpCard";

export const SignUpContainer = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

     const [signupForm, setSignupForm] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    });

    const {isPending, isSuccess, error, signUpMutation} = useSignUp();

    const [validationError, setValidationError] = useState(null);

    async function  onSignUpFormSubmit(e) {
        e.preventDefault();
        console.log("Sign Up form submitted", signupForm);
        
        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username){
            console.error("All fields are required");
            setValidationError({message : "All fields are required"});
            return;
        }

        if(signupForm.password !== signupForm.confirmPassword){
            console.error("Passwords do not match");
            setValidationError({message : "Password do not match"});
            return;
        }   
        
        setValidationError(null);

        await signUpMutation({
            email : signupForm.email,
            password : signupForm.password,
            username : signupForm.username
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
        <SignUpCard 
        error = {error}
        isPending = {isPending}
        isSuccess = {isSuccess}
        signupForm = {signupForm} 
        setSignupForm = {setSignupForm} 
        validationError = {validationError}
        onSignUpFormSubmit = {onSignUpFormSubmit}
        />
    )
}