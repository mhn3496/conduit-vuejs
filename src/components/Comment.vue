<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href="" class="comment-author">{{ comment.author.username }}</a>
      <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["comment"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
