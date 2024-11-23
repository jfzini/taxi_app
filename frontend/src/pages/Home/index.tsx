import { useState } from 'react';
import Input from '../../components/Input';
import { estimateRide } from '../../services/rides.service';

// Assets
import driverImage from '../../assets/driver.png';

// Styles
import './index.scss';

function Home() {
  const [formData, setFormData] = useState({
    customerId: '',
    origin: '',
    destination: '',
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await estimateRide(formData.customerId, formData.origin, formData.destination);
    console.log(response);
  }

  return (
    <main className="home">
      <section>
        <h1>ENCONTRE SUA PRÓXIMA VIAGEM!</h1>
        <h3>Insira as informações abaixo para dar início à sua solução do dia-dia</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Digite o id do usuário"
            label="ID do usuário"
            onChange={handleInputChange}
            name="customerId"
            value={formData.customerId}
          />
          <Input
            type="text"
            placeholder="Ex: Av. Brasil, n. 1000, Centro, São Paulo"
            label="Endereço de origem"
            onChange={handleInputChange}
            name="origin"
            value={formData.origin}
          />
          <Input
            type="text"
            placeholder="Ex: Av. Paulista, n. 1000, Bela Vista, São Paulo"
            label="Endereço de destino"
            onChange={handleInputChange}
            name="destination"
            value={formData.destination}
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
