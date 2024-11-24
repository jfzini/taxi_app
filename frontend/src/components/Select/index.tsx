import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type SelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
};

function Select<T extends FieldValues>({
  label,
  placeholder = 'Selecione uma opção',
  name,
  register,
  options,
  required = false,
  error,
}: SelectProps<T>) {
  const uuid = crypto.randomUUID();

  return (
    <div className="input__wrapper">
      <label htmlFor={uuid}>{label}</label>
      <select
        {...register(name, {
          required: {
            value: required,
            message: `${label} é um campo obrigatório`,
          },
        })}
        id={uuid}
        required={required}
        className={`input ${error ? 'input--error' : ''}`}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default Select;
