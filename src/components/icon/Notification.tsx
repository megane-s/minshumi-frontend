import { ComponentProps } from 'react';
import { BsBellFill } from 'react-icons/bs';

export const NotificationIcon = (props: ComponentProps<typeof BsBellFill>) => {
    return <BsBellFill {...props} />
}
