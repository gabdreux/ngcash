import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from "../context/AuthProvider";
import ActiveLink from "./activeLink";


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
        <h1>TRANSACTION</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='value'>Value:</label>
          <input 
            type="number"
            id='value'
            onChange={handleValueChange}
            value={value}
            required
          />
          <label htmlFor='creditedAccountID'>Credited Account ID:</label>
          <input 
            type="number"
            id='creditedAccountID'
            onChange={handleCreditedAccountIDChange}
            value={creditedAccountID}
            required
          />
          {errorMessage && <p className='errmsg' aria-live="assertive">{errorMessage}</p>}
          <button className='sign' type="submit">Confirm</button>
        </form>
      </div>

  );
};



