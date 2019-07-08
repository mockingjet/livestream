<template>
  <v-container>
    <div>{{ people + " watching"}}</div>
    <img id="liveImage" style="margin:0% 25%; width:50%; height:500px"/>
  </v-container>
</template>

<script>
export default {
    data: () => ({
    people: 0
  }),
  mounted() {
    let img = document.querySelector("#liveImage");
    this.$socket.on("people", data => {
      this.people = data;
    });
    this.$socket.on("watch", data => {
      img.src = data
    });
  }
};
</script>

<style>
</style>
