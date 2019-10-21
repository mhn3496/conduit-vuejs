import { api } from "../api";

export default {
  namespaced: true,
  state: {
    Article: {},
    commentsOnArticle: [],
    dummy: {}
  },
  getters: {
    commentsOnArticle(state) {
      return state.commentsOnArticle;
    }
  },
  mutations: {
    setComments(state, comments) {
      state.commentsOnArticle = comments;
    },
    setDummy(state, payload) {
      state.dummy = payload;
    }
  },

  actions: {
    async getComments({ commit }, { slug }) {
      let route = "/articles/";
      route += slug;
      route += "/comments";
      const response = await api.get(route);
      commit("setComments", response.data.comments);
    },

    async postComment({ commit }, { slug, body }) {
      let route = "/articles/";
      route += slug;
      route += "/comments";
      console.log("route");
      console.log(route);
      console.log(body);
      const response = await api.post(route, {
        comment: {
          body
        }
      });
      console.log("posted Comment");
      console.log(response.data);
      commit("setDummy", {});
    },
    async editComment({ commit }, { slug, body }) {
      let route = "/articles/";
      route += slug;
      route += "/comments";
      await api.put(route, {
        comment: {
          body
        }
      });
      commit("setDummy", {});
    },
    async deleteComment({ commit }, { slug, id }) {
      let route = "/articles/";
      route += slug;
      route += "/comments";
      await api.delete(route, {
        comment: {
          id
        }
      });
      commit("setDummy", {});
    }
  }
};
