<template>
    <div>
      <Card>
        <!-- 搜索 -->
        <div class="search_box mb10">
          <div class="search_input">
            <span>姓名/账户</span>
            <Input placeholder="请输入关键字" />
          </div>
          <Button class="search_btn" type="primary" icon="ios-search">搜索</Button>
          <Button class="add_btn" type="primary"  icon="md-add" @click="handleAdd">添加</Button>
        </div>
        <Table border :columns="btnColumns" :data="btnData">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit">编辑</Button>
            <Button type="warning" size="small">删除</Button>
          </template>
        </Table>
        <Page transfer :total="pageInfo.total" :current="pageInfo.page" :page-size="pageInfo.limit" show-elevator
              show-sizer
              show-total
              @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
      </Card>
      <Modal v-model="modalVisible"
             :title="modalTitle"
             width="40"
      >
        <div>
          <Form ref="form1" :model="formItem" :label-width="100">
            <FormItem label="编码" prop="name">
              <Input v-model="formItem.name" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="类型" prop="username">
              <Input v-model="formItem.username" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="描述" prop="mobile">
              <Input v-model="formItem.mobilePhone" placeholder="请输入内容"></Input>
            </FormItem>
          </Form>
          <div class="drawer-footer">
            <Button type="default">取消</Button>&nbsp;
            <Button type="primary">保存</Button>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {
        modalVisible: false,
        modalTitle: '',
        pageInfo: {
          page: 1,
          total: 10,
          pageSize: 10,
          sort: "createTime",
          order: "desc"
        },
        btnColumns: [
          {
            title: 'ID',
            key: 'id',
            width: 100,
          },
          {
            title: '编码',
            key: 'code',
            width: 150
          },
          {
            title: '类型名称',
            key: 'type',
            width: 150
          },
          {
            title: '描述',
            key: 'des',
          },
          {
            title: '最后时间',
            key: 'lastTime',
            width: 200
          },
          {
            title: '最后更新人',
            key: 'modifer',
            width: 100
          },
          {
            title: '最后更新主机',
            key: 'ip',
            width: 150
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center',
            width: 130
          }
        ],
        btnData: [
          {
            id: '57',
            code: 'role',
            type: '角色类型',
            des: '',
            lastTime: '2019-12-12',
            ip:'172.26.3.3',
            modifer: 'wl'
          }
        ],
        formItem: {}
      }
    },
    methods: {
      handleAdd(){
        this.modalTitle = "新增"
        this.modalVisible = true
      },
      handleEdit(){
        this.modalTitle = "编辑"
        this.modalVisible = true
      },
      handlePage(current) {
        this.pageInfo.page = current
        this.handleSearch()
      },
      handlePageSize(size) {
        this.pageInfo.limit = size
        this.handleSearch()
      },
    }
  }
</script>

<style scoped lang="less">
  .mb10{
    margin-bottom: 10px;
  }
  // 搜索
  .search_box {
    display: flex;
    .search_input {
      display: flex;
      align-items: center;
      span {
        flex: 0 0 70px;
        margin-right: 10px;
      }
    }
    .search_btn {
      margin: 0 10px;
    }
    .add_btn {
    }
  }
  /deep/.ivu-modal-footer{
    border-top:none
  }
</style>
