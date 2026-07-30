// we used this because to avoid context provider hell

export default function combineContext(...providers){
    /**
     * This combines multiple context provider together and returns a single context provider
     */

    // as context provider a function and we are combining all together so we need to return as function
    return ({ children }) => {
        return providers.reduceRight((accumulator, CurrentProvider)=>{
            return <CurrentProvider>{accumulator}</CurrentProvider>
        }, children);
    }
}

// accumulator -> previous combined result