import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExampleData = createAsyncThunk('api/fetchExampleData', async () => {
  // Burada gerçek bir API çağrısı yapılabilir
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Simüle veri
  return { message: 'API çağrısı başarılı!' };
});

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExampleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExampleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export default apiSlice.reducer; 