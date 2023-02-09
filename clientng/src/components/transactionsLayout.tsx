import * as React from 'react';
// import { ButtonAction } from './buttonAction';


export default function TransactionsLayout () {
  return (
    <div>


      <div>

        <div>
            <h3>
              TRANSAÇÃO
            </h3>
        </div>
        

        <div>
            <p>
              Valor:
            </p>
        </div>

        <div>
            <input title='Value:'/>
        </div>


        <div>
            <p>
              Conta para depósito:
            </p>
        </div>

        <div>
            <input title='creditedAccountID:'/>
        </div>

        <div>
          <button>Confirmar</button>
          <button>Cancelar</button>
        </div>


      </div>


    </div>
  );
}