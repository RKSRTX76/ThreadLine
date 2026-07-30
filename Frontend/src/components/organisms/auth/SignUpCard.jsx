import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuLoaderCircle, LuTriangleAlert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignUpCard = ({signupForm, setSignupForm, validationError, onSignUpFormSubmit, error, isPending, isSuccess})=>{

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRequirements = [
        {
            label: "At least 8 characters",
            met: signupForm.password.length >= 8,
        },
        {
            label: "1 uppercase letter",
            met: /[A-Z]/.test(signupForm.password),
        },
        {
            label: "1 lowercase letter",
            met: /[a-z]/.test(signupForm.password),
        },
        {
            label: "1 number",
            met: /\d/.test(signupForm.password),
        },
        {
            label: "1 special character (. @ $ ! % * ? &)",
            met: /[.@$!%*?&]/.test(signupForm.password),
        },
    ];


    return (
        <Card className='w-full'>
            <CardHeader className="items-center text-center">
                <CardTitle>Create your account</CardTitle>
                <CardDescription>Start collaborating with your team.</CardDescription>

                { validationError && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <LuTriangleAlert className="size-5"/>
                        <p>{validationError.message}</p>
                    </div>
                )}

                { error && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <LuTriangleAlert className="size-5"/>
                        <p>{error.message}</p>
                    </div>
                )}

                { isSuccess && (
                    <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
                        <FaCheck className="size-5"/>
                        <p>
                            Successfully signed up. You will be redirected to the login page in few seconds.
                            <LuLoaderCircle className="animate-spin ml-2" />
                        </p>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <form className='space-y-4' onSubmit={onSignUpFormSubmit}>
                     <Input 
                        placeholder="Username"
                        required
                        onChange={(e)=> setSignupForm({...signupForm, username : e.target.value})}
                        value={signupForm.username}
                        type="text"
                        disabled={isPending}
                    />
                    <Input 
                        placeholder="Email"
                        required
                        onChange={(e)=> setSignupForm({...signupForm, email : e.target.value})}
                        value={signupForm.email}
                        type="email"
                        disabled={isPending}
                    />
                    <div className="relative">
                        <Input 
                            placeholder="Password"
                            required
                            onChange={(e)=> setSignupForm({...signupForm, password : e.target.value})}
                            value={signupForm.password}
                            type={showPassword ? "text" : "password"}
                            disabled={isPending}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <ul className="space-y-1 text-xs" aria-label="Password requirements">
                        {passwordRequirements.map(({ label, met }) => (
                            <li
                                key={label}
                                className={met ? "text-emerald-400" : "text-muted-foreground/70"}
                            >
                                {met ? "✓" : "○"} {label}
                            </li>
                        ))}
                    </ul>
                    <div className="relative">
                        <Input 
                            placeholder="Confirm Password"
                            required
                            onChange={(e)=> setSignupForm({...signupForm, confirmPassword : e.target.value})}
                            value={signupForm.confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            disabled={isPending}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                            aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <Button 
                        className='w-full'
                        disabled={isPending}
                        size="lg"
                        type='submit'
                    >
                        Sign Up    
                    </Button>
                    
                    <Separator className='my-5'/>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account? {' '}
                        <span
                        onClick={()=> navigate('/signin')} 
                        className="cursor-pointer font-medium text-primary hover:underline">Sign In</span>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
