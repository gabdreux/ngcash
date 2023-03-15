import React, { useState } from 'react';
import axios from '../api/axios';

export default function TransactionsLayout() {
  const [value, setValue] = useState(0);
  const [creditedAccountID, setCreditedAccountID] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  const userData = JSON.parse(sessionStorage.getItem('user') || '{}'); // obtém o accountId do usuário logado
  const sourceId = (userData?.accountId || '');


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    console.log(value);
  };

  const handleCreditedAccountIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditedAccountID(Number(e.target.value));
    console.log(creditedAccountID);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    try {

      await axios.post('/api/transfer', {
        sourceId: Number(sourceId), // converte o accountId para número
        destinationId: creditedAccountID,
        value
      });
      alert('Transferência realizada com sucesso!');
    } catch (error) {
      alert(`Erro ao realizar a transferência: ${error}`);
    }
  };


  console.log("creditedAccountId:", creditedAccountID);
  console.log("SourceId:", sourceId);
  console.log("Value:", value);

  return (
    <div>
      <div>
        <div>
          <h3>TRANSAÇÃO</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <p>Valor:</p>
          </div>

          <div>
            <input type="number" value={value} onChange={handleValueChange} title="Value:" />
          </div>

          <div>
            <p>Conta para depósito:</p>
          </div>

          <div>
            <input type="number" value={creditedAccountID} onChange={handleCreditedAccountIDChange} title="creditedAccountID:" />
          </div>

          {errorMessage && <div>{errorMessage}</div>}

          <div>
            <button type="submit">Confirmar</button>
            <button type="button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};



