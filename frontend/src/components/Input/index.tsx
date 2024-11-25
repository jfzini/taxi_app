import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

// Styles
import './index.scss';

type InputProps<T extends FieldValues> = {
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  name: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
};

function Input<T extends FieldValues>({
  type = 'text',
  placeholder = 'Sua resposta',
  label = 'Exemplo',
  required = false,
  name,
  error,
  register,
}: InputProps<T>) {
  const uuid = crypto.randomUUID();

  return (
    <div className="input__wrapper">
      <label htmlFor={uuid}>{label}</label>
      <input
        {...register(name, { required: {
          value: required,
          message: `${label} é um campo obrigatório`,
        } })}
        type={type}
        placeholder={placeholder}
        id={uuid}
        required={required}
        className={`input ${error ? 'input--error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default Input;
