import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
  if (!token) {
    return <Navigate to="/sign-in" />;
  }


  return children; // Affiche les enfants si l'utilisateur est connecté
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, // children doit être un React node et est requis
  };
  
export default PrivateRoute;