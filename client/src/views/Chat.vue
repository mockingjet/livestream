<template>
  <v-container>
    {{ people }}
    <div class="chatroom">
      <v-layout
        v-for="(message,i) in messages"
        :key="i"
        row
        :class="message.name==name ? 'blue--text': message.name=='System' ? 'red--text':''"
      >
        <v-flex class="pa-1" shrink>{{message.name}} :</v-flex>
        <v-flex class="pa-1" grow>{{message.text}}</v-flex>
      </v-layout>
    </div>
    <v-text-field
      v-model="message"
      append-icon="send"
      @click:append="sendMessage"
      box
      label="Message"
      type="text"
    ></v-text-field>
    <v-dialog v-model="open" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Your Nickname</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="name" append-icon="send" @click:append="setName"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    people: 0,
    open: true,
    name: "",
    message: "",
    messages: [
      {
        name: "System",
        text: "Welcome!"
      }
    ]
  }),
  mounted() {
    let img = document.querySelector("#liveImage");
    this.$socket.on("people", data => {
      this.people = data;
    });
    this.$socket.on("join", data=>{
      this.messages.push(data)
    })
    this.$socket.on("chat", data => {
      this.messages.push(data);
    });
  },
  methods: {
    sendMessage() {
      this.$socket.emit("chat", {
        name: this.name,
        text: this.message
      });
      this.message = "";
    },
    setName() {
      if (this.name.length === 0 || !this.name.trim()) {
        alert("please enter your name");
      } else {
        this.open = false;
        this.$socket.emit("join",this.name)
      }
    }
  }
};
</script>

<style>
.chatroom {
  border: 1px solid green;
  height: 550px;
}
</style>
