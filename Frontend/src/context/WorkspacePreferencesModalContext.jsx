import { createContext, useState } from "react";

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalContextProvider = ({ children })=>{
    const [openPreferences, setOpenPreferences] = useState(false);
    const [initialValue, setInitialValue] = useState('Edit Workspace');
    const [workspace, setWorkspace] = useState(null);

    return (
        <WorkspacePreferenceModalContext.Provider value={{openPreferences, setOpenPreferences, initialValue, setInitialValue, workspace, setWorkspace}} >
            {children}
        </WorkspacePreferenceModalContext.Provider>
    )
}

export default WorkspacePreferenceModalContext;