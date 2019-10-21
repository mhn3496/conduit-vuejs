import { api } from "../api";

export default {
  namespaced: true,
  state: {
    currentArticle: {},
    feed: [],
    count: 0
  },
  getters: {
    feed(state) {
      return state.feed;
    },
    count(state) {
      return state.count;
    },
    currentArticle(state) {
      return state.currentArticle;
    },
    articleTitle(state) {
      return state.currentArticle.title;
    },
    articleBody(state) {
      return state.currentArticle.body;
    },
    articleAuthorName(state) {
      return state.currentArticle.author.username;
    },
    articleAuthorImage(state) {
      return state.currentArticle.author.image;
    },
    articleAuthorIsFollowed(state) {
      return state.currentArticle.author.following;
    },
    articleTagsList(state) {
      return state.currentArticle.tagList;
    },
    articleCreationDate(state) {
      return state.currentArticle.createdAt;
    }
  },
  mutations: {
    setCurrentArticle(state, _article) {
      state.currentArticle = _article;
    },
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    }
  },

  actions: {
    async getGlobalFeed({ commit }, payload) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;
        route += tag ? `tag= ${tag}&` : "";
        route += author ? `author= ${author}&` : "";
        route += favourited ? `favourited= ${favourited}&` : "";
        route += page ? `?offset=${(page - 1) * 10} & limit = 10` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data, response.articlesCount);
    },

    async getUserFeed({ commit }, payload) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `offset=${(page - 1) * 10} & limit=10` : "";
      }

      const response = await api.get(route);
      commit("setArticles", response.data);
    },

    async getArticlebyId({ commit }, id) {
      let route = "/articles/";
      route += id;
      const response = await api.get(route);
      console.log(response.data.article);
      commit("setCurrentArticle", response.data.article);
    },
    async postArticle({ commit }, { title, description, body, tagList }) {
      try {
        console.log(title);
        console.log(description);
        console.log(body);
        console.log(tagList);
        const response = await api.post("/articles", {
          article: {
            title,
            description,
            body,
            tagList
          }
        });

        if (response.data) {
          commit("setCurrentArticle", response.data.article);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    async editArticle({ commit }, { slug, title, description, body, tagList }) {
      try {
        console.log(title);
        console.log(description);
        console.log(body);
        console.log(tagList);
        let route = "/articles/";
        route += slug;
        const response = await api.put(route, {
          article: {
            title,
            description,
            body,
            tagList
          }
        });

        if (response.data) {
          commit("setCurrentArticle", response.data.article);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
