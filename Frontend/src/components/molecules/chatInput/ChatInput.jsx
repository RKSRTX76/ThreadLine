import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getCloudinaryUploadSignature, uploadImageToCloudinary } from "@/api/cloudinary";
import { Editor } from "@/components/atoms/editor/Editor";
import { toast } from "@/components/ui/toast-manager";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = ()=>{
    const {socket} = useSocket();
    const { channelId } = useParams();

    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();
    const queryClient = useQueryClient();

    async function handleSumbit({body, image}) {
        try {
            let fileUrl = null;
            if(image){
                const credentials = await queryClient.fetchQuery({
                    queryKey : ['cloudinaryUploadSignature'],
                    queryFn : ()=> getCloudinaryUploadSignature({ token : auth?.token})
                });

                fileUrl = await uploadImageToCloudinary({
                    credentials,
                    file : image
                });
            }

            if (!socket?.connected || !channelId || !auth?.user?._id || !currentWorkspace?._id) {
                throw new Error('Message details are not ready yet.');
            }

            await new Promise((resolve, reject) => {
                socket.emit('newMessage', {
                    channelId,
                    body,
                    image : fileUrl,
                    senderId : auth.user._id,
                    workspaceId : currentWorkspace._id
                }, (data) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getPaginatedMessages', channelId] });
                        resolve(data.data);
                        return;
                    }

                    reject(new Error(data?.message || 'Unable to send message.'));
                });
            });

            return true;
        } catch (error) {
            console.error('Error sending message', error);
            toast.add({ title: error.message || 'Unable to send message', type: 'error' });
            return false;
        }
    }

    return (
        <div className="w-full px-5" >
            <Editor 
                placeholder = 'Type a message...'
                onSubmit = {handleSumbit}
                onCancel = {()=> {}}
                disabled = {false}
                defaultValue = ""
            />
        </div>
    )
}
