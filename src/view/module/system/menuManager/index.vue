<template>
  <!---->
    <div>
      <Card>
        <div class="control-box mb10">
          <Button-group>
            <Button type="primary">
              <Icon type="md-add" />
              添加
            </Button>
            <Button type="primary">
              <Icon type="md-create" />
              编辑
            </Button>
            <Button type="primary">
              <Icon type="md-trash" />
              删除
            </Button>
          </Button-group>
        </div>
        <div>
          <Row :gutter="16">
            <!--菜单栏-->
            <Col span="8">
              <Card>
                <Tree :data="menuData" ></Tree>
              </Card>
            </Col>
            <Col span="16">
              <!--新增菜单 form-->
              <Card class="mb10">
                <Form ref="menuForm" :model="formItem" :label-width="80">
                  <FormItem label="路径编码" prop="menuCode">
                    <Input v-model="formItem.menuCode" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem label="标题" prop="menuName">
                    <Input v-model="formItem.menuName" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem label="父节点" prop="menuName">
                    <Input v-model="formItem.menuName" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem label="图标">
                    <Input v-model="formItem.icon" placeholder="请输入内容">
                      <Icon size="22" :type="formItem.icon" slot="prepend"/>
                      <Poptip width="600" slot="append" placement="bottom">
                        <Button icon="ios-search"></Button>
                        <div slot="content">
                          <ul class="icons">
                            <li class="icons-item" :title="item" @click="onIconClick(item)" v-for="item in selectIcons">
                              <Icon :type="item" size="28"/>
                              <p>{{item}}</p>
                            </li>
                          </ul>
                        </div>
                      </Poptip>
                    </Input>
                  </FormItem>
                  <FormItem label="资源路径" prop="menuName">
                    <Input v-model="formItem.menuName" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem label="类型">
                    <RadioGroup v-model="formItem.status" type="button">
                      <Radio label="0">menu</Radio>
                      <Radio label="1">dirt</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="排序">
                    <InputNumber v-model="formItem.priority"></InputNumber>
                  </FormItem>

                  <FormItem label="描述">
                    <Input v-model="formItem.menuDesc" type="textarea" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem label="前端组件" prop="menuName">
                    <Input v-model="formItem.menuName" placeholder="请输入内容"></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary">保存</Button>
                    <Button style="margin-left: 8px">取消</Button>
                  </FormItem>
                </Form>
              </Card>
              <Card>
                <h4 class="mb10">按钮或资源</h4>
                <!-- 新增 按钮 -->
                <div class="search_box mb10">
                  <div class="search_input">
                    <span>关键字</span>
                    <Input v-model="value" placeholder="资源名称" />
                  </div>
                  <Button class="search_btn" type="primary" icon="ios-search">搜索</Button>
                  <Button class="add_btn" type="primary"  icon="md-add" @click="addBtn">添加</Button>
                </div>
                <Table border :columns="btnColumns" :data="btnData">
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="editBtn">编辑</Button>
                    <Button type="warning" size="small">删除</Button>
                  </template>
                </Table>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
      <Modal v-model="modalVisible"
             :title="modalTitle"
             width="40"
             >
        <div>
          <Form ref="form1" :model="formItem" :label-width="100">
            <FormItem label="资源编码" prop="name">
              <Input v-model="formItem.name" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="资源类型" prop="username">
              <Input v-model="formItem.username" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="资源名称" prop="mobile">
              <Input v-model="formItem.mobilePhone" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="资源地址" prop="departName">
              <Input v-model="formItem.departName" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="资源请求类型" prop="positionName">
              <Input v-model="formItem.positionName" placeholder="请输入内容"></Input>
            </FormItem>
          </Form>
          <div class="drawer-footer">
            <Button type="default" @click="handleReset">取消</Button>&nbsp;
            <Button type="primary" @click="handleSubmit" :loading="saving">保存</Button>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
  import icons from './icons'
  export default {
    name: 'index',
    data() {
      return {
        modalVisible: false,
        modalTitle: '',
        menuData: [
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
        selectIcons: icons,
        btnColumns: [
          {
            title: 'ID',
            key: 'id',
            width: 100,
          },
          {
            title: '资源编码',
            key: 'code',
            width: 150
          },
          {
            title: '资源类型',
            key: 'type',
            width: 150
          },
          {
            title: '资源名称',
            key: 'sourceName',
            width: 100
          },
          {
            title: '资源地址',
            key: 'address',
            width: 200
          },
          {
            title: '资源请求类型',
            key: 'status',
            width: 100
          },

          {
            title: '操作',
            slot: 'action',
            fixed: 'right',
            align: 'center',
            width: 130
          }
        ],
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
        formItem: {
          icon: 'md-document'
        }
      }
    },
    methods: {
      onIconClick (item) {
        this.formItem.icon = item
      },
      addBtn(){
        this.modalTitle = '创建'
        this.modalVisible = true
      },
      editBtn(){
        this.modalTitle = '编辑'
        this.modalVisible = true
      }
    }
  }
</script>

<style scoped lang="less">
  .mb10{
    margin-bottom: 10px
  }
  // 搜索
  .search_box {
    display: flex;
    .search_input {
      display: flex;
      align-items: center;
      span {
        flex: 0 0 50px;
        margin-right: 10px;
      }
    }
    .search_btn {
      margin: 0 10px;
    }
    .add_btn {
    }
  }
</style>
