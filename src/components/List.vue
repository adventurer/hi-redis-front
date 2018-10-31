<template>
    <div class="col-4">
      <div class="card">
        <div class="form-group">
          <div class="form-group">
              <label class="form-label">select DB</label>
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Select for a int number..." ref="select">
                  <span class="input-group-append"><button class="btn btn-primary" type="button" @click="selectDB()">Select!</button></span>
              </div>
          </div>
          <div class="input-icon">
              <input class="form-control" placeholder="enter to serarch,max show 3000 items" type="text" ref="search" @keyup.enter="searchData()">
              <span class="input-icon-addon"><i class="fe fe-search"></i></span>
          </div>
         
          <div class="row">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-vcenter table-hover">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>TTL</th>
                                <th>Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="v in list">
                                <td>
                                  <template v-if="v.Type === 'string'">
                                    <span class="tag tag-green">{{v.Type}}</span>
                                  </template>
                                  <template v-else-if="v.Type === 'set'">
                                    <span class="tag tag-orange">{{v.Type}}</span>
                                  </template>
                                  <template v-else-if="v.Type === 'hash'">
                                    <span class="tag tag-purple">{{v.Type}}</span>
                                  </template>
                                  <template v-else>
                                    <span class="tag tag-blue">{{v.Type}}</span>
                                  </template>
                                </td>
                                <td>
                                  <span class="tag tag-gray">{{v.Ttl}}</span>
                                </td>
                                <td><input type="text" class="form-control" name="example-text-input" placeholder="Text.." @click="getData(v.Val)" :value="v.Val" readonly></td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "List",
  components: {
  },
  props: {
		searchkey: String,
		val: String
	},
  data(){
    return{
      list:[]
    }
  },
  created: function() {},
  mounted(){
    let that = this
    axios.get('http://'+this.GLOBAL.HOST+'/data?key=')
    .then(function (response) {
      that.list = response.data
      console.log(that)
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  watch: {

  },
  methods:{
    getData:function(v) {
      this.$emit("changeFunc",v)
    },
    searchData:function () {
      let search = this.$refs.search.value
      let that = this
      let url = 'http://'+this.GLOBAL.HOST+'/data?key='+search
      axios.get(url)
      .then(function (response) {
        that.list = response.data
      })
      .catch(function (error) {
        console.log(error);
      });




    },
    showText:function(text, numSub){
      if(text == null){
      return "";
      }
      if(text.length > numSub){
      return text.substring(0, numSub - 1) + "...";
      }
      return text;
    },
    selectDB:function () {
      let that = this
      // eslint-disable-next-line
      $.ajax({
          type: "POST",
          url: "http://"+that.GLOBAL.HOST+"/cmd",
          data: {cmd:"select "+that.$refs.select.value},
          dataType: "text",
          success: function(data){
            console.log(that)
            console.log(data)
            that.searchData()

          },
          error:function (data) {
            console.log(data)
          }
      });
    }
  }
}
</script>
