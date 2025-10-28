import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../types/roles';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: UserRole;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  role: UserRole.Guest,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: string; name: string; email: string; role: UserRole }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = UserRole.Guest;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 