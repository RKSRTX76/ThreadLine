class ValidationError extends Error{
    constructor(explanation, message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.explanation = explanation;
    }
}

export default ValidationError;