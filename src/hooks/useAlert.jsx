import { useSnackbar } from 'notistack';
import { Alert, Button, CircularProgress } from '@mui/material';

export default function useAlert() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const txAlert = (message,key) => {
    return enqueueSnackbar(message, {
      // variant: 'info',
      key:key,
      persist: true,
      content: (key, message) => (
        <Alert iconMapping={{
          info: <CircularProgress size="25px" fontSize="inherit" />,
        }} severity="info">{message}
          <Button size='small' onClick={() => closeSnackbar(key)}>
            Hide
          </Button>
        </Alert>
      ),
      action: (key, message) => {
      },
    });
  }

  const txErrorAlert = (message) => {
    return enqueueSnackbar(message, {
      // variant: 'info',
      content: (key, message) => (
        <Alert severity="error">{message}
          <Button size='small' onClick={() => closeSnackbar(key)}>
            Hide
          </Button>
        </Alert>
      ),
    });
  }

  const txSuccessAlert = (message) => {
    return enqueueSnackbar(message, {
      // variant: 'info',
      content: (key, message) => (
        <Alert severity="success">{message}
          <Button size='small' onClick={() => closeSnackbar(key)}>
            Hide
          </Button>
        </Alert>
      ),
    });
  }


  return (message, mType = null,key=null) => {
    if (mType === 'error') {
      return txErrorAlert(message,key);
    } else if (mType === 'success') {
      return txSuccessAlert(message)
    } else {
      return txAlert(message)
    }


  };


}
