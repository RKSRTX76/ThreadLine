import { z } from 'zod';

export const userSignUpSchema = z.object({
    email : z
    .string()
    .trim()
    .email(),
    
    username : z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores.")
    ,

    password : z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/,
            "Password required atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character")

}).strict()


export const userSignInSchema = z.object({
    email : z
    .string()
    .trim()
    .email(),

    password : z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/,
            "Password required atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character")

}).strict()
