<template>
  <div class="row clearfix">
        <List v-on:changeFunc="changeFunc($event)"/>
        <Detail  v-bind:searchkey="detail.searchkey" v-bind:val="detail.val" />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Detail from "@/components/Detail.vue";
import axios from "axios"



export default {
  name: "Data",
  components: {
    List,
    Detail
  },
  data() {
    return {
      detail: {
        searchkey: "init-key",
        val: "init-val"
      },
    };
  },
  created: function() {},
  mounted(){
  },
  watch: {

  },
  methods:{
    changeFunc:function (msg) {
      this.detail.searchkey = msg
      let that = this

      $.ajax({
          type: "POST",
          url: "http://"+this.GLOBAL.HOST+"/get",
          data: {key:msg},
          dataType: "text",
          success: function(data){
              console.log(data)
              that.detail.val = data
          },
          error:function (data) {
              that.detail.val = data
          }
      });


    }
  }
}
</script>
