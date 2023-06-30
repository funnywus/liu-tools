<template>
  <div>
    <h3>工具</h3>
    <el-table :data="tableData" border
              style="width: 100%">
      <el-table-column
          label="#"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column prop="url"
                       label="地址"
                       width="220">
        <template slot-scope="{row}">
          <el-link @click="toHref(row)" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: '拆分名字',
          path: '/split-name'
        }
      ],
    }
  },
  created() {
  },
  methods: {
    toHref(row) {
      const routeUrl = this.$router.resolve({
        path: row.path,
      });

      window.open(routeUrl.href, "_blank");
    },
  }
}
</script>

<style>

</style>
