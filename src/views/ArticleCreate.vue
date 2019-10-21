<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="articleTitle"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="articleDescription"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="articleBody"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="articleTags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../router";
export default {
  methods: {
    publishArticle() {
      this.$store
        .dispatch("article/postArticle", {
          title: this.articleTitle,
          description: this.articleDescription,
          body: this.articleBody,
          tagList: this.articleTags.split(",")
        })
        .then(() => {
          var obj = this.$store.getters["article/currentArticle"];
          router.push({ name: "article", params: { slug: obj.slug } });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  },
  data: function() {
    return {
      articleTitle: "",
      articleDescription: "",
      articleBody: "",
      articleTags: ""
    };
  }
};
</script>
