<template>
  <b-container class="my-4" fluid>
    <b-row class="my-2">
      <b-col sm="11">

      </b-col>
      <b-col sm="1">
        <b-button variant="primary" @click="completeRequestBtn" >Complete</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="4">
        <div class="d-flex flex-column">
          <b-card class="px-6">
            <b-row class="overflow-auto flex-column flex-nowrap p-2" style="height: 60vh">
              <b-badge
                class="p-3 h3 my-2 align-self-end"
                style="width:fit-content"
                v-for="message in ServReqOne.ReqChat.ChatMessages"
                v-bind:key="message._id"
              >
                {{message.ChMessageVal}}
              </b-badge>
            </b-row>
            <b-row class="">
              <div class="d-flex flex-fill m-3">
                <b-input v-model="reqMessageVal"></b-input>
                <b-button @click="saveReqMessageBtn()" variant="primary">send</b-button>
              </div>
            </b-row>
          </b-card>
          <b-card class="my-2">

          </b-card>
        </div>
      </b-col>
      <b-col sm="8">
        <b-card no-body class="row">
          <b-tabs card>
            <b-tab title="Resumes" active>
              <b-row>
                <b-col sm="6" v-for="item in ServReqOne.ReqCv" v-bind:key="item._id">
                  <div class="d-flex">
                    <div class="border rounded">
                      <img src="@/assets/images/document.jpg" />
                    </div>
                    <div class="d-flex flex-column align-items-start mx-4 mt-2">
                      <router-link
                        :to="{ name: 'cvOne', params: { requestId:$route.params.requestId,cvId: item._id } }"
                      >
                        <h5>{{item.CVName}}</h5>
                      </router-link>
                      <b-button variant="link" @click="exportCvBtn(item._id)" >export</b-button>
                      <b-button variant="link" @click="deleteCvBtn(item._id)" >delete</b-button>
                      </div>
                  </div>
                </b-col>
                <b-col sm="6">
                  <div class="d-flex" @click="createCvBtn()" style="cursor:pointer" >
                    <div class="border">
                      <img src="@/assets/images/document.jpg" />
                    </div>
                    <div class="mx-4 mt-2">
                      <h4 class="text-muted" >{{$t("newResume")}}</h4>
                      <p class="text-muted">{{$t("newResumeDesc")}}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Cover Letters">
              <b-row>
                <b-col sm="6" v-for="item in ServReqOne.ReqCl" v-bind:key="item._id">
                  <div class="d-flex">
                    <div class="border rounded">
                      <img src="@/assets/images/document.jpg" />
                    </div>
                    <div class="d-flex flex-column align-items-start mx-4 mt-2">
                      <router-link
                        :to="{ name: 'clOne', params: { requestId:$route.params.requestId,clId: item._id } }"
                      >
                        <h5>{{item.CLName}}</h5>
                      </router-link>
                      <b-button variant="link" @click="exportClBtn(item._id)" >export</b-button>
                      <b-button variant="link" @click="deleteClBtn(item._id)" >delete</b-button>
                      </div>
                  </div>
                </b-col>
                <b-col sm="6">
                  <div class="d-flex" @click="createClBtn()" style="cursor:pointer" >
                    <div class="border">
                      <img src="@/assets/images/document.jpg" />
                    </div>
                    <div class="mx-4 mt-2">
                      <h4 class="text-muted" >{{$t("newCoverLettter")}}</h4>
                      <p class="text-muted">{{$t("newCoverLetterDesc")}}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      reqMessageVal: "",
      
    };
  },
  computed: {
    ...mapGetters(["ServRequests", "ServReqOne", "Mentor"]),
  },
  methods: {
    ...mapActions([
      "addCvToServRequest",
      "removeCvFromServRequest",
      "exportCvToUser",
      "addClToServRequest",
      "removeClFromServRequest",
      "exportClToUser",
      "getServRequests",
      "getServRequestOne",
      "completeServRequest",
      "saveMessage",
    ]),
      saveReqMessageBtn() {
        var data = {
          msgFromI: "mentor",
          msgValueI: this.reqMessageVal,
          msgSenderIdI: this.Mentor._id,
        };
  
        this.saveMessage({ data, chatId: this.ServReqOne.ReqChat._id });
      },
    createClBtn(){
      this.addClToServRequest(this.$route.params.requestId);
    },
    deleteClBtn: function (clId) { 
this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete everything." + clId,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.removeClFromServRequest({
              reqId: this.$route.params.requestId,
              clId,
            });
            // this.deleteExp(expid);
          }
          //this.boxTwo = value;
        });
    },
    exportClBtn(clId){
      this.exportClToUser({
        reqId: this.$route.params.requestId,
        clId,
      })
    },
    createCvBtn() {
      this.addCvToServRequest(this.$route.params.requestId);
    },
    deleteCvBtn: function (cvId) {
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete everything." + cvId,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.removeCvFromServRequest({
              reqId: this.$route.params.requestId,
              cvId,
            });
            // this.deleteExp(expid);
          }
          //this.boxTwo = value;
        });
    },
    exportCvBtn:function(cvId){
      //
      this.exportCvToUser({
        reqId: this.$route.params.requestId,
        cvId,
      })
    },
    completeRequestBtn:function(){
      // finishServRequest
            this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to complete this service request" ,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.completeServRequest({
              reqId: this.$route.params.requestId,
            });
            // this.deleteExp(expid);
          }
          //this.boxTwo = value;
        });
    }
    

  },
  async mounted() {
    if (this.ServRequests.length > 0) {
      await this.getServRequestOne(this.$route.params.requestId);
    } else {
      await this.getServRequests().then(() => {
        this.getServRequestOne(this.$route.params.requestId);
      });
    }

    //join
    // this.$socket.client.emit("join", { session: this.$route.params.requestId });
  },
};
</script>

<style>
</style>