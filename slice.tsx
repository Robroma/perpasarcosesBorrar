import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Episodios } from '../types/episodios';

interface EpisodiosState {
  data: Episodios[];
  loading: boolean;
  error: string | null;
}

const initialState: EpisodiosState = {
  data: [],
  loading: true,
  error: null,
};

const episodiosSlice = createSlice({
  name: 'episodios',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Episodios[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setData, setLoading, setError } = episodiosSlice.actions;

export default episodiosSlice.reducer;

export const fetchEpisodios = (): AppThunk => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    dispatch(setData(data.results));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
