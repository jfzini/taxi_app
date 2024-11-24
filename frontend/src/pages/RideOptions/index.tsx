// Components
import DriverCard from '../../components/DriverCard';

// Styles
import './index.scss';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const responseMock = {
  origin: {
    latitude: -19.8513605,
    longitude: -43.9779221,
  },
  destination: {
    latitude: -19.9329185,
    longitude: -43.938381,
  },
  distance: 14313,
  duration: '1717',
  options: [
    {
      id: 1,
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      review: {
        rating: 2,
        comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      },
      value: 35.7825,
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      review: {
        rating: 4,
        comment:
          'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      },
      value: 71.565,
    },
    {
      id: 3,
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      review: {
        rating: 5,
        comment:
          'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      },
      value: 143.13,
    },
  ],
  routeResponse: {
    routes: [
      {
        legs: [],
        warnings: [],
        optimizedIntermediateWaypointIndex: [],
        routeLabels: [],
        distanceMeters: 14313,
        duration: {
          seconds: '1717',
          nanos: 0,
        },
        staticDuration: null,
        polyline: null,
        description: '',
        viewport: null,
        travelAdvisory: null,
        localizedValues: null,
        routeToken: '',
      },
    ],
    fallbackInfo: null,
    geocodingResults: null,
  },
};

function RideOptions() {
  return (
    <div className="ride-options">
      <section>
        <h1>CONFIRA AS OPÇÕES DISPONÍVEIS</h1>
        <div className="cards__container">
          {responseMock.options.map((driver) => (
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
          src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=-19.8513605/-43.9779221
  &destination=-19.9329185/-43.938381`}
          allowFullScreen
        />
      </aside>
    </div>
  );
}

export default RideOptions;
