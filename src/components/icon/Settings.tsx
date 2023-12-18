import { ComponentProps } from 'react';
import { FcSettings } from 'react-icons/fc';

export const SettingsIcon = (props: ComponentProps<typeof FcSettings>) => {
    return <FcSettings {...props} />
}
