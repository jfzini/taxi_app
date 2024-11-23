import { useState } from 'react';
import Input from '../../components/Input';
import { estimateRide } from '../../services/rides.service';

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
    <>
      <section>
        <h1>SHOPPER'S RIDES</h1>
        <p>Bem-vindo(a) ao Shopper's Rides!</p>
      </section>
      <section>
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
    </>
  );
}

export default Home;
