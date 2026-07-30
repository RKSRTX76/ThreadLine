import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const  MessageImageThumbnail = ({ url}) =>{
    return (
        <Dialog>
            <DialogTrigger>

                <div className="w-[360px] max-w-[65vw] cursor-zoom-in overflow-hidden rounded-lg">
                    <img src={url} className="block h-auto w-full object-cover" />
                </div>
            </DialogTrigger>

            <DialogContent className='max-w-[850px] border-none bg-transparent p-0 shadow-none' >
                <img 
                    src={url}
                    className="rounded-md object-cover size-full"
                />
            </DialogContent>

        </Dialog>
    );
};
