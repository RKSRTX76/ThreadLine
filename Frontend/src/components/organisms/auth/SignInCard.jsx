import { Form } from "@base-ui/react";
import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuLoaderCircle, LuTriangleAlert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = ({signinForm, setSigninForm, validationError, onSignInFormSubmit, error, isPending, isSuccess})=>{

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState();

    return (
        <Card className='w-full'>
            <CardHeader className="items-center text-center">
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to continue to your workspace.</CardDescription>
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
                <Form className='space-y-4' onSubmit={onSignInFormSubmit}>
                     
                    <Input 
                        placeholder="Email"
                        required
                        type="email"
                        value={signinForm.email}
                        onChange={(e)=> setSigninForm({...signinForm, email : e.target.value})}
                        disabled={isPending}
                    />
                    <div className="relative">
                        <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={signinForm.password}
                            onChange={(e) =>
                            setSigninForm({ ...signinForm, password: e.target.value })
                            }
                            className="pr-10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>

                    <Button 
                        className='w-full'
                        disabled={isPending}
                        size="lg"
                        type='submit'
                    >
                        Sign In   
                    </Button>
                    
                    <Separator className='my-5'/>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account? {' '}
                        <span 
                        onClick={()=> navigate('/signup')}
                        className="cursor-pointer font-medium text-primary hover:underline"
                        >
                            Sign Up
                        </span>
                    </p>
                </Form>
            </CardContent>
        </Card>
    )
}
