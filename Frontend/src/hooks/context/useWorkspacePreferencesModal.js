import { useContext } from "react"

import WorkspacePreferenceModalContext from "@/context/WorkspacePreferencesModalContext"

/**
 * @returns {{ openPreferences: boolean, setOpenPreferences: (open: boolean) => void, initialValue: string, setInitialValue: (val: string) => void, workspace?: any }}
 */
export const useWorkspacePreferencesModal  = ()=> {
    return useContext(WorkspacePreferenceModalContext);
}