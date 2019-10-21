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
            <span class="counter"></span>
          </button>
          <button
            v-if="authorIsUser"
            class="btn btn-sm btn-outline-secondary"
            @click="routeToArticleEdit"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Edit Article
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary" v-if="!authorIsUser">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="authorIsUser"
            @click="deleteArticle"
          >
            <i class="ion-heart"></i>
            &nbsp; Delete Article
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

          <button v-if="!authorIsUser" class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ articleAuthorName }}
            <span class="counter"></span>
          </button>
          <button
            v-if="authorIsUser"
            class="btn btn-sm btn-outline-secondary"
            @click="routeToArticleEdit"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Edit Article
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary" v-if="!authorIsUser">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="authorIsUser"
            @click="deleteArticle"
          >
            <i class="ion-heart"></i>
            &nbsp; Delete Article
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form v-if="username" class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="comment"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="userImage" class="comment-author-img" />
              <button @click="postComment" class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          >
          </Comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import router from "../router";
import Comment from "@/components/Comment.vue";

export default {
  components: {
    Comment
  },
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
    followAuthor() {},
    routeToArticleEdit() {
      var obj = this.$store.getters["article/currentArticle"];
      router.push({ name: "editor_edit", params: { slug: obj.slug } });
    },
    deleteArticle() {
      var obj = this.$store.getters["article/currentArticle"];
      this.$store.dispatch("article/deleteArticle", obj.slug);
      router.push({ name: "home" });
    },
    postComment() {
      var obj = this.$store.getters["article/currentArticle"];
      this.$store.dispatch("comments/postComment", {
        slug: obj.slug,
        body: this.comment
      });
      this.comment = "";
      this.$store.dispatch("comments/getComments", {
        slug: obj.slug
      });
      this.getComments();
    },
    getComments() {
      var obj = this.$store.getters["article/currentArticle"];
      this.$store.dispatch("comments/getComments", {
        slug: obj.slug
      });
      this.comments = this.$store.getters["comment/commentsOnArticle"];
    },
    fetchComments() {
      var slug = this.$router.app._route.params.slug;
      this.$store.dispatch("comments/getComments", {
        slug: slug
      });
    },
    fetchArticle() {
      var slug = this.$router.app._route.params.slug;
      this.$store.dispatch("article/getArticlebyId", slug);
    },
    fetchUser() {
      this.$store.dispatch("users/getUser");
    }

    //favouriteArticle(article_id) {}
  },
  created() {
    this.fetchArticle();
    this.fetchComments();
    this.fetchUser();
    //this.getComments();
  },
  computed: {
    article() {
      return this.$store.getters["article/currentArticle"];
    },

    articleTitle() {
      return this.$store.getters["article/currentArticle"].title;
    },
    articleBody() {
      return this.$store.getters["article/currentArticle"].body;
    },
    articleAuthorName() {
      return this.$store.getters["article/currentArticle"].author.username;
    },
    articleAuthorImage() {
      return this.$store.getters["article/currentArticle"].author.image;
    },
    articleAuthorIsFollowed() {
      return this.$store.getters["article/currentArticle"].author.following;
    },
    articleTagsList() {
      return this.$store.getters["article/currentArticle"].tagList;
    },
    articleCreationDate() {
      return this.$store.getters["article/currentArticle"].createdAt;
    },
    authorIsUser() {
      return (
        this.article.author.username == this.$store.getters["users/username"]
      );
    },
    comments() {
      return this.$store.getters["comments/commentsOnArticle"];
    },
    username() {
      var retObj = this.$store.getters["users/user"];
      if (retObj) {
        return retObj.username;
      }
      return null;
    },
    userImage() {
      var retObj = this.$store.getters["users/user"];
      if (retObj) {
        return retObj.image;
      }
      return null;
    }
  },

  data: function() {
    return {
      comment: ""
    };
  }
};
</script>
