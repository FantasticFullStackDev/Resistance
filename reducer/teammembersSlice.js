import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _teamMembers: []
};

export const teamMembersSlice = createSlice({
    name: 'teamMembers',
    initialState,
    reducers: {
        _setTeamMembers: (state, action) => {
            state._teamMembers = action.payload;
        }
    }
});

export const { _setTeamMembers } = teamMembersSlice.actions;

export const _getTeamMembers = (state) => state.teamMembers._teamMembers;

export default teamMembersSlice.reducer;