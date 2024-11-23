import { useState } from 'react';
import { useForm, type UseFormRegister, type SubmitHandler } from 'react-hook-form';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Services
import { estimateRide } from '../../services/rides.service';

// Assets
import driverImage from '../../assets/driver.png';

// Styles
import './index.scss';

type FormData = {
  customerId: string;
  origin: string;
  destination: string;
};

type FormField = {
  type: string;
  placeholder: string;
  label: string;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
  required: boolean;
  error: string | undefined;
};

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await estimateRide(data.customerId, data.origin, data.destination);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormField[] = [
    {
      type: 'text',
      placeholder: 'Ex: 2a719913-f6fa-4404-b2d5-3e7b3f96f593',
      label: 'ID do usuário',
      register: register,
      name: 'customerId',
      required: true,
      error: errors.customerId?.message,
    },
    {
      type: 'text',
      placeholder: 'Ex: Av. Brasil, n. 1000, Centro, São Paulo',
      label: 'Endereço de origem',
      register: register,
      name: 'origin',
      required: true,
      error: errors.origin?.message,
    },
    {
      type: 'text',
      placeholder: 'Ex: Av. Paulista, n. 1000, Bela Vista, São Paulo',
      label: 'Endereço de destino',
      register: register,
      name: 'destination',
      required: true,
      error: errors.destination?.message,
    },
  ];

  return (
    <main className="home">
      <section>
        <h1>ENCONTRE SUA PRÓXIMA VIAGEM!</h1>
        <h3>Insira as informações abaixo para dar início à sua solução do dia-dia</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form__container">
          {formFields.map((field) => (
            <Input key={field.label} {...field} />
          ))}
          <Button type="submit">Buscar</Button>
        </form>
        {/* <iframe
          title="Google Maps"
          width="450"
          height="250"
          frameBorder="0"
          // style="border:0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=-19.8513605/-43.9779221
  &destination=-19.9329185/-43.938381`}
          allowFullScreen
        /> */}
      </section>
      <aside className="hero-section">
        <img
          src={driverImage}
          alt="Imagem de um motorista ao volante olhando para a estrada"
          draggable={false}
        />
      </aside>
    </main>
  );
}

export default Home;
