"use client"

import { useMutate } from "@/util/client/useMutate"
import { Loader } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { Button, ButtonProps } from "./Button"

interface MutateButtonProps<Res> extends ButtonProps {
    mutation: ReturnType<typeof useMutate<() => Promise<Res>>>
}
const MutateButton = <Res,>({ mutation, children, leftSection, disabled, ...buttonProps }: MutateButtonProps<Res>) => {
    return (
        <Button
            onClick={() => void mutation.mutate(null)}
            leftSection={
                <AnimatePresence initial={false}>
                    {mutation.isLoading
                        ? <motion.div
                            initial="close"
                            animate="open"
                            exit="close"
                            variants={{
                                open: { opacity: 1, width: "auto", scale: 1.0 },
                                close: { opacity: 0, width: 0, scale: 0.5 },
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <Loader size="sm" />
                        </motion.div>
                        : leftSection
                    }
                </AnimatePresence>
            }
            disabled={mutation.isLoading || disabled}
            {...buttonProps}
        >
            {mutation.isLoading && mutation.loading?.button
                ? mutation.loading.button
                : children
            }
        </Button>
    )
}

export default MutateButton
