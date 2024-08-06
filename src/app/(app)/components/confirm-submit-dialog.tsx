'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@app/components/ui/dialog'
import { Button } from '@app/components/ui/button'
import { Container } from '@app/components/craft'

export const ConfirmSubmitDialog: React.FC<{
  children: React.ReactNode
  onConfirm: () => void
}> = ({ children, onConfirm }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
      <DialogTitle>Please confirm</DialogTitle>
      <Container className="!p-3 grid place-items-start">
        <span>Are you sure you want to submit</span>
      </Container>
      <DialogFooter className="flex items-center justify-center gap-4">
        <DialogClose asChild>
          <Button variant={'outline'}>No, Take me back</Button>
        </DialogClose>
        <Button onClick={onConfirm}>Yes, please</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
