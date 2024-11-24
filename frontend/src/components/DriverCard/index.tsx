import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Interfaces / Types
import { AxiosError } from 'axios';
import type { IReduxStates } from '../../redux/types';

// Components
import Button from '../Button';

// Services
import { confirmRide } from '../../services/rides.service';

// Styles
import './index.scss';

type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  value: number;
  review: {
    rating: number;
    comment: string;
  };
};

function renderStars(rating: number) {
  const stars = [];
  const maxStars = 5;

  for (let i = 0; i < maxStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? '#FFD700' : '#C0C0C0'} // Gold for filled stars, gray for empty
        width="20"
        height="20"
      >
        <title>{i < rating ? 'Filled star' : 'Empty star'}</title>
        <path d="M12 2.248l3.09 6.26 6.91 1.002-5 4.873 1.18 6.887L12 17.27l-6.18 3.25L7 14.383 2 9.51l6.91-1.002L12 2.248z" />
      </svg>,
    );
  }

  return <div style={{ display: 'flex', gap: '4px' }}>{stars}</div>;
}

function DriverCard({ id, name, description, vehicle, value, review }: Driver) {
  const { customer_id } = useParams<{ customer_id: string }>();
  const { coords, distance, duration } = useSelector((state: IReduxStates) => state.rides);

  const handleConfirm = async () => {
    const body = {
      customer_id,
      origin: coords.origin.address,
      destination: coords.destination.address,
      distance,
      duration,
      driver: {
        id,
        name,
      },
      value,
    };

    try {
      await confirmRide(body);
      toast.success('Corrida confirmada com sucesso!');
      // navigate(`/corrida/${response.id}`);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data?.error_description) {
        toast.error(error.response.data.error_description);
      } else {
        toast.error('Erro ao confirmar corrida. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <article key={id} className="driver-card">
      <header>
        <h4>{name}</h4>
        {renderStars(review.rating)}
      </header>
      <p>{description}</p>
      <p>
        <strong>Veículo:</strong> {vehicle}
      </p>
      <p>
        <strong>Valor estimado:</strong> R${value.toFixed(2)}
      </p>
      <p>
        <strong>Comentário:</strong> {review.comment}
      </p>
      <Button onClick={handleConfirm}>Contratar</Button>
    </article>
  );
}

export default DriverCard;
