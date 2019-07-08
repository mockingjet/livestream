<template>
  <v-container>
    <div>{{ people + " watching"}}</div>
    <video id="liveVideo" style="margin:0% 25%; width:50%; height:500px;border:1px solid #607d8b" autoplay></video>
    <v-btn
      block
      outline
      class="blue-grey"
      @click="openCamera"
    >{{ cameraOpening ? "Close Live Streaming" : "Start Live Streaming"}}</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cameraOpening: false,
    medium: null,
    people: 0
  }),
  mounted() {
    this.$socket.on("people", data => {
      this.people = data;
    });
  },
  methods: {
    openCamera() {
      if (this.cameraOpening) {
        this.cameraOpening = false;
        this.medium.getTracks().forEach(track => {
          track.stop();
        });
      } else {
        this.cameraOpening = true;
        var constraints = { video: true };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => this.startLive(stream))
          .catch(err => console.log("media error: " + err));
      }
    },
    startLive(stream) {
      this.medium = stream;
      let video = document.querySelector("#liveVideo");
      video.srcObject = stream;
      setInterval(() => {
        this.$socket.emit("live", this.getFrame());
      }, 1000 / 30);
    },
    getFrame() {
      let canvas = document.createElement("canvas");
      let video = document.querySelector("#liveVideo");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const data = canvas.toDataURL("image/webp");
      return data;
    }
  }
};
</script>

<style>
</style>
