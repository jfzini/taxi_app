// Styles
import { HashLoader } from 'react-spinners';
import './index.scss';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  layout?: 'contained' | 'outlined';
  colorScheme?: 'success' | 'warning' | 'regular';
};

function Button({
  type = 'button',
  isLoading = false,
  onClick,
  children,
  layout = 'contained',
  colorScheme = 'regular',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${layout}--${colorScheme}`}
      disabled={isLoading}
    >
      {isLoading ? <HashLoader color="#fff" size={20} /> : children}
    </button>
  );
}

export default Button;
