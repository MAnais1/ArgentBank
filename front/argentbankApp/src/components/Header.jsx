import { useSelector, useDispatch } from 'react-redux';
import logo from "../assets/argentBankLogo.png";
import { Link } from 'react-router-dom'; // Utilisation de Link pour la navigation
import {useEffect } from "react";
import { logout, fetchUserData } from '../store/authSlice'; // L'action pour récupérer les données utilisateur
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth); // Récupère le token et l'utilisateur dans le store
  const navigate = useNavigate(); // Hook pour la redirection

  const handleLogout = () => {
    dispatch(logout()); // Déconnexion en effaçant le token et l'utilisateur
    navigate("/sign-in");
  };


    const storedToken = localStorage.getItem('token')|| sessionStorage.getItem("token") || token;
    

   // Utilisation de useEffect pour récupérer les données utilisateur uniquement lorsque le composant est monté
   useEffect(() => {
    if (storedToken && !profile) {  // Récupère les données utilisateur uniquement si elles ne sont pas déjà dans le state
      dispatch(fetchUserData(storedToken)); 
    }
  }, [dispatch, storedToken, profile]);  // Cette dépendance permet de ne pas rappeler la fonction si user est déjà dans le state

  console.log("Token in Header:", token);
  console.log("profile in Header:", profile);
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {storedToken ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {profile ? profile.userName : 'User'} {/* Affiche le nom de l'utilisateur */}
            </Link>
            <span className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-sign-in"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;