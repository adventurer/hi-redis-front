<template>
<div>
  <div class="row clearfix mt-5">
    <div class="col-12">
      <div class="card">
        <div class="form-group">
          <div class="form-label">显示/隐藏图表</div>
          <div class="selectgroup selectgroup-pills">
            <a href="javascript:;"><input type="checkbox" v-on:click="visible_network_in()" ref="network_in" checked>
            <label for="">流量入</label></a>
            
            <a href="javascript:;"><input type="checkbox" v-on:click="visible_network_out()" ref="network_out" checked>
            <label for="">流量出</label></a>

            <a href="javascript:;"><input type="checkbox" v-on:click="visible_hit_radio()" ref="hit_radio" checked>
            <label for="">命中率</label></a>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div class="row clearfix">
    <Card v-bind:msg="sysInfo.cpu_sys"  title="cpu_sys" />
    <Card v-bind:msg="sysInfo.cpu_user" title="cpu_user" />
    <Card v-bind:msg="sysInfo.total_commands_processed" title="commands/1S" />
  </div>
  <div class="row clearfix">
      <div class="col-12">
        <NetworkIn v-show="show_network_in" v-bind:msg="sysInfo.network_in_data" v-bind:title="sysInfo.network_in_title" />
      </div>
  </div>
  <div class="row clearfix">
      <div class="col-12">
        <NetworkOut v-show="show_network_out" v-bind:msg="sysInfo.network_out_data" v-bind:title="sysInfo.network_out_title" />
      </div>
  </div>
  <div class="row clearfix">
      <div class="col-12">
        <HitRatio v-show="show_hit_radio" v-bind:msg="sysInfo.hit_ratio_data" v-bind:title="sysInfo.hit_ratio_title" />
      </div>
  </div>
</div>
  
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import NetworkIn from "@/components/NetworkIn.vue";
import NetworkOut from "@/components/NetworkOut.vue";
import HitRatio from "@/components/HitRatio.vue";

export default {
  // sysInfo : {'cpu_sys':'init','cpu_user':'init','command_cnt':'init'},
  name: "home",
  components: {
    Card,
    NetworkIn,
    NetworkOut,
    HitRatio
  },
  data() {
    return {
      sysInfo: {
        cpu_sys: "init",
        cpu_user: "init",
        total_commands_processed: "init",
        network_in_title: Array(30).fill(null).map((_, h) => h),
        network_in_data: Array(30).fill(null).map((_, h) => h),
        network_out_title: Array(30).fill(null).map((_, h) => h),
        network_out_data: Array(30).fill(null).map((_, h) => h),
        hit_ratio_title: Array(30).fill(null).map((_, h) => h),
        hit_ratio_data: Array(30).fill(null).map((_, h) => h)
      },
      show_network_in: "ok",
      show_network_out: "ok",
      show_hit_radio: "ok"
    };
  },
  created: function() {},
  mounted() {
    var father = this;
    var conn = new WebSocket("ws://" + this.GLOBAL.HOST + "/echo");
    conn.onclose = function(evt) {
      console.log(evt);
    };
    conn.onmessage = function(evt) {
      // console.log(evt);
      // console.log(father);

      var json = evt.data.toString();
      var s = JSON.parse(json);
      let result = eval("(" + s + ")");
      // console.log(s);

      var x = function(key, ret) {
        if (father.sysInfo[key] == "init") {
          father.sysInfo[key] = ret;
          return ret;
        } else {
          let c = (ret - father.sysInfo[key]).toFixed(2);
          father.sysInfo[key] = ret;
          return c;
        }
      };
      father.sysInfo.cpu_sys = x("cpu_sys_tmp", result.CPU.used_cpu_sys);
      father.sysInfo.cpu_user = x("cpu_user_tmp", result.CPU.used_cpu_user);
      father.sysInfo.total_commands_processed = x(
        "total_commands_processed_tmp",
        result.Stats.total_commands_processed
      );

      var time = new Date();

      // networkin chart
      father.sysInfo.network_in_title.shift();
      father.sysInfo.network_in_title.push(
        time.getMinutes().toString() + ":" + time.getSeconds().toString()
      );
      father.sysInfo.network_in_data.shift();
      father.sysInfo.network_in_data.push(
        result.Stats.instantaneous_input_kbps
      );
      // console.log(father.sysInfo.network_in_title)

      // networkout chart
      father.sysInfo.network_out_title.shift();
      father.sysInfo.network_out_title.push(
        time.getMinutes().toString() + ":" + time.getSeconds().toString()
      );
      father.sysInfo.network_out_data.shift();
      father.sysInfo.network_out_data.push(
        result.Stats.instantaneous_output_kbps
      );

      // hit ratio
      father.sysInfo.hit_ratio_title.shift();
      father.sysInfo.hit_ratio_title.push(
        time.getMinutes().toString() + ":" + time.getSeconds().toString()
      );
      father.sysInfo.hit_ratio_data.shift();
      father.sysInfo.hit_ratio_data.push(
        (Number(result.Stats.keyspace_hits)/(Number(result.Stats.keyspace_hits)+Number(result.Stats.keyspace_misses))*100).toFixed(2)
      );
      console.log(result)
    };
  },
  methods: {
    visible_network_in: function() {
      if (this.$refs.network_in.checked) {
        this.show_network_in = "ok";
      } else {
        this.show_network_in = "";
      }
    },
    visible_network_out: function() {
      if (this.$refs.network_out.checked) {
        this.show_network_out = "ok";
      } else {
        this.show_network_out = "";
      }
    },
    visible_hit_radio: function() {
      if (this.$refs.hit_radio.checked) {
        this.show_hit_radio = "ok";
      } else {
        this.show_hit_radio = "";
      }
    }
  },
  watch: {}
};
</script>
