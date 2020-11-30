<template>
  <div>
    {{ num }}
    <digui :num="num - 1" v-if="num > 0" />
  </div>
</template>

<script>
export default {
  name: "digui",
  props: ["num"],
};
</script>

<style scoped>
div {
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
}
</style>