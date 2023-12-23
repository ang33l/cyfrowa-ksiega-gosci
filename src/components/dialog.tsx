import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const DialogTemplate = (
    { buttonClassName,
        button_content,
        dialog_title,
        dialog_description,
        button_accept_text,
        onAcceptClick
    }: {
        buttonClassName: string,
        button_content: JSX.Element,
        dialog_title: string,
        dialog_description: string,
        button_accept_text: string,
        onAcceptClick: () => void
    }) => {



    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className={buttonClassName}>
                    {button_content}
                </button>

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="z-[1000] bg-[#00000022] data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="z-[1001] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        {dialog_title}
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        {dialog_description}
                    </Dialog.Description>

                    <div className="mt-[25px] flex justify-end gap-2">
                        <Dialog.Close asChild>
                            <button onClick={onAcceptClick} className="bg-red-500 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                {button_accept_text}
                            </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button className="bg-gray-100 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Anuluj
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
};

export default DialogTemplate;