import { api, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    getUsername(state) {
      return state.user.username;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    getUser: async function({ commit }) {
      var jwToken = localStorage.getItem("jwt");
      if (jwToken) {
        setToken(jwToken);
        const user = await api.get("/user");
        console.log(user.data.user);
        if (user.data && user.data.user) {
          console.log(user.data.user);
          commit("setUser", user.data.user);
        }
      } else {
        commit("setUser", null);
      }
    },
    loginUser: async function({ commit }, { email, password }) {
      clearToken();
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });

        if (response.data.user) {
          setToken(response.data.user.token);
          localStorage.setItem("jwt", response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
