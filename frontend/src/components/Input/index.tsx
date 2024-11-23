import type React from 'react';

// Styles
import './index.scss';

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
};

function Input({
  type = 'text',
  placeholder = 'Sua resposta',
  value = '',
  onChange = () => {},
  label = 'Exemplo',
  name,
}: InputProps) {
  const uuid = crypto.randomUUID();

  return (
    <>
      <label htmlFor={uuid}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={uuid}
        name={name || label}
      />
    </>
  );
}

export default Input;
