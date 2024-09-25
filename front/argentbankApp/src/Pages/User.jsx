import AccountSection from "../components/AccountSection";
import H2 from "../components/H2";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, updateUserName } from "../store/authSlice"; //import des actions
import { useEffect, useState } from "react";
import Input from "../components/Input";

function User() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth); // Récupération des infos utilisateur depuis le store
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si on est en mode édition
  const [newUserName, setNewUserName] = useState(user ? user.userName : ""); // Stockage du nouveau username

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken && !token) {
      // Si un token est trouvé dans le stockage, mais qu'il n'est pas encore dans le store
      dispatch(fetchUserData(storedToken)); // Récupère les données utilisateur avec le token
    }
  }, [dispatch, token]);

  // Fonction pour basculer vers le mode édition
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(user.userName); // Pré-remplir le champ avec le username actuel
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveClick = async () => {
    if (newUserName !== user.userName) {
      try {
        await dispatch(updateUserName({ token, newUserName })).unwrap(); // Appel API pour mettre à jour le userName
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
                value={user.firstName}
                classInput={`input-edit`}
                readOnly
              />
              <Input
                classDiv={`input-wrapper`}
                forLabel={`lastname`}
                typeInput={`text`}
                idInput={`lastname`}
                textLabel={`Last Name`}
                value={user.lastName}
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
              {user ? `${user.firstName} ${user.lastName}` : "User"}
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
