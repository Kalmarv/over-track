import { Button, Card, Text } from '@nextui-org/react'
import { FC } from 'react'
import { Toast } from 'react-hot-toast'

const ToastError: FC<{ t: Toast; message: string }> = ({ t, message }) => {
  // onClick={() => toast.dismiss(t.id)}

  return (
    <Card variant='flat' className='bg-error p-2 px-4'>
      <Text>{message}</Text>
    </Card>
  )
}

export default ToastError
