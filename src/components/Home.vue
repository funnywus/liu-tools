<template>
  <div id="app">
    <h3>拆分名字</h3>
    <el-input
        style="width: 400px;"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10}"
        placeholder="请输入内容,格式:以空格为分割拆分"
        v-model="txt"
        @input="splitName()"
    >
    </el-input>
    <br/>
    <p>总人数: </p>
    <el-table :data="tableData" border
              style="width: 100%">
      <el-table-column
          label="#"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column v-for="(item, index) in nameMap.keys()" :key="index" prop="num"
                       width="300">
        <template slot="header">
          <p>
            {{ `${item}${nameMap.get(item).length}人)` }}
            <i style="color: #67C23A;cursor: pointer" class="iconfont el-icon-document-copy"
               @click="copy(nameMap.get(item))"></i>
            <el-button type="primary" size="mini" :loading="downloadLoading"
                       @click="downloadHandle(item)"
            >下载
            </el-button>
          </p>
        </template>
        <template slot-scope="{row}">
          {{ row[item] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {copyText, splitNameMap} from "@/utils";

export default {
  name: 'Home',
  data() {
    return {
      tableData: [],
      nameMap: new Map(),
      txt: ``,
      downloadLoading: false,
    }
  },
  created() {
    this.splitName();
  },
  methods: {
    splitName() {
      const {txt} = this;
      const nameMap = splitNameMap(txt)
      this.nameMap = nameMap;

      // 取最大数组长度
      let maxLen = 0;
      for (const [key, value] of nameMap) {
        console.log(value)
        const size = value.length;
        maxLen = Math.max(maxLen, size);
      }
      console.log(maxLen)
      const tableData = []
      for (let i = 0; i < maxLen; i++) {
        const item = {};
        for (const [key, value] of nameMap) {
          const first = value[i];
          if (first) {
            item[key] = first
          } else {
            item[key] = ''
          }
        }
        tableData.push(item);
      }
      // console.log(tableData)
      this.tableData = tableData
    },
    copy(nameList) {
      if (nameList && nameList.length > 0) {
        const txt = nameList.reduce((prev, curr, index) => {
          prev += curr;
          if (index !== nameList.length - 1) {
            prev += '\n'
          }
          return prev;
        }, '')
        copyText(txt)
        this.$message.success('复制成功')
      } else {
        this.$message.warning('无数据')
      }
    },
    /**
     * 导出excl
     */
    downloadHandle(key) {
      this.downloadLoading = true
      let dataList = [{
        name: 'aa'
      }]
      // if (key) {
      //   console.log('=========')
      //   console.log(key)
      //   const nameList = this.nameMap.get(key)
      //   console.log(nameList)
      //   if (!nameList ||nameList.length === 0) {
      //     this.$message.warning("数据为空")
      //     return;
      //   }
      //   dataList = nameList.map(item => {
      //     return {
      //       name: item
      //     }
      //   })
      // }

      const tHeader = ['key'];
      const filterVal = ['name']
      console.log(dataList)
      const data = this.formatJson(filterVal, dataList)
      import('@/utils/Export2Excel').then(async excel => {

        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: key,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    /**
     * 格式化下载数据
     * @param filterVal
     * @param jsonData
     * @returns {*}
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        let item = v[j]
        // const {resultId, comboId, payStyle} = v
        // if (j.toLowerCase().includes('time')) {
        //     return longToStr(item)
        // } else if(j.includes("comboId")) {
        //     const isSetMeal = resultId && comboId;
        //     return isSetMeal ? '是' : '否';
        // } else if (j === 'payStyle') {
        //     log.error(v)
        //     return PAY_STYLE_NAME[payStyle]
        // }
        return v[j]
      }))
    },
  }
}
</script>

<style>

</style>
