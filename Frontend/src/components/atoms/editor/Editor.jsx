import 'quill/dist/quill.snow.css'; // ES6

import Quill from 'quill';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuPaperclip, LuSendHorizontal, LuX } from 'react-icons/lu';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import { Hint } from '../hint/Hint';
export const Editor = ({
    // variant = 'create',
    onSubmit
    // onCancel,
    // placeholder,
    // defaultValue
}) => {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);

    const [image, setImage] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const containerRef = useRef(); // reqd to initialize the editor
    const defaultValueRef = useRef();
    const quillRef = useRef();
    const imageInputRef = useRef(null);
    const sendMessageRef = useRef(null);

    const sendMessage = useCallback(async () => {
        if (isSending) return false;

        const quill = quillRef.current;
        const messageContent = JSON.stringify(quill?.getContents());
        const hasText = Boolean(quill?.getText().trim());

        if (!hasText && !image) return false;

        setIsSending(true);
        const wasSent = await onSubmit({ body: messageContent, image });
        setIsSending(false);

        if (!wasSent) return false;

        quill?.setText('');
        setImage(null);
        imageInputRef.current.value = '';
        return true;
    }, [image, isSending, onSubmit]);

    useEffect(() => {
        sendMessageRef.current = sendMessage;
    }, [sendMessage]);

    function toggleToolbar() {
        setIsToolbarVisible(!isToolbarVisible);
        const toolbar = containerRef.current.querySelector('.ql-toolbar');
        if(toolbar) {
            toolbar.classList.toggle('hidden');
        }
    }

    useEffect(() => {

        if(!containerRef.current || quillRef.current) return; // initialize Quill only once per editor

        const container = containerRef.current; // get the container element

        const editorContainer = container.appendChild(container.ownerDocument.createElement('div')); // create a new div element and append it to the container

        const options = {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: 'Enter',
                            shiftKey: false,
                            handler: () => {
                                void sendMessageRef.current?.();
                                return false;
                            }
                        },
                        shift_enter: {
                            key: 'Enter',
                            shiftKey: true,
                            handler: () => true
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);

        quillRef.current = quill;
        container.querySelector('.ql-toolbar')?.classList.add('hidden');
        quillRef.current.focus();

        quill.setContents(defaultValueRef.current);

        return () => {
            quillRef.current = null;
            editorContainer.remove();
        };
    }, []);


    return (
        <div
            className='flex flex-col'
        >

            <div
                className='flex flex-col overflow-hidden rounded-lg border border-transparent bg-input shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25'
            >
                <div className={`flex min-w-0 ${image ? 'items-center gap-3 p-3' : ''}`}>
                    {image && (
                        <div className='relative size-14 shrink-0 group/image'>
                                <button
                                    className='absolute -right-2 -top-2 z-[5] flex size-5 items-center justify-center rounded-full bg-black/75 text-white opacity-0 transition-opacity group-hover/image:opacity-100 hover:bg-black'
                                    onClick={() => {
                                        setImage(null);
                                        imageInputRef.current.value = '';
                                    }}
                                >
                                    <LuX className='size-4' />
                                </button>
                                <img 
                                    src={URL.createObjectURL(image)}
                                    className='size-full rounded-md object-cover'
                                />
                        </div>
                    )}
                    <div className='min-w-0 flex-1'>
                        <div className='ql-custom' ref={containerRef} />
                    </div>
                </div>

                <div className='z-[5] flex items-center gap-1 border-t border-white/5 px-3 py-2'>
                    <Hint label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'} side='bottom' align='center'>
                        <Button
                            size="iconSm"
                            variant="ghost"
                            disabled={false}
                            onClick={toggleToolbar}
                        >
                            <PiTextAa className='size-4' />
                        </Button>
                    </Hint>

                    <Hint label="Attach image">
                        <Button
                            size="iconSm"
                            variant="ghost"
                            disabled={false}
                            onClick={() => { imageInputRef.current.click(); }}
                        >
                            <LuPaperclip className='size-4' />
                        </Button>
                    </Hint>

                    <input 
                        type="file"
                        className='hidden'
                        ref={imageInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <Hint label="Send Message">
                        <Button
                            size="iconSm"
                            className="ml-auto size-9 rounded-full bg-primary p-0 text-white shadow-md shadow-primary/30 hover:scale-105 hover:bg-primary/85"
                            onClick={sendMessage}
                            disabled={isSending}
                        >
                            <LuSendHorizontal className='size-4' />
                        </Button>
                    </Hint>
                </div>
            </div>

            <p
                className='flex justify-end px-2 pt-2 text-xs text-muted-foreground'
            >
                <strong>Enter</strong>&nbsp; to send · <strong>Shift + Enter</strong>&nbsp; for a new line
            </p>
        </div>
    );
};
