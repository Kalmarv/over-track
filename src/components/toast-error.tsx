import { FC } from 'react'
import { Toast } from 'react-hot-toast'

const ToastError: FC<{ t: Toast; message: string }> = ({ t, message }) => {
  // onClick={() => toast.dismiss(t.id)}

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default ToastError
