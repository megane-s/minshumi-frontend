import { useState } from "react";
import { NewArtSession } from "./type";
import { updateNewArtSessionAction } from "./actions";
import { useDebounce } from 'react-use'

export const useInputNewArtSessionField = <Key extends keyof NewArtSession>(
    key: Key,
    init: NewArtSession[typeof key],
    revalidateKey: string,
) => {
    const [state, setState] = useState(init)
    useDebounce(
        () => {
            void updateNewArtSessionAction(
                {
                    [key]: state,
                },
                revalidateKey,
            )
        },
        200,
        [state],
    )
    return [state, setState] as const
}
