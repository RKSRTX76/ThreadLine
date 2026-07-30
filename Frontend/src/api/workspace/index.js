import axiosConfig from "@/config/axiosConfig"

export const createWorkspaceRequest = async({name, description, token}) => {
    try{
        const response = await axiosConfig.post('/workspaces', {name, description}, {
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is create workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in create wokrspace request', error);
        throw error.response?.data || error;
    }
}

export const fetchWorkspacesRequest = async ({token})=>{
    try{
        const response = await axiosConfig.get('/workspaces', {
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is fetch workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in fetch wokrspace request', error);
        throw error.response?.data || error;
    }
}


export const fetchWorkspaceDetailsRequest = async ({workspaceId,token})=>{
    try{
        const response = await axiosConfig.get(`/workspaces/${workspaceId}`, {
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is fetch workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in fetching workspace details request', error);
        throw error.response?.data || error;
    }
}

export const deleteWorkspaceRequest = async ({workspaceId,token})=>{
    try{
        const response = await axiosConfig.delete(`/workspaces/${workspaceId}`, {
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is delete workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in deleting workspace  request', error);
        throw error.response?.data || error;
    }
}

export const updateWorkspaceRequest = async ({workspaceId, name, token})=>{
    try{
        const response = await axiosConfig.put(`/workspaces/${workspaceId}`, { name },{
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is update workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in updating workspace details request', error);
        throw error.response?.data || error;
    }
}


export const addChannelToWorkspaceRequest = async ({workspaceId, channelName, token})=>{
    try{
        const response = await axiosConfig.put(`/workspaces/${workspaceId}/channels`, { channelName },{
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Response is add channel to  workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in adding channel to workspace request', error);
        throw error.response?.data || error;
    }
}


export const resetJoinCodeRequest = async ({workspaceId, token})=>{
    try{
        const response = await axiosConfig.put(`/workspaces/${workspaceId}/joincode/reset`,{ },{
            headers : {
                'x-access-token' : token
            }
        });
        console.log('Reset Join code workspace request', response);
        return response?.data?.data;
    }catch(error){
        console.log('Error in reseting workspace request', error);
        throw error.response?.data || error;
    }
}

export const fetchWorkspaceInviteRequest = async ({ joinCode, token }) => {
    try {
        const response = await axiosConfig.get(`/workspaces/join/${joinCode}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const acceptWorkspaceInviteRequest = async ({ joinCode, token }) => {
    try {
        const response = await axiosConfig.post(`/workspaces/join/${joinCode}`, {}, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
