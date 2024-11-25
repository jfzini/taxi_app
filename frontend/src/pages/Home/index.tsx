import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

// Interfaces / Types
import type { Customer, FormData, FormField } from './types';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

// Services
import { estimateRide, getCustomers } from '../../services/rides.service';

// Actions
import {
  changeCoords,
  changeDistance,
  changeDuration,
  changeRides,
} from '../../redux/actions/rides.actions';

// Assets
import driverImage from '../../assets/driver.png';

// Styles
import './index.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Query
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      try {
        const response = await getCustomers();
        return response;
      } catch (error) {
        console.error(error);
        toast.error('Não foi possível carregar os usuários. Tente novamente mais tarde');
        return [];
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      dispatch(changeRides([])); // Clear previous rides
      const response = await estimateRide(data.customerId, data.origin, data.destination);
      if (response?.options) {
        dispatch(changeRides(response.options));
        dispatch(
          changeCoords({
            origin: { ...response.origin, address: data.origin },
            destination: { ...response.destination, address: data.destination },
          }),
        );
        dispatch(changeDistance(response.distance));
        dispatch(changeDuration(response.duration));
      }
      toast.success('Busca realizada com sucesso!');
      navigate(`/opcoes/${data.customerId}`);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data?.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error('Não foi possível realizar a busca. Tente novamente mais tarde');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormField[] = [
    {
      type: 'select',
      label: 'Usuário',
      register: register,
      name: 'customerId',
      required: true,
      error: errors.customerId?.message,
      placeholder: isLoading ? 'Carregando...' : 'Selecione um usuário',
      options:
        customers?.map((customer: Customer) => ({
          value: customer.id,
          label: customer.name,
        })) || [],
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
          {formFields.map((field) => {
            switch (field.type) {
              case 'select':
                return (
                  <Select
                    key={field.label}
                    label={field.label}
                    name={field.name}
                    register={field.register}
                    required={field.required}
                    placeholder={field.placeholder}
                    error={field.error}
                    options={field.options || []}
                  />
                );

              default:
                return <Input key={field.label} {...field} />;
            }
          })}
          <Button type="submit" isLoading={isSubmitting}>
            Buscar
          </Button>
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
