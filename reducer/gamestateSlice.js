import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   _gameState: 'role'
}

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        _setGameState: (state, action) => {
            state._gameState = action.payload;
        }
    }
});

export const { _setGameState } = gameStateSlice.actions;

export const _getGameState = (state) => state.gameState._gameState;

export default gameStateSlice.reducer;