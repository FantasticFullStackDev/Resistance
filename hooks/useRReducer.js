export const initialState = {
    "debug": true,
    "dark_mode": false,
    "pusher": null,
    "channel": null,
    "game_id": "",
    "game_code": "",
    "total_coin": 0,
    "role_choice": true,
    "total_players": 5,
    "joined_players": [],
    "pusher_cluster": "us2",
    "pusher_key": "c114c4c1eb8d4dee31b6",
    "pusher_auth_url": "https://web-resistance.irlgames.app/api/v1/pusher/auth",
    "user_api": "https://web-universal.irlgames.app/api/v1",
    "game_api": "https://web-resistance.irlgames.app/api/v1"
};

export const AppReducer = (state, action) => {
    switch (action.type) {
        case "init_stored": {
            return action.value
        }
        case "add_number": {
            return {
                ...state,
                number: action.value + state.number,
            };
        }
        case "ADD_TO_TEAM": {
            const team_config =  {
                "player_id": state.team_config.player_id,
                "team_member": state.team_config.team_member,
                "members": [...state.team_config.members,...action.payload]
            }
            console.log("ADD TO TEAM",team_config);
            return {
                ...state,
                team_config:team_config
            };
        }
        case "update": {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
};