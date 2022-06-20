import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [cripto, setCripto] = useState([]);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptomoneda, SelectCripto] = useSelectMonedas(
    "Elige tu Critomoneda",
    cripto
  );

  useEffect(() => {
    const getCriptomonedas = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const arrayCripto = resultado.Data.map((crypto) => {
        const data = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName,
        };
        return data;
      });

      setCripto(arrayCripto);
    };

    getCriptomonedas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario");
    if ([moneda, criptomoneda].includes("")) {
      alert("Datos Vacios");
      return;
    }
    setMonedas({
        moneda, criptomoneda
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCripto />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
