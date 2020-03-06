<template>
    <div>
      <Card>
        <Tabs value="name1" @on-click="handleTabClick" :value="tabCurrent">
          <TabPane :label="item.name" :name="item.type" v-for="item in tabs">
             <!--新增操作-->
            <div class="control-box mb10">
              <Button-group>
                <Button type="primary" @click="handleAdd">
                  <Icon type="md-add" />
                  添加
                </Button>
                <Button type="primary" @click="handleEdit">
                  <Icon type="md-create" />
                  编辑
                </Button>
                <Button type="primary" @click="handleDel">
                  <Icon type="md-trash" />
                  删除
                </Button>
                <Button type="primary" @click="hanldePermission">
                  <Icon type="md-body" />
                  权限分配
                </Button>
                <Button type="primary" @click="handleConcat">
                  <Icon type="md-link" />
                  关联用户
                </Button>
              </Button-group>
            </div>
            <Row :gutter="16">
              <!--菜单-->
              <Col span="8">
                <Card>
                  <Tree :data="menuData[tabCurrent]" ></Tree>
                </Card>
              </Col>
              <!--新增-->
              <Col span="16">
                <Card>
                  <Form :model="formItem" :label-width="60">
                    <FormItem label="名称">
                      <Input v-model="formItem.input" placeholder="请输入" :disabled="!addBtn"></Input>
                    </FormItem>
                    <FormItem label="编码">
                      <Input v-model="formItem.input" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="描述">
                      <Input v-model="formItem.input" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem v-show="addBtn">
                      <Button type="primary">保存</Button>
                      <Button style="margin-left: 8px">取消</Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
      <Modal
        v-model="modalVisible"
        :title="modalTitle"
        :width="modalTitle=='关联用户'?'520':'90%'"
        footer-hide>
        <!--关联用户-->
        <Form :model="formItem" :label-width="100" v-if="modalTitle=='关联用户'">
          <FormItem label="群主|领导">
            <Select v-model="leaders" multiple>
              <Option v-for="item in leaderData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="组员|下属">
            <Select v-model="members" multiple>
              <Option v-for="item in memberData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary">保存</Button>
          </FormItem>
        </Form>
        <!--权限分配-->
        <div v-else>
          <Button class="mb10" type="primary">保存</Button>
          <Row :gutter="18">
            <Col span="6">
              <Card>
                <Tree :data="menuAll" show-checkbox></Tree>
              </Card>
            </Col>
            <Col span="18">
              <Card>
                <Table border :columns="btnTable" :data="btnData"></Table>
              </Card>
            </Col>
          </Row>
        </div>

      </Modal>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {
        formItem: {

        },
        modalVisible: false,
        modalTitle: '',
        tabCurrent: 'role',
        addBtn: false,
        leaderData: [
          {
            value: 'wangxiang',
            label: '王翔'
          },
          {
            value: 'wuqiao',
            label: '吴巧'
          }
        ],
        memberData: [
          {
            value: 'wangxiang',
            label: '王翔'
          },
          {
            value: 'wuqiao',
            label: '吴巧'
          }
        ],
        leaders: [],
        menuAll: [
          {
            title: '基础配置',
            expand: true,
            children: [
              {
                title: '用户管理'
              },
              {
                title: '菜单管理'
              }
            ]
          },
          {
            title: '通话管理',
            expand: true,
            children: [
              {
                title: '800呼账号分配'
              },
              {
                title: '通话记录'
              }
            ]
          }
        ],
        btnTable: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源编码',
            width: 150,
            align: 'center',
            key: 'code'
          },
          {
            title: '资源类型',
            width: 100,
            align: 'center',
            key: 'type'
          },
          {
            title: '资源名称',
            width: 150,
            align: 'center',
            key: 'sourceName'
          },
          {
            title: '资源地址',
            align: 'center',
            key: 'address'
          },
          {
            title: '资源请求类型',
            align: 'center',
            key: 'status'
          }
        ],
        btnSource: [
          {
            id:'57',
            code: 'callSysAccount:btn_distribute',
            type: 'button',
            name: '分配',
            address: '/admin/callSysAccount',
            status: 'PUT'
          }
        ],
        tabs: [
          {
            name: '角色类型',
            type: 'role'
          },
          {
            name: '部门类型',
            type: 'department'
          },
          {
            name: '审核类型',
            type: 'audit'
          }
        ],
        menuData:{
          role:  [{"id":1,"parentId":-1,"children":[],"title":"管理员","name":"管理员"},{"id":123,"parentId":-1,"children":[],"title":"城市销售","name":"城市销售"},{"id":124,"parentId":-1,"children":[],"title":"产业处","name":"产业处"},{"id":125,"parentId":-1,"children":[],"title":"核算","name":"核算"},{"id":126,"parentId":-1,"children":[],"title":"财税业务","name":"财税业务"},{"id":150,"parentId":-1,"children":[],"title":"总经理","name":"总经理"},{"id":156,"parentId":-1,"children":[],"title":"稽核部","name":"稽核部"},{"id":157,"parentId":-1,"children":[],"title":"招商主管","name":"招商主管"},{"id":162,"parentId":-1,"children":[],"title":"综管部","name":"综管部"},{"id":163,"parentId":-1,"children":[],"title":"瑟维斯","name":"瑟维斯"},{"id":167,"parentId":-1,"children":[],"title":"市场部","name":"市场部"},{"id":175,"parentId":-1,"children":[],"title":"财税主管","name":"财税主管"}],
          department: [{"id":20,"parentId":-1,"children":[{"id":21,"parentId":20,"children":[],"title":"总经办","name":"总经办"},{"id":22,"parentId":20,"children":[],"title":"核算部","name":"核算部"},{"id":23,"parentId":20,"children":[],"title":"政府关系部","name":"政府关系部"},{"id":24,"parentId":20,"children":[],"title":"财税业务部","name":"财税业务部"},{"id":25,"parentId":20,"children":[],"title":"网络部","name":"网络部"},{"id":27,"parentId":20,"children":[],"title":"市场部","name":"市场部"},{"id":28,"parentId":20,"children":[],"title":"稽核部","name":"稽核部"},{"id":29,"parentId":20,"children":[],"title":"综合管理部","name":"综合管理部"},{"id":120,"parentId":20,"children":[{"id":151,"parentId":120,"children":[{"id":26,"parentId":151,"children":[],"title":"武汉销售部","name":"武汉销售部"},{"id":31,"parentId":151,"children":[],"title":"北京销售部","name":"北京销售部"},{"id":32,"parentId":151,"children":[],"title":"深圳销售部","name":"深圳销售部"},{"id":164,"parentId":151,"children":[],"title":"瑟维斯","name":"瑟维斯"}],"title":"城市销售部","name":"城市销售部"}],"title":"城市业务部","name":"城市业务部"},{"id":121,"parentId":20,"children":[{"id":30,"parentId":121,"children":[],"title":"CY产业处","name":"CY产业处"},{"id":33,"parentId":121,"children":[],"title":"TS产业处","name":"TS产业处"},{"id":34,"parentId":121,"children":[],"title":"GX产业处","name":"GX产业处"},{"id":35,"parentId":121,"children":[],"title":"CI产业处","name":"CI产业处"},{"id":137,"parentId":121,"children":[],"title":"WG产业处","name":"WG产业处"},{"id":138,"parentId":121,"children":[],"title":"WN产业处","name":"WN产业处"},{"id":139,"parentId":121,"children":[],"title":"HI产业处","name":"HI产业处"},{"id":140,"parentId":121,"children":[],"title":"NI产业处","name":"NI产业处"},{"id":141,"parentId":121,"children":[],"title":"HD产业处","name":"HD产业处"},{"id":168,"parentId":121,"children":[],"title":"ZI产业处","name":"ZI产业处"},{"id":169,"parentId":121,"children":[],"title":"JI产业处","name":"JI产业处"}],"title":"产业处","name":"产业处"},{"id":158,"parentId":20,"children":[],"title":"企管中心","name":"企管中心"},{"id":172,"parentId":20,"children":[],"title":"本地核算部","name":"本地核算部"}],"title":"中兴瑞华集团","name":"中兴瑞华集团"}],
          audit: [{"id":127,"parentId":-1,"children":[],"title":"华中招商","name":"华中招商"},{"id":128,"parentId":-1,"children":[],"title":"华南招商","name":"华南招商"},{"id":129,"parentId":-1,"children":[],"title":"华北招商","name":"华北招商"},{"id":130,"parentId":-1,"children":[],"title":"核算部","name":"核算部"},{"id":131,"parentId":-1,"children":[],"title":"财税业务部","name":"财税业务部"},{"id":132,"parentId":-1,"children":[],"title":"CY产业处","name":"CY产业处"},{"id":133,"parentId":-1,"children":[],"title":"TS产业处","name":"TS产业处"},{"id":134,"parentId":-1,"children":[],"title":"GX产业处","name":"GX产业处"},{"id":135,"parentId":-1,"children":[],"title":"CI产业处","name":"CI产业处"},{"id":142,"parentId":-1,"children":[],"title":"WG产业处","name":"WG产业处"},{"id":143,"parentId":-1,"children":[],"title":"WN产业处","name":"WN产业处"},{"id":144,"parentId":-1,"children":[],"title":"HI产业处","name":"HI产业处"},{"id":145,"parentId":-1,"children":[],"title":"NI产业处","name":"NI产业处"},{"id":146,"parentId":-1,"children":[],"title":"HD产业处","name":"HD产业处"},{"id":165,"parentId":-1,"children":[],"title":"瑟维斯","name":"瑟维斯"},{"id":170,"parentId":-1,"children":[],"title":"ZI产业处","name":"ZI产业处"},{"id":171,"parentId":-1,"children":[],"title":"JI产业处","name":"JI产业处"}]
        },
        btnData: [
          {
            id: '57',
            code: 'callSysAccount:btn_distribute',
            type: 'button',
            sourceName: '分配',
            address: '/admin/callSysAccount',
            status: 'PUT'
          }
        ],
      }
    },
    methods: {
      handleTabClick(name) {
        this.tabCurrent = name
      },
      /*新增*/
      handleAdd() {
        this.addBtn = true
      },
      /*编辑*/
      handleEdit() {
        this.addBtn = true
      },
      /*删除*/
      handleDel() {
        this.$Modal.confirm({
          title: '提示',
          content: '此操作将永久删除, 是否继续?',
          onOk: () => {
            this.$Message.info('已经删除');
          }
        });
      },
      /*权限分配*/
      hanldePermission() {
        this.modalTitle = '权限分配'
        this.modalVisible = true
      },
      /*关联用户*/
      handleConcat() {
        this.modalTitle = '关联用户'
        this.modalVisible = true
      },
    }
  }
</script>

<style scoped lang="less">
  .mb10{
    margin-bottom: 10px
  }
</style>
