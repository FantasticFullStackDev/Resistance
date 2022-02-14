import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './membersSlice';
import teamMembersReducer from './teammembersSlice';
import gameStateReducer from './gamestateSlice';

export const store = configureStore({
  reducer: {
    members: membersReducer,
    teamMembers: teamMembersReducer,
    gameState: gameStateReducer
  },
});