import { Modal, ModalProps } from "@mantine/core"
import { FC, useCallback, useMemo, useState } from "react"

interface DialogProps extends ModalProps {
}
export const Dialog: FC<DialogProps> = ({ ...props }) => {
  return (
    <Modal {...props}></Modal>
  )
}

export const useDialog = (initialOpen: boolean = false) => {
  const [open, setOpen] = useState(initialOpen)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onToggle = useCallback(() => setOpen(p => !p), [])
  const dialogProps: DialogProps = useMemo(() => ({
    opened: open,
    onClose,
  }), [onClose, open])
  return {
    open,
    onOpen,
    onClose,
    onToggle,
    dialogProps,
  }
}
