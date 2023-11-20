import { Modal, ModalProps } from "@mantine/core"
import { FC, useState } from "react"

interface DialogProps extends ModalProps {
}
export const Dialog: FC<DialogProps> = ({ ...props }) => {
  return (
    <Modal {...props}></Modal>
  )
}

export const useDialog = (initialOpen: boolean = false) => {
  const [open, setOpen] = useState(initialOpen)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  const onToggle = () => setOpen(p => !p)
  const dialogProps: DialogProps = {
    opened: open,
    onClose,
  }
  return {
    open,
    onOpen,
    onClose,
    onToggle,
    dialogProps,
  }
}
