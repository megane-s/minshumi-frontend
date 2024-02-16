import { ComponentProps } from 'react';
import { IoMail } from 'react-icons/io5';

export const MailIcon = (props: ComponentProps<typeof IoMail>) => {
    return <IoMail {...props} />
}
