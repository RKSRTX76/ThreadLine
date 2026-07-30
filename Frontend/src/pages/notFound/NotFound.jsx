import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const NotFound = ()=>{
    const navigate = useNavigate();

    return (
        <div
            className="flex h-screen w-full flex-col items-center justify-center bg-[#1e1f22] p-4"
        >
            <Card className='w-full max-w-md text-center'>
                <CardHeader>
                    <CardTitle>404 Not Found</CardTitle>
                    <p className="text-gray-600">
                        The page you are looking for does not exist 
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mx-auto grid size-24 place-items-center rounded-full bg-primary/15 text-4xl font-bold text-primary">404</div>
                    <Button
                        variant="outline"
                        onClick={()=>navigate(-1)}  // -1 used for go back to previous page
                        className="mt-4"
                    >
                        Return
                    </Button>
                </CardContent>

            </Card>

        </div>    
    )
}
