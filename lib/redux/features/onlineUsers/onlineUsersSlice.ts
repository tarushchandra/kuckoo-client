import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  [userId: string]: { isOnline: boolean; lastSeenAt: string | null };
}

const initialState: initialStateType = {};

export const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      if (action.payload.type === "USER_IS_ONLINE") {
        state[action.payload.userId] = { isOnline: true, lastSeenAt: null };
      }

      if (action.payload.type === "USER_IS_OFFLINE") {
        state[action.payload.userId] = {
          isOnline: false,
          lastSeenAt: action.payload.lastSeenAt,
        };
      }
    },
    addOnlineUser: (state, action) => {
      // const { userId, data } = action.payload;
      // state[userId] = data;

      const { userId, isOnline } = action.payload;
      state[userId] = {
        isOnline,
        lastSeenAt: isOnline ? null : action.payload.lastSeenAt,
      };
    },
  },
});

export const { setOnlineStatus, addOnlineUser } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
