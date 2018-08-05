<script>
import { actions, store } from "../store";
import io from "socket.io-client";

export default {
  vuex: {
    actions: actions,
    store: store
  },
  data() {
    return {
      content: "",
      socket: ""
    };
  },
  methods: {
    onKeyup(e) {
        
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let id = this.$store.state.currentSessionId;
        this.socket.emit("my other event", { content1: this.content, id: id });
        this.sendMessage(this.content);
        this.content = "";
      }
    //   debugger;
      if(e.ctrlKey&&e.keyCode==46){
         this.clear_content();
      }
    }
  },
  created() {
    this.socket = io("http://192.168.191.1:80");
    this.socket.on("news", data => {
      // debugger;
      console.log(data);
      this.sendMessage2(data.data);
      document.querySelector("audio").play();
    });
  }
};
</script>



<template>
<div class="text"  >
    <audio v-show="false"    src="./../../dist/sound/water.mp3" controls="controls">
Your browser does not support the audio element.
</audio>
 
    <textarea placeholder="按 Ctrl + Enter 发送 按 Ctrl +Delete清除信息" v-model="content" @keyup="onKeyup"></textarea>
 
</div>
</template>
 
<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>