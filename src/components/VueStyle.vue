<script>
export default {
  name: 'VueStyle',
  render(createElement) {
    return createElement('style', this.$slots.default); // array of children
  },
};
</script>
