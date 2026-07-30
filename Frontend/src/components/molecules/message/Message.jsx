import { MessageImageThumbnail } from "@/components/atoms/messageImageThumbnail/MessageImageThumbnail"
import { MessageRender } from "@/components/atoms/messageRender/MessageRender"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Message = ({ authorImage, authorName, createdAt, body, image, isOwnMessage}) => {
    let hasText;

    try {
        hasText = JSON.parse(body)?.ops?.some((operation) =>
            typeof operation.insert === 'string' && operation.insert.trim()
        );
    } catch {
        hasText = Boolean(body?.trim());
    }

    const formattedTime = createdAt
        ? new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            month: 'short',
            day: 'numeric'
        }).format(new Date(createdAt))
        : 'Just now';

    return (
        <div className={`group relative flex flex-col gap-1 px-5 py-2 transition-colors hover:bg-white/3 ${isOwnMessage ? 'items-end' : 'items-start'}`} >
            <div className={`flex items-center gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                <button>
                    <Avatar>
                        <AvatarImage src={authorImage} />
                        <AvatarFallback className="rounded-md bg-sky-500 text-white text-sm">
                            {authorName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </button>

                <div className={`flex min-w-0 flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>

                    <div className="text-xs">
                        <button className={`font-semibold hover:underline ${isOwnMessage ? 'text-primary' : 'text-foreground'}`}>
                            {authorName}
                        </button>
                        <span>&nbsp; &nbsp;</span>
                        <button className="text-xs text-muted-foreground hover:underline" >
                            {formattedTime}
                        </button>
                    </div>

                    {hasText && (
                        <div className={`w-fit max-w-[min(70vw,520px)] rounded-2xl px-3 py-2 text-sm shadow-sm ${isOwnMessage ? 'rounded-tr-md bg-primary text-white' : 'rounded-tl-md bg-[#383a40] text-foreground'}`}>
                            <MessageRender value={body} />
                        </div>
                    )}
                    {image && <MessageImageThumbnail url={image} />}
                </div>
            </div>
        
        </div>
    )   
}
