<template>
  <v-app>
    <v-toolbar app color="primary">
      <v-btn @click="$router.push('/')">HOME</v-btn>
      <v-btn @click="$router.push('/live')">LIVE</v-btn>
      <v-btn @click="$router.push('/watch')">Watch</v-btn>
      <v-btn @click="$router.push('/chat')">CHAT</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">SOCKET.IO DEMO</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
