import { AuthContextProvider } from "@/context/AuthContext";

import combineContext from "../utils/CombineContext";
import { ChannelMessagesProvider } from "./ChannelMessages";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferencesModalContext";

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalContextProvider,
    CreateChannelContextProvider,
    WorkspaceContextProvider,
    ChannelMessagesProvider,
    SocketContextProvider,
);