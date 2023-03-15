import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from "../context/AuthProvider";


export default function TransactionsLayout() {

  const [value, setValue] = useState(0);
  const [creditedAccountID, setCreditedAccountID] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const { auth, setAuth } = useContext(AuthContext);

  const userData = JSON.parse(sessionStorage.getItem('user') || '{}'); // obtém o accountId do usuário logado
  const sourceId = (userData?.accountId || '');

  const newBalance = userData.balance - value;


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
        value,
        newBalance
      });
      
      sessionStorage.setItem('user', JSON.stringify({ ...userData, balance: newBalance }));
      setAuth({ ...auth, balance: newBalance });

      alert('Transferência realizada com sucesso!');
    } catch (error) {
      alert(`Erro ao realizar a transferência: ${error}`);
    }
  };




  console.log("creditedAccountId:", creditedAccountID);
  console.log("SourceId:", sourceId);
  console.log("Value:", value);
  console.log("newBalance", newBalance);




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



