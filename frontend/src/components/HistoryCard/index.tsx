// Styles
import './index.scss';

type HistoryCardProps = {
  id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
  date: string;
};

function HistoryCard({
  id,
  origin,
  destination,
  distance,
  duration,
  driver,
  value,
  date,
}: HistoryCardProps) {
  // Formatting duration to HH:MM:SS
  const formattedDuration = new Date(Number(duration) * 1000).toISOString().substr(11, 8);

  // Foramtting data to DD/MM/YYYY
  const parsedDate = new Date(date);
  const formattedDate = `${parsedDate.getDate()}/${
    parsedDate.getMonth() + 1
  }/${parsedDate.getFullYear()}`;

  return (
    <article key={id} className="history-card">
      <header>
        <h4>{driver.name}</h4>
      </header>
      <p>
        <strong>Origem:</strong> {origin}
      </p>
      <p>
        <strong>Destino:</strong> {destination}
      </p>
      <p>
        <strong>Distância:</strong> {(distance / 1000).toFixed(2)} km
      </p>
      <p>
        <strong>Duração:</strong> {formattedDuration}
      </p>
      <p>
        <strong>Valor:</strong> R${value.toFixed(2)}
      </p>
      <p>
        <strong>Data:</strong> {formattedDate}
      </p>
    </article>
  );
}

export default HistoryCard;
