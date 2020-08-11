<template>
  <d2-container>
    <d2-crud
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners">
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary"  @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>
    </d2-crud>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud' // 上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api' // 查询添加修改删除的http请求接口
export default {
  name: 'index',
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
  data () {
    return {}
  },
  methods: {
    getCrudOptions () { return crudOptions(this) },
    pageRequest (query) { return GetList(query) }, // 数据请求
    addRequest (row) { return AddObj(row) }, // 添加请求
    updateRequest (row) { return UpdateObj(row) }, // 修改请求
    delRequest (row) { return DelObj(row.id) }// 删除请求
    // 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
  }
}
</script>

<style scoped>

</style>
