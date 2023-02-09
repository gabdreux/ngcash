import * as React from 'react';
import { InputField } from './inputField';
import { useState } from 'react';




export default function LoginLayout () {


  const [tests, setTests] = useState('');
  
  const handleSubmit = async (userName: string,  password: string) => {
    console.log(userName, password);
   
    // await axios.get(`http://localhost:5000/user/${userName}`).then((res) => setTests(res.data)).catch((err) => console.log(err));

    //colocar rota do nextjs aqui 
    console.log(tests);

  };

  const [action, setAction] = useState('login');


  const [formData, setFormData] = useState ({

    userName: '',
    password: '',

  })



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {

    setFormData( form => ({
      ...form,
      [field]: event.target.value
    }))

  }


  return (


    <div className='bgBox'>


      <div className='inputBox'>
        <div>
          <h2>
            BEM-VINDO!
          </h2>
        </div>


        <div>
          <h3>
             { action === 'login' ? 'FAÇA O LOGIN PARA CONTINUAR' : 'REGISTRE-SE PARA COMEÇAR'}
          </h3>
        </div>


        

        
        {/* <Card sx={{ backgroundColor: "white", padding: "1em", borderRadius: "10px"}}>
          {
            JSON.stringify(formData)
          }
        </Card>
  */}




        <form>

          <InputField
          
          htmlFor='userName'
          label='Username:'
          value={formData.userName}
          onChange={e => handleInputChange(e, 'userName')}
          
          />

          <InputField
          
          htmlFor='password'
          label='Senha:'
          type="password"
          value={formData.password}
          onChange={e => handleInputChange(e, 'password')}
          
          />

{/* 
          {
            action !== 'login' ? <>
             
              <InputField
          
              htmlFor='name'
              label='Primeiro nome:'
              value={formData.name}
              onChange={e => handleInputChange(e, 'name')}
              
              />
            </>: null
          }; */}

        </form>


        <div>
            <button 
              type='button'  
              name='_action' 
              value={action}
              onClick={() => {
                handleSubmit(formData.userName, formData.password);
              }}>
            { action === 'login' ? 'LOGIN' : 'SIGN UP'}
            </button>
        </div>


        <div>

          <button onClick={ () => setAction(action === 'login' ? 'login' : 'login')}>LOGIN</button>
          <button onClick={ () => setAction(action === 'login' ? 'register' : 'register')}>SIGN UP</button>

        </div>


      </div>

    </div>



  );
}