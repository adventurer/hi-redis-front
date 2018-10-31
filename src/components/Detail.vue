<template>
    <div class="col-8">
        <div class="sticky-top" >

        <div class="alert alert-secondary" role="alert">{{searchkey}}</div>
          <textarea class="form-control mb-3" name="example-textarea-input" rows="30" placeholder="Content.." :value="val" readonly ref="result"></textarea>
          <div class="form-group">
              <div class="input-group">
                  <span class="input-group-prepend" id="basic-addon1">
                      <span class="input-group-text">COMMAND</span>
                  </span>
                  <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" @keyup.enter="cmd()" @keyup.up="prev()" @keyup.down="next()" ref="cmd">
              </div>
          </div>
        </div>
    </div>
    
</template>

<script>
var hisIndex = 0

export default {
  name: "Detail",
  components: {},
  props: {
    searchkey: String,
    val:String
  },
  methods:{
    cmd:function () {
      let that = this
      this.GLOBAL.HISTORY.push(that.$refs.cmd.value)
      hisIndex = this.GLOBAL.HISTORY.length-1
      // eslint-disable-next-line
      $.ajax({
          type: "POST",
          url: "http://"+that.GLOBAL.HOST+"/cmd",
          data: {cmd:that.$refs.cmd.value},
          dataType: "text",
          success: function(data){
            
            that.$refs.result.value = data
            that.$refs.cmd.value = ""
          },
          error:function (data) {
            that.$refs.result.value = data

          }
      });

    },
    prev:function() {
      this.$refs.cmd.value = this.GLOBAL.HISTORY[hisIndex]
      if (hisIndex<=0) {
        return
      }
      hisIndex = hisIndex-1
    },
    next:function() {
      this.$refs.cmd.value = this.GLOBAL.HISTORY[hisIndex]
      if (hisIndex>=this.GLOBAL.HISTORY.length-1) {
        return
      }
      hisIndex = hisIndex+1
    }
  }
};
</script>

<style>
#detail {
  position: fixed;
  top: 120px;
}
</style>
