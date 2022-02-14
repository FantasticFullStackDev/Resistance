import { createSlice } from '@reduxjs/toolkit';
import av1 from '../public/images/av1.png';
import av2 from '../public/images/av2.png';
import av3 from '../public/images/av3.png';
import av4 from '../public/images/av4.png';
import av5 from '../public/images/av5.png';
import av6 from '../public/images/av6.png';
import av7 from '../public/images/av7.png';
import av8 from '../public/images/av8.png';
import av9 from '../public/images/av9.png';
import av10 from '../public/images/av10.png';

const initialState = {
    _members: [        
        {
            img: av1,
            name: 'Lane',
            badge: false 
        },
        {
            img: av2,
            name: 'Wade',
            badge: false 
        },
        {
            img: av3,
            name: 'Soham',
            badge: 'spy' 
        },
        {
            img: av4,
            name: 'Richard',
            badge: false 
        },
        {
            img: av5,
            name: 'Marian',
            badge: false 
        },
        {
            img: av6,
            name: 'Cooper',
            badge: 'spy' 
        },
        {
            img: av7,
            name: 'Clarie',
            badge: false 
        },
        {
            img: av8,
            name: 'Branded',
            badge: 'spy' 
        },
        {
            img: av9,
            name: 'Philips',
            badge: false 
        },
        {
            img: av10,
            name: 'Nathan',
            badge: false 
        },
    ]
};

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        _setMembers: (state, action) => {
            state._members = action.payload;
        }
    }
});

export const { _setMembers } = membersSlice.actions;

export const _getMembers = (state) => state.members._members;

export default membersSlice.reducer;