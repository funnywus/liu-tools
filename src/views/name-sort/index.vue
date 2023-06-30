<template>
  <div class="app-container">
    <h3>名字排序</h3>
    <el-input
        style="width: 400px;"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10}"
        placeholder="请输入内容,格式:以空格为分割拆分"
        v-model="txt"
        @input="input()"
    >
    </el-input>
  </div>
</template>

<script>
import {splitNameList} from "@/utils";

export default {
  name: "name-sort",
  data() {
    return {
      txt: ''
    }
  },
  created() {

  },
  methods: {
    input() {
      const nameList = splitNameList(this.txt);
      nameList.sort((a, b) => {
        return a.localeCompare(b);
      });
      this.nameList = nameList
      this.tableList = nameList.map(item => {

      })
    }
  }
}
</script>

<style scoped>

</style>
