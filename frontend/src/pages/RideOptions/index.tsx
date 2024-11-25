import { useSelector } from 'react-redux';

// Types
import type { IReduxStates } from '../../redux/types';

// Components
import DriverCard from '../../components/DriverCard';

// Styles
import './index.scss';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function RideOptions() {
  const { rides, coords } = useSelector((state: IReduxStates) => state.rides);  

  if (rides.length === 0) {
    return (
      <div className="ride-options">
        <section>
          <h1>NÃO HÁ OPÇÕES DISPONÍVEIS</h1>
          <p>Por favor, retorne à Página Inicial e pesquise novamente para atualizar os dados.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="ride-options">
      <section>
        <h1>CONFIRA AS OPÇÕES DISPONÍVEIS</h1>
        <div className="cards__container">
          {rides.map((driver) => (
            <DriverCard key={driver.id} {...driver} />
          ))}
        </div>
      </section>
      <aside>
        <iframe
          title="Google Maps"
          className="map__container"
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${coords.origin.latitude}/${coords.origin.longitude}
  &destination=${coords.destination.latitude}/${coords.destination.longitude}`}
          allowFullScreen
        />
      </aside>
    </div>
  );
}

export default RideOptions;
