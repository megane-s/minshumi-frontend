"use client"

import { Button } from "@/components/Button"
import { Dialog, useDialog } from "@/components/Dialog"
import { FC } from "react"

interface DialogExampleProps {
}
export const DialogExample: FC<DialogExampleProps> = () => {
  const dialog = useDialog()
  return (
    <div>
      <Button onClick={() => dialog.onOpen()}>
        open dialog
      </Button>
      <Dialog {...dialog.dialogProps}>
        <div>
          OK ?
        </div>
        <Button onClick={() => dialog.onClose()}>
          close dialog
        </Button>
      </Dialog>
    </div>
  )
}
