import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationInputPackage from "react-verification-input";

const VerificationInput = VerificationInputPackage.default;

export const JoinCodePage = () => {
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');

    function handleCodeComplete(code) {
        navigate(`/join/${code.toUpperCase()}`);
    }

    function handlePaste(event) {
        const pastedText = event.clipboardData.getData('text').trim();
        const inviteCode = pastedText.match(/\/join\/([a-z0-9]{6})(?:[/?#]|$)/i)?.[1];

        if (!inviteCode) {
            return;
        }

        event.preventDefault();
        const normalizedCode = inviteCode.toUpperCase();
        setJoinCode(normalizedCode);

        requestAnimationFrame(() => handleCodeComplete(normalizedCode));
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#1e1f22] p-4">
            <section className="w-full max-w-md rounded-xl bg-card p-8 text-center shadow-2xl ring-1 ring-white/10">
                <p className="text-sm font-medium text-primary">JOIN A WORKSPACE</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Enter your invite code</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    Enter the six-character code shared by your workspace admin.
                </p>

                <div className="mt-7">
                    <VerificationInput
                        autoFocus
                        length={6}
                        validChars="A-Za-z0-9"
                        placeholder=""
                        value={joinCode}
                        onChange={(code) => setJoinCode(code.toUpperCase())}
                        onComplete={handleCodeComplete}
                        inputProps={{
                            'aria-label': 'Six-character workspace invite code',
                            onPaste: handlePaste
                        }}
                        classNames={{
                            container: 'flex justify-center gap-2',
                            character: 'flex h-12 w-10 items-center justify-center rounded-md border text-lg font-semibold uppercase',
                            characterInactive: 'border-border bg-input',
                            characterSelected: 'border-primary ring-2 ring-primary',
                            characterFilled: 'border-primary/50 bg-primary/15'
                        }}
                    />
                </div>

                <p className="mt-5 text-xs text-muted-foreground">
                    You will be asked to confirm before joining.
                </p>
            </section>
        </main>
    );
};
