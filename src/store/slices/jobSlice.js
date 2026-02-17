import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    currentJob: null,
    loading: false,
    error: null,
    total: 0,
    page: 0,
    limit: 10,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setJobs, clearCurrentJob, clearError, setPage } = jobSlice.actions;
export default jobSlice.reducer;