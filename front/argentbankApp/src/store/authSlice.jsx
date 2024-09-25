import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action pour l'authentification via fetch
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Utilisation de 'email' au lieu de 'username'
    });
    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to authenticate");
    }

    return data; // Retour des données utilisateur renvoyées par l'API
  }
);


//Action pour récupérer les données utilisateur
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (token) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user data');
  }
  console.log("User data fetched:", data.body);
  return data.body; // Retourne les données utilisateur
});

// Nouvelle action pour mettre à jour le userName
export const updateUserName = createAsyncThunk('auth/updateUserName', async ({ token, newUserName }) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName: newUserName }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update userName');
  }
  
  console.log("Updated user data:", data.body);
  return data.body; // Retourne les nouvelles données utilisateur
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');  // Supprime le token si l'utilisateur se déconnecte
      sessionStorage.removeItem('token');  // Supprime le token si l'utilisateur se déconnecte
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion du login
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.body.token;
        
        // Gère le stockage du token
        if (action.meta.arg.rememberMe) {
          localStorage.setItem('token', state.token);
        } else {
          sessionStorage.setItem('token', state.token);
        }
      })
      // Gestion de la récupération des données utilisateur
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Assigne les données utilisateur récupérées
        console.log("Redux state after fetching user data:", state.user);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Error fetching user data:", state.error);
      })
      // Gestion de la mise à jour du userName
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.user.userName = action.payload.userName; // Mise à jour du userName
        console.log("UserName updated:", state.user.userName);
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Error updating userName:", state.error);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
