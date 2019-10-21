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
                @click="editArticle"
              >
                Edit Article
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
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    getArticle() {
      console.log("getting Article");
      var slug = this.$router.app._route.params.slug;
      this.$store.dispatch("article/getArticlebyId", slug);
    },
    editArticle() {
      this.$store
        .dispatch("article/editArticle", {
          slug: this.articleSlug,
          title: this.articleTitle,
          description: this.articleDescription,
          body: this.articleBody,
          tagList: this.articleTags ? this.articleTags.split(",") : []
        })
        .then(() => {
          console.log("update request sent");
          var obj = this.$store.getters["article/currentArticle"];
          router.push({ name: "article", params: { slug: obj.slug } });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  },
  created() {
    this.getArticle();
  },
  data: function() {
    return {
      articleTitle: this.$store.getters["article/currentArticle"].title,
      articleDescription: this.$store.getters["article/currentArticle"]
        .description,
      articleBody: this.$store.getters["article/currentArticle"].body,
      articleTags: this.$store.getters["article/currentArticle"].tags,
      articleSlug: this.$store.getters["article/currentArticle"].slug
    };
  }
};
</script>
