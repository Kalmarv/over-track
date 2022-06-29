import { Toaster } from 'react-hot-toast'

const CustomToaster = () => {
  return (
    <Toaster
      position='bottom-right'
      reverseOrder={false}
      toastOptions={{
        className: '',
        style: {
          backgroundColor: '#00000000',
          boxShadow: 'none',
          padding: '0px',
        },
      }}
    />
  )
}

export default CustomToaster
