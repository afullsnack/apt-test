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
import { useRouter } from 'next/navigation'

export const ConfirmCloseDialog: React.FC<{
  children: React.ReactNode
  // onConfirm: () => void
}> = ({ children }) => {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Please confirm</DialogTitle>
        <Container className="!p-3 grid place-items-start">
          <span>Are you sure you want to close the current test</span>
        </Container>
        <DialogFooter className="flex items-center justify-center gap-4">
          <DialogClose asChild>
            <Button variant={'outline'}>No, Continue</Button>
          </DialogClose>
          <Button onClick={() => router.replace('/test')}>Yes, please</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
