import AccountSection from "../components/AccountSection";
import H2 from "../components/H2";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, updateUserName } from "../store/authSlice"; //import des actions
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

function User() {
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth); // Récupération des infos utilisateur depuis le store
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si on est en mode édition
  const [newUserName, setNewUserName] = useState(
    profile ? profile.userName : ""
  ); // Stockage du nouveau username

  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token") || token;

  // Utilisation de useEffect pour récupérer les données utilisateur uniquement lorsque le composant est monté
  useEffect(() => {
    if (storedToken && !profile) {
      // Récupère les données utilisateur uniquement si elles ne sont pas déjà dans le state
      dispatch(fetchUserData(storedToken));
    }
  }, [dispatch, storedToken, profile]); // Cette dépendance permet de ne pas rappeler la fonction si user est déjà dans le state
  // Fonction pour basculer vers le mode édition
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(profile.userName); // Pré-remplir le champ avec le username actuel
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveClick = async () => {
    if (newUserName !== profile.userName) {
      try {
        await dispatch(
          updateUserName({ token: storedToken, newUserName })
        ).unwrap(); // Appel API pour mettre à jour le userName
        console.log("Nouveau userName sauvegardé :", newUserName);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du userName :", error);
      }
    }
    setIsEditing(false); // Quitter le mode édition après sauvegarde
  };

  // Fonction pour annuler la modification
  const handleCancelClick = () => {
    setIsEditing(false); // Quitter le mode édition sans sauvegarder
  };
  const navigate = useNavigate(); // Hook pour la redirection
  useEffect(() => {
    if (!storedToken) {
      navigate("/sign-in");
    }
  }, [storedToken, navigate]);
  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Edit Your Information</h1>
            <form className="div-edit">
              <Input
                classDiv={`input-wrapper`}
                forLabel={`username`}
                typeInput={`text`}
                idInput={`username`}
                textLabel={`User Name`}
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                classInput={`input-edit`}
              />
              <Input
                classDiv={`input-wrapper`}
                forLabel={`firstname`}
                typeInput={`text`}
                idInput={`firstname`}
                textLabel={`First Name`}
                value={profile.firstName}
                classInput={`input-edit`}
                readOnly
              />
              <Input
                classDiv={`input-wrapper`}
                forLabel={`lastname`}
                typeInput={`text`}
                idInput={`lastname`}
                textLabel={`Last Name`}
                value={profile.lastName}
                classInput={`input-edit`}
                readOnly
              />
              <div>
                <button
                  type="button"
                  className="save-button"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1>
              Welcome back
              <br />
              {profile ? `${profile.firstName} ${profile.lastName}` : "User"}
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </div>
        )}
      </div>
      <H2 textH2={`Accounts`} />
      <AccountSection
        accountTitle={`Argent Bank Checking (x8349)`}
        accountAmont={`$2,082.79`}
        accountDescription={`Available Balance`}
      />
      <AccountSection
        accountTitle={`Argent Bank Savings (x6712)`}
        accountAmont={`$10,928.42`}
        accountDescription={`Available Balance`}
      />
      <AccountSection
        accountTitle={`Argent Bank Credit Card (x8349)`}
        accountAmont={`$184.30`}
        accountDescription={`Current Balance`}
      />
    </main>
  );
}
export default User;
