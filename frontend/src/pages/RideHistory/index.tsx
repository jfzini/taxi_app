import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm, type SubmitHandler } from 'react-hook-form';

// Interfaces / Types
import type {
  CustomerResponse,
  DriverResponse,
  HistoryFormData,
  RideHistoryResponse,
} from './types';
import { AxiosError } from 'axios';

// Services
import { getCustomers, getDrivers, getRides } from '../../services/rides.service';

// Components
import Button from '../../components/Button';
import Select from '../../components/Select';
import HistoryCard from '../../components/HistoryCard';

// Styles
import './index.scss';

function RideHistory() {
  const queryClient = useQueryClient();
  const customersCache = queryClient.getQueryData<CustomerResponse[]>(['customers']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HistoryFormData>();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rides, setRides] = useState<RideHistoryResponse[]>([]);

  // React Query
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
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
    enabled: !customersCache,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });

  const { data: drivers, isLoading: isLoadingDrivers } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      try {
        const response = await getDrivers();
        return response;
      } catch (error) {
        console.error(error);
        toast.error('Não foi possível carregar os motoristas. Tente novamente mais tarde');
        return [];
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });

  // Handlers
  const onSubmit: SubmitHandler<HistoryFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await getRides(data.customer_id, data.driver_id);
      if (response?.rides) {
        setRides(response.rides);
      }

      toast.success('Busca realizada com sucesso!');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data?.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error('Não foi possível realizar a busca. Tente novamente mais tarde');
      }
      setRides([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Constants
  const customersOptions = (customersCache ?? customers)?.map((customer: CustomerResponse) => ({
    value: customer.id,
    label: customer.name,
  }));

  const driversOptions = drivers?.map((driver: DriverResponse) => ({
    value: driver.id,
    label: driver.name,
  }));

  return (
    <main className="history">
      <section className="history-form__container">
        <h1>HISTÓRICO</h1>
        <strong>Busque o histórico de viagens realizadas!</strong>
        <form onSubmit={handleSubmit(onSubmit)} className="form__container">
          <Select
            name="customer_id"
            label="Usuário"
            options={customersOptions}
            register={register}
            placeholder={isLoadingCustomers ? 'Carregando...' : 'Selecione um usuário'}
            required
            error={errors.customer_id?.message}
          />
          <Select
            name="driver_id"
            label="Motorista"
            options={driversOptions}
            disableDefaultOption={false}
            register={register}
            placeholder={isLoadingDrivers ? 'Carregando...' : 'Todos'}
            error={errors.driver_id?.message}
          />
          <Button type="submit" isLoading={isSubmitting}>
            Buscar
          </Button>
        </form>
      </section>
      {rides.length > 0 && (
        <section className="history-cards__container">
          <h3>Resultados:</h3>
          {rides.map((ride) => (
            <HistoryCard key={ride.id} {...ride} />
          ))}
        </section>
      )}
    </main>
  );
}

export default RideHistory;
