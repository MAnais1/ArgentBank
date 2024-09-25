import { useSelector, useDispatch } from 'react-redux';
import logo from "../assets/argentBankLogo.png";
import { Link } from 'react-router-dom'; // Utilisation de Link pour la navigation
import { useEffect } from 'react';
import { logout, fetchUserData } from '../store/authSlice'; // L'action pour récupérer les données utilisateur

function Header() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth); // Récupère le token et l'utilisateur dans le store

  const handleLogout = () => {
    dispatch(logout()); // Déconnexion en effaçant le token et l'utilisateur
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken && !token) {
      // Si un token est trouvé dans le stockage, mais qu'il n'est pas encore dans le store
      dispatch(fetchUserData(storedToken)); // Récupère les données utilisateur avec le token
    };
    console.log('Stored Token:', storedToken);
  }, [dispatch, token]);

  console.log("Token in Header:", token);
  console.log("User in Header:", user);
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user ? user.userName : 'User'} {/* Affiche le nom de l'utilisateur */}
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