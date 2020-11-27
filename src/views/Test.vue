<template></template>

<script>
export default {
  data() {
    return {
      categorylist: [],
    };
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      let mycategory = new Set();

      res.data.data.forEach((element) => {
        if (!mycategory.has(element.name)) {
          mycategory.add(element.name);
          this.categorylist.push(element);
        }
      });
      // console.log(mycategory);
      console.log(this.categorylist);
    });
  },
};
</script>

<style>
</style>