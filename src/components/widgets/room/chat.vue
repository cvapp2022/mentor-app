<template>
  <b-container fluid>
    <b-row class="overflow-auto flex-column flex-nowrap" style="height: 60vh">
      <b-badge
        v-for="item in this.Session.SessionMessage"
        v-bind:key="item._id"
        class="p-3 h3 my-2"
        :class="{
          'align-self-end': item.MessageSender === 'mentor',
          'align-self-start': item.MessageSender === 'user',
        }"
        :variant="setMsgVariant(item.MessageSender)"
        style="width: fit-content"
      >
        {{ item.MessageValue }}
      </b-badge>
    </b-row>
    <b-row class="">
      <div class="d-flex m-3">
        <b-input v-model="msgsend"></b-input>
        <b-button variant="primary" @click="sendMsgBtn">send</b-button>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      roomId: "",
      msgsend: "",
    };
  },
  computed: {
    ...mapGetters(["Session", "Mentor"]),
  },
  sockets: {
    MESSAGE_SENT(data) {
      console.log("message sent", data);
    },
  },
  methods: {
    setMsgVariant(source) {
      if (source === "mentor") return "primary";
      else return "info";
    },
    sendMsgBtn() {
      var form = {
        msgFromI: "mentor",
        msgSenderIdI: this.Mentor._id,
        msgSessionIdI: this.roomId,
        msgValueI: this.msgsend,
      };
      var url =
        process.env.VUE_APP_BASEURL + "/Mn/session/" + this.roomId + "/message";
      axios.post(url, form);
      this.msgsend = "";
    },
  },
  mounted() {
    this.roomId = this.Session._id;
    this.$socket.client.emit("join", { session: this.roomId });
  },
};
</script>

<style>
</style>