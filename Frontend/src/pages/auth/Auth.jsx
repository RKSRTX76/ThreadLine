
export const Auth = ({children})=>{
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1e1f22] px-4 py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5865f233,transparent_42%)]" />
            <div className="relative w-full max-w-[440px]">
                {children}
            </div>
        </main>
    )
}
