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
    <p>总人数(不含英文): {{ nameMap.get('总人数') && nameMap.get('总人数')[0] }}</p>
    <el-button type="primary" size="mini"
               @click="downloadHandle()"
    >下载所有
    </el-button>
    <el-table
        :header-row-class-name="tableHeaderRow"
        v-if="tableData && tableData.length > 0"
        :data="tableData" border>
      <el-table-column
          label="#"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column v-for="(item, index) in nameMap.keys()" :key="index" prop="num"
                       v-if="!['总人数'].includes(item)"
                       width="220">
        <template slot="header">
          <p v-if="item === 'allNameSortList'">
            {{ `名字按字母升序排序(${nameMap.get(item).length}人)` }}
            <i style="color: #67C23A;cursor: pointer" class="iconfont el-icon-document-copy"
               @click="copy(nameMap.get(item))"></i>
            <el-button type="primary" size="mini" :loading="downloadLoading"
                       style="margin-left: 6px;"
                       @click="downloadHandle(item)"
            >下载
            </el-button>
          </p>
          <p v-else>
            {{ `${item}字数(${nameMap.get(item).length}人)` }}
            <i style="color: #67C23A;cursor: pointer" class="iconfont el-icon-document-copy"
               @click="copy(nameMap.get(item))"></i>
            <el-button type="primary" size="mini" :loading="downloadLoading"
                       style="margin-left: 6px;"
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
      tableHeaderRow: {
        a: 1
      }
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
      this.tableHeaderRow = {}

      this.$nextTick(() => {
        this.tableHeaderRow = {
          a: 1
        }
      })
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
      let tHeader = []
      if (key) {
        console.log('=========')
        console.log(key)
        const nameList = this.nameMap.get(key)
        console.log(nameList)
        if (!nameList || nameList.length === 0) {
          this.$message.warning("数据为空")
          return;
        }
        dataList = nameList.map(item => {
          return {
            [key]: item
          }
        })
        tHeader = [key];
      } else {
        dataList = this.tableData
        tHeader = [...this.nameMap.keys()].filter(item => item !== '总人数');
      }
      const filterVal = tHeader;

      const data = this.formatJson(filterVal, dataList)
      import('@/utils/Export2Excel').then(async excel => {

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
