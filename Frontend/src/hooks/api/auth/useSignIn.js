import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/api/auth";
import { toast } from "@/components/ui/toast-manager";
import { useAuth } from "@/hooks/context/useAuth";

export const useSignIn = () => {
    const {setAuth} = useAuth();
    const {isPending, isSuccess, error, mutateAsync : signInMutation } = useMutation({
        mutationFn : signInRequest,
        onSuccess : (response)=>{
            console.log('Successfully signed In', response);

            // store token in local storage
            // in local store we store data in string only
            const userObject = JSON.stringify(response.data);
            localStorage.setItem('user', userObject);
            // store only token separately
            localStorage.setItem('token', response.data.token);

            setAuth({
                token : response.data.token,
                user : response.data,
                isLoading : false
            })

            toast.add({
                title : "Successfully signed In",
                description : 'You will be redirected to the main page in a few seconds',
                type : 'success'
            });
        },
        onError : (error)=>{
            console.log('Failed to signed In', error);
            toast.add({
                title : "Failed signed In",
                description : error.message,
                type : 'warning'
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signInMutation   // use to trigger
    }
}
