<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          {{$t("Organizations")}}
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-org
        >
          {{$t("AddOrg")}}
        </b-button>
        <!-- <b-button variant="danger" @click="removeSectionBtn('organizations')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-org" class="mt-2">
          <organization
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
            @orgSaved="toggleCollapse"
          ></organization>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Organization"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div  class="d-flex align-items-baseline" v-for="org in this.draglist" v-bind:key="org._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="flex-fill my-3 p-2">
              <b-row :id="'collap'+org._id+'header'" :ref="'collap'+org._id+'header'">
                <b-col sm="1">
                  <b-card class="bg-light w-100" no-body >
                    <div class="mx-auto my-2">
                      <b-icon icon="globe" class="h4 m-0"></b-icon>
                    </div>
                  </b-card>
                </b-col>
                <b-col sm="10" class="d-flex flex-column text-start">
                  <div class="font-weight-bold h5">{{ org.OrgTitle }} </div>
                  <div class="h6 text-primary">{{ org.OrgJob }}</div>
                  <div class="p">{{org.OrgFrom}} {{org.OrgTo}}</div>
                  <div class="mt-3" style="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur porro, neque corrupti similique enim distinctio tempora fugiat velit in suscipit laboriosam dignissimos voluptatibus ipsa repellat ipsum sunt consectetur officia?</div>
                </b-col>
                <b-col sm="1">
                  <b-button v-b-toggle="'collap' + org._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon></span
                    ><span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon
                    ></span>
                  </b-button>
                </b-col>
              </b-row>
              <b-collapse :id="'collap' + org._id">
                  <b-button v-b-toggle="'collap' + org._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon></span
                    ><span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon
                    ></span> 
                  </b-button>
                <organization
                  v-bind:CvId="cvOne.cvId"
                  v-bind:organization="org"
                  v-bind:type="'item'"
                ></organization>
              </b-collapse>
            </b-card>
            <b-button @click="DeleteOrgSubmit(org._id)" variant="link"><b-icon icon='trash'></b-icon></b-button>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import organization from "../items/cv/organization.vue";
import draggable from "vuedraggable";
export default {
  components: {
    organization,
    draggable,
  },
  computed: {
    ...mapGetters(["organizations", "cvOne"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    organizations() {
      console.log(" organizations getter changes");
      this.draglist = this.organizations;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteOrg", "changeOrg","removeSection"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteOrgSubmit: function (orgid) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete everything."+orgid, {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if(value){
            this.deleteOrg(orgid);
            //this.deleteExp(expid);
          }
        })
    },
    DragEnd() {
      this.drag = false;
      this.changeOrg({ list: this.draglist, CvId: this.cvOne.cvId });
      console.log("drag end");
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
    toggleCollapse() {
      this.$root.$emit("bv::toggle::collapse", "collapse-org");
    },
  },
  mounted() {
    this.draglist = this.organizations;
    this.$root.$on('bv::collapse::state', (collapseId,state) => {
      var itemId=collapseId+'header';
      var items=this.$refs[itemId];
      if(items){
        if(state){
          items[0].classList.add('d-none')
        }
        else{
          items[0].classList.remove('d-none')
        }
      }
    })
  },
};
</script>

<style></style>
