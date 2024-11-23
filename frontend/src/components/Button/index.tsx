// Styles
import './index.scss';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
  layout?: 'contained' | 'outlined';
  colorScheme?: 'success' | 'warning' | 'regular';
};

function Button({
  type = 'button',
  onClick,
  children,
  layout = 'contained',
  colorScheme = 'regular',
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`button button--${layout}--${colorScheme}`}>
      {children}
    </button>
  );
}

export default Button;
