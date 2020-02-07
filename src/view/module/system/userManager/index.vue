<template>
  <div>
    <Card>
      <Form ref="searchForm"
            :model="pageInfo"
            inline
            :label-width="80">
        <FormItem label="姓名/账户" prop="userName">
          <Input type="text" v-model="pageInfo.name" placeholder="请输入姓名/账户"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSearch(1)">查询</Button>&nbsp;
          <Button @click="handleResetForm('searchForm')">重置</Button>
        </FormItem>
      </Form>

      <div class="search-con search-con-top">
        <ButtonGroup>
          <Button  type="primary"
                  @click="handleModal()">
            <span>添加</span>
          </Button>
        </ButtonGroup>
      </div>

      <Table border :columns="columns" :data="data" :loading="loading">
        <template slot="action" slot-scope="{ row }">
          <Button type="warning" @click="handleResetPwd(row)">重置密码</Button>&nbsp;
          <Button type="primary" @click="handleModal(row)">编辑</Button>&nbsp;
          <Button type="error" @click="handleDimission(row)">离职</Button>
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
           @on-cancel="handleReset">
      <div>
        <Form v-show="current == 'form1'" ref="form1" :model="formItem" :rules="formItemRules" :label-width="100">
          <FormItem label="姓名" prop="name">
            <Input v-model="formItem.name" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="账户" prop="username">
            <Input v-model="formItem.username" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="电话" prop="mobile">
            <Input v-model="formItem.mobilePhone" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="性别">
            <RadioGroup v-model="formItem.sex" type="button">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="部门" prop="departName">
            <Input v-model="formItem.departName" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="职位" prop="positionName">
            <Input v-model="formItem.positionName" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="地址">
            <Input v-model="formItem.address" type="textarea" placeholder="请输入内容"></Input>
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
  import {getUsers, updateUser, addUser} from '@/api/user'

  export default {
    name: 'userManager',
    data() {

      const validateEn = (rule, value, callback) => {
        let reg = /^[_a-zA-Z0-9]+$/
        let reg2 = /^.{4,18}$/;
        // 长度为6到18个字符
        if (value === '') {
          callback(new Error('登录名不能为空'))
        } else if (value !== '' && !reg.test(value)) {
          callback(new Error('只允许字母、数字、下划线'))
        } else if (value !== '' && !reg2.test(value)) {
          callback(new Error('长度6到18个字符'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        let reg2 = /^.{6,18}$/;
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value !== this.formItem.password) {
          callback(new Error('两次输入密码不一致'))
        } else if (value !== '' && !reg2.test(value)) {
          callback(new Error('长度6到18个字符'))
        } else {
          callback()
        }
      }

      const validatePassConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formItem.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        let reg = /^1\d{10}$/
        if (value !== '' && !reg.test(value)) {
          callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        saving: false,
        modalVisible: false,
        modalTitle: '',
        current: 'form1',
        forms: [
          'form1',
          'form2',
          'form3',
          'form4'
        ],
        selectMenus: [],
        selectRoles: [],
        pageInfo: {
          page: 1,
          pageSize: 10,
          sort: "createTime",
          order: "desc"
        },
        formItemRules: {
          userType: [
            {required: true, message: '用户类型不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {required: true, validator: validateEn, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          passwordConfirm: [
            {required: true, validator: validatePassConfirm, trigger: 'blur'}
          ],
          username: [
            {required: true, message: '账户不能为空', trigger: 'blur'}
          ],
          email: [
            {required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ]
          ,
          mobile: [
            {validator: validateMobile, trigger: 'blur'}
          ]
        },
        formItem: {
          username: '',
          name: '',
          sex: '男',
          password: '',
          address: '',
          departName: '请选择',
          departId: '',
          positionId: '',
          positionName: '',
          id: ''
        },
        columns: [
          {
            type: 'selection',
            width: 60,
          },
          {
            title: '姓名',
            key: 'name',
            width: 200
          },
          {
            title: '账号',
            key: 'username',
            width: 150
          },
          {
            title: '性别',
            key: 'sex',
            width: 200
          },
          {
            title: '手机号',
            key: 'mobilePhone',
          },
          {
            title: '操作',
            slot: 'action',
            width: 250
          }
        ],
        columns2: [
          {
            title: '菜单',
            key: 'menuName',
            minWidth: '250px',
          },
          {
            title: '操作',
            type: 'template',
            template: 'operation',
            minWidth: '150px'
          }
        ],
        data: []
      }
    },
    methods: {
      handleModal(data) {
        if (data) {
          this.formItem = Object.assign({}, this.formItem, data)
        }
        if (this.current === this.forms[0]) {
          this.modalTitle = data ? '编辑用户 - ' + data.name : '添加用户'
          this.modalVisible = true
        }
      },
      handleResetPwd() {
        this.$Message.success('重置密码成功')
      },
      handleDimission() {
        this.$Message.success('离职成功')
      },
      handleResetForm(form) {
        this.$refs[form].resetFields()
      },
      handleReset() {
        const newData = {
          username: '',
          name: '',
          sex: '男',
          password: '',
          address: '',
          departName: '请选择',
          departId: '',
          positionId: '',
          positionName: '',
          id: ''
        }
        this.formItem = newData
        //重置验证
        this.forms.map(form => {
          this.handleResetForm(form)
        })
        this.current = this.forms[0]
        this.formItem.grantMenus = []
        this.formItem.grantActions = []
        this.modalVisible = false
        this.saving = false
      },
      handleSubmit() {
        if (this.current === this.forms[0]) {
          this.$refs[this.current].validate((valid) => {
            if (valid) {
              this.saving = true
              if (this.formItem.userId) {
                updateUser(this.formItem).then(res => {
                  if (res.code === 0) {
                    this.$Message.success('保存成功')
                    this.handleReset()
                  }
                  this.handleSearch()
                }).finally(() => {
                  this.saving = false
                })
              } else {
                addUser(this.formItem).then(res => {
                  if (res.code === 0) {
                    this.$Message.success('保存成功')
                    this.handleReset()
                  }
                  this.handleSearch()
                }).finally(() => {
                  this.saving = false
                })
              }
            }
          })
        }

      },
      handleSearch(page) {
        if (page) {
          this.pageInfo.page = page
        }
        this.loading = true
        getUsers(this.pageInfo).then(res => {
          this.data = res.data.rows
          this.pageInfo.total = parseInt(res.data.total)
        }).finally(() => {
          this.loading = false
        })
      },

      handlePage(current) {
        this.pageInfo.page = current
        this.handleSearch()
      },
      handlePageSize(size) {
        this.pageInfo.limit = size
        this.handleSearch()
      },
    },
    mounted: function () {
      this.handleSearch()
    }
  }
</script>
