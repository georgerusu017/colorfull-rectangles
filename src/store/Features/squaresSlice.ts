import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Square } from '../../Models/Square.model';
import { RootState } from '../store';

type InitialState = {
  squaresList: Square[];
  selectedSquare: Square | null;
};

const initialState: InitialState = {
  squaresList: [],
  selectedSquare: null,
};

const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    addSquare(
      state,
      action: PayloadAction<{ red: string; green: string; blue: string }>
    ) {
      const square = {
        ...action.payload,
        id: crypto.randomUUID(),
        number: state.squaresList.length + 1,
        date: new Date(),
      };
      state.squaresList.push(square);
    },
    setSelectedSquare(state, action) {
      state.selectedSquare = action.payload;
    },
    updateSelectedSquare(state, action) {
      const newSquare = { ...state.selectedSquare, ...action.payload };

      state.selectedSquare = newSquare;
      const index = state.squaresList.findIndex(
        (square) => square.id === newSquare.id
      );
      state.squaresList[index] = newSquare;
    },
  },
});

export const { addSquare, setSelectedSquare, updateSelectedSquare } =
  squaresSlice.actions;
export default squaresSlice.reducer;

export const squaresListItems = (root: RootState): Square[] =>
  root.squaresReducer.squaresList;

export const selectedSquareBox = (root: RootState): Square | null =>
  root.squaresReducer.selectedSquare;

export const squaresListCount = (root: RootState): number =>
  root.squaresReducer.squaresList.length;
