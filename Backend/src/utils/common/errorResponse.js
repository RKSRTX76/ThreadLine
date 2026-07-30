export const internalServerError = (error)=>{
    return{
        success : false,
        error : error,
        data : {},
        message : "Internal server error"
    }
}

export const customErrorResponse = (error)=>{
    if(!error.message && !error.explanation){
        return internalServerError(error);
    }

    return {
        success : false,
        error : error.explanation,
        data : {},
        message : error.message
    }
}