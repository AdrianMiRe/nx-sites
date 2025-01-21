import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const Toast = () => {
  return (
    <ToastContainer
      autoClose={5000}
      transition={Flip}
      draggable={'mouse'}
    />
  );
}