import { LuHash } from "react-icons/lu";

export const ChannelHeader = ({ name }) => {
    return (
        <header className="flex h-[56px] items-center border-b border-black/20 px-5 shadow-sm">
            <LuHash className="mr-2 size-5 text-muted-foreground" />
            <h1 className="text-base font-bold">{name ?? "Channel"}</h1>
        </header>
    );
};
