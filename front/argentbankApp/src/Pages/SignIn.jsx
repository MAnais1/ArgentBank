import Input from "../components/Input";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice.jsx';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error, token} = useSelector((state) => state.auth);// Récupération du token depuis l'état Redux
  console.log("Token from Redux:", token); // Vérifie si le token est bien dans le store
  const navigate = useNavigate();// Hook pour la navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const rememberMe = document.getElementById('remember-me').checked;
    dispatch(login({ email, password }))
      .then((res) => {
        if (res.payload?.body?.token) {
          if (rememberMe) {
            localStorage.setItem('token', res.payload.body.token);
          } 
        }
      });
  };

  useEffect(() => {
    console.log("Token:", token); 
    // Si l'utilisateur est authentifié, redirige vers la page protégée
    if (token) {
      navigate('/user'); 
    }
  }, [token, navigate]); // Le hook s'active lorsque le token change
  
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <Input
            classDiv={`input-wrapper`}
            forLabel={`email`}
            typeInput={`email`}
            idInput={`email`}
            textLabel={`Email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            classDiv={`input-wrapper`}
            forLabel={`password`}
            typeInput={`password`}
            idInput={`password`}
            textLabel={`Password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            classDiv={`input-remember`}
            forLabel={`remember-me`}
            typeInput={`checkbox`}
            idInput={`remember-me`}
            textLabel={`Remember me`}
            
          />
          <button className="sign-in-button">Sign In</button>
          {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
