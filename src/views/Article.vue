<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ articleTitle }}</h1>

        <div class="article-meta">
          <a href=""><img :src="articleAuthorImage"/></a>
          <div class="info">
            <a href="" class="author">{{ articleAuthorName }}</a>
            <span class="date">{{ formatDate(articleCreationDate) }}</span>
          </div>
          <button v-if="!authorIsUser" class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ articleAuthorName }}
            <span class="counter">(10)</span>
          </button>
          <button
            v-if="authorIsUser"
            class="btn btn-sm btn-outline-secondary"
            @click="routeToArticleEdit"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Edit Article
            <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          {{ article.body }}
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img :src="article.author.image"/></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ formatDate(articleBody.createdAt) }}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article.author.username }}
            <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                {{ articleBody }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import router from "../router";
export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    getArticle() {
      console.log("getting Article");
      var slug = this.$router.app._route.params.slug;
      this.$store.dispatch("article/getArticlebyId", slug);
    },
    followAuthor() {},
    routeToArticleEdit() {
      var obj = this.$store.getters["article/currentArticle"];
      router.push({ name: "editor_edit", params: { slug: obj.slug } });
    }
    //favouriteArticle(article_id) {}
  },
  created() {
    this.getArticle();
  },
  computed: {
    article() {
      return this.$store.getters["article/currentArticle"];
    },
    articleTitle() {
      return this.$store.getters["article/articleTitle"];
    },
    articleBody() {
      return this.$store.getters["article/articleBody"];
    },
    articleAuthorName() {
      return this.$store.getters["article/articleAuthorName"];
    },
    articleAuthorImage() {
      return this.$store.getters["article/articleAuthorImage"];
    },
    articleAuthorIsFollowed() {
      return this.$store.getters["article/articleAuthorIsFollowed"];
    },
    articleTagsList() {
      return this.$store.getters["article/articleTagsList"];
    },
    articleCreationDate() {
      return this.$store.getters["article/articleCreationDate"];
    },
    authorIsUser() {
      return (
        this.article.author.username == this.$store.getters["users/username"]
      );
    }
  },

  data: function() {
    return {};
  }
};
</script>
