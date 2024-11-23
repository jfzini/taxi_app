import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../../components/Input';
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

  return (
    <main className="home">
      <section>
        <h1>ENCONTRE SUA PRÓXIMA VIAGEM!</h1>
        <h3>Insira as informações abaixo para dar início à sua solução do dia-dia</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form__container">
          <Input
            type="text"
            placeholder="Digite o id do usuário"
            label="ID do usuário"
            register={register}
            name="customerId"
            error={errors.customerId?.message}
          />
          <Input
            type="text"
            placeholder="Ex: Av. Brasil, n. 1000, Centro, São Paulo"
            label="Endereço de origem"
            register={register}
            name="origin"
            error={errors.origin?.message}
          />
          <Input
            type="text"
            placeholder="Ex: Av. Paulista, n. 1000, Bela Vista, São Paulo"
            label="Endereço de destino"
            register={register}
            name="destination"
            error={errors.destination?.message}
          />
          <button type="submit">Buscar</button>
        </form>
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
