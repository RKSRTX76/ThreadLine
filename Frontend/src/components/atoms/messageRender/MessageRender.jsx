import Quill from "quill";
import { useEffect, useRef, useState } from "react"

export const MessageRender = ({ value })=>{
    const renderRef = useRef(null);
    const [isEmpty, setIsEmpty ] = useState(false);

    useEffect(()=>{
        if(!renderRef.current) return;

        const quill = new Quill(document.createElement('div'), {
            theme : 'snow'
        });

        // Disable editing
        quill.disable();
        const content = JSON.parse(value);
        quill.setContents(content);
        
        const isContentEmpty = quill.getText().trim().length === 0;
        setIsEmpty(isContentEmpty);
        renderRef.current.innerHTML = quill.root.innerHTML;
    }, [value]);

    if(isEmpty) return null;

    return (
        <div ref={renderRef} className="ql-editor ql-renderer" />
    )
}