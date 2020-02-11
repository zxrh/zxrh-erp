<template>
  <div id="potential_clients">
    <!-- 搜索栏 -->
    <div class="searchBar">
      <div class="searchBarLeft">
        <span class="keyword">关键字</span>
        <Input placeholder="企业名称/工单号" class="search-input" />

        <span class="coState">企业状态</span>
        <Select v-model="state" class="stateSelect">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <span class="cuLevel">客户级别</span>
        <Select v-model="level" class="levelSelect">
          <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <span class="department">部门</span>
        <Select v-model="department" class="departSelect">
          <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="searchBarRight">
        <Button class="btn" type="primary" icon="ios-search">搜索</Button>
        <Button class="btn" type="primary">添加</Button>
        <Button class="btn" type="primary">返回资源池</Button>
        <Button class="btn" type="primary">分配</Button>
      </div>


    </div>
    <!-- 排序栏 -->
    <div class="orderBar">
      <RadioGroup type="button">
        <Radio label="large">昨天</Radio>
        <Radio label="default">本周</Radio>
        <Radio label="small">本月</Radio>
      </RadioGroup>

      <div class="orderGroup">
        <div class="follow" @click="orderFollow"><span>按跟进时间</span>&emsp;<i :class="ifFollow?'ordered':''">⇧</i></div>
        <div class="import" @click="orderImport"><span>按导入时间</span>&emsp;<i :class="ifImport?'ordered':''">⇧</i></div>
      </div>

      <div>
        <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="按时间搜索" style="width: 200px"></DatePicker>
      </div>
    </div>
    <!-- tabs -->
    <div class="tabs">

      <Tabs value="name1">
        <TabPane label="我的意向客户" name="name1">
          <Table border :columns="columns1" :data="data1">
            <template slot="action">
              <Button type="text" size="small" @click="orderModel = true">下单</Button>
              <Button type="text" size="small" @click="editModel = true">编辑</Button>
              <Button type="text" size="small" @click="followModel = true">跟进记录</Button>
              <Button type="text" size="small" @click="visitModel = true">拜访</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="下属的意向客户" name="name2">标签二的内容</TabPane>
        <TabPane label="昨日未跟进列表" name="name3">标签三的内容</TabPane>
      </Tabs>
      <Modal v-model="orderModel" title="下订单" :loading="loading" @on-ok="asyncOK" :mask-closable='false'>
        <Form :model="formLeft" label-position="left" :label-width="100">
          <FormItem label="公司名称">
            <span>凤尾草中</span>
            </FormItem>
          <FormItem label="产品类型">
            <Select v-model="orderForm.select1">
                <Option value="hys">惠优税</Option>
                <Option value="hlg">惠灵工</Option>
            </Select>
          </FormItem>
          <FormItem label="产品选择">
            <Select v-model="orderForm.select2">
                <Option value="rhx">入户型税筹</Option>
                <Option value="mzx">门征型税筹</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" long size="large" @click="todd">确定</Button>
        </div>
      </Modal>

      <Modal v-model="editModel" title="编辑" :loading="loading" @on-ok="asyncOK" :mask-closable='false'>
        <Form :model="formLeft" label-position="left" :label-width="100">
          <FormItem label="公司名称">
            <Input v-model="editForm.input1" />
          </FormItem>
          <FormItem label="联系人">
            <Input v-model="editForm.input2" />
          </FormItem>
          <FormItem label="电话号码">
            <Input v-model="editForm.input3" />
          </FormItem>
          <FormItem label="跟进内容">
            <Input v-model="editForm.textarea1" type="textarea" />
          </FormItem>
          <FormItem label="下次跟进时间">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请输入计划拜访时间" />
          </FormItem>
          <FormItem label="意向客户">
            <RadioGroup v-model="editForm.radio">
              <Radio label="yes">是</Radio>
              <Radio label="no">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="editForm.textarea2" type="textarea" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" long size="large">提交</Button>
        </div>

      </Modal>

      <Modal v-model="followModel" title="跟进记录" :loading="loading" @on-ok="asyncOK" :mask-closable='false'>
        <div class="conversation">
          <p>2019-12-15 20:20:20</p>
          <p>第一次通话</p>
        </div>
        <div class="conversation">
          <p>2019-12-15 20:20:20</p>
          <p>第二次通话</p>
        </div>
        <div slot="footer">
          <Button type="primary" long size="large">确定</Button>
        </div>
      </Modal>

      <Modal v-model="visitModel" title="拜访" :loading="loading" @on-ok="asyncOK" :mask-closable='false'>
        <div class="visition">
          <div class="visitionTitle">公司名称</div>
          <div class="visitionCon">小米科技</div>
        </div>
        <div class="visition">
          <div class="visitionTitle">联系人</div>
          <div class="visitionCon">张总</div>
        </div>
        <div class="visition">
          <div class="visitionTitle">电话号码</div>
          <div class="visitionCon">15978556325</div>
        </div>
        <div class="visition">
          <div class="visitionTitle">计划拜访时间</div>
          <div class="visitionCon">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请输入计划拜访时间" />
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" long size="large">提交</Button>
        </div>

      </Modal>




    </div>

    
  </div>
</template>

<script>
  
  export default {
    name: "potentialClients",
    data() {
      return {
        state: '',
        level: '',
        department: '',
        stateList: [{ //企业状态
            value: '全部',
            label: '全部'
          },
          {
            value: '未标注',
            label: '未标注'
          },
          {
            value: '有效',
            label: '有效'
          },
          {
            value: '无效',
            label: '无效'
          }
        ],
        levelList: [ //客户级别
          {
            value: ' 全部',
            label: '全部'
          },
          {
            value: 'A',
            label: 'A'
          },
          {
            value: 'B',
            label: 'B'
          },
          {
            value: 'C',
            label: 'C'
          },
          {
            value: 'D',
            label: 'D'
          },
          {
            value: '未标注',
            label: '未标注'
          }
        ],
        departList: [ //部门
          {
            value: ' 全部',
            label: '全部'
          },
          {
            value: '武汉销售部',
            label: '武汉销售部'
          },
          {
            value: '北京销售部',
            label: '北京销售部'
          },
          {
            value: '深圳销售部',
            label: '深圳销售部'
          }
        ],
        ifFollow: false,
        ifImport: false,
        columns1: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            width: 70
          },
          {
            title: '客户级别',
            key: 'level',
            align: 'center',
            width: 90
          },
          {
            title: '公司名称',
            key: 'coName',
            align: 'center',
            width: 350
          },
          {
            title: '联系人',
            key: 'contacts',
            align: 'center',
            width: 90
          },
          {
            title: '联系电话',
            key: 'tel',
            align: 'center',
            width: 200
          },
          {
            title: '招商部门',
            key: 'invest',
            align: 'center',
            width: 90
          },
          {
            title: '标识',
            key: 'identify',
            align: 'center',
            width: 70
          },
          {
            title: '来源',
            key: 'sourse',
            align: 'center',
            width: 100
          },
          {
            title: '跟进时间',
            key: 'followTime',
            align: 'center',
            width: 110
          },
          {
            title: '跟进内容',
            key: 'followContent',
            align: 'center',
            width: 100
          },
          {
            title: '下次跟进时间',
            key: 'nextFollowTime',
            align: 'center',
            width: 110
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center',
            width: 100
          },
          {
            title: '负责人',
            key: 'head',
            align: 'center',
            width: 90
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center',
            width: 230
          }
        ],
        data1: [{
            status: '有效',
            level: "A",
            coName: "凯蓝筋斗云",
            contacts: "凯总",
            tel: "15698745652",
            invest: "武汉销售部",
            identify: "落地页",
            sourse: "百度推广",
            followTime: "2019-10-10 12:20:20",
            followContent: "第三次跟进",
            nextFollowTime: "2019-10-10 12:20:20",
            remarks: "微信号:hgg123惠优税有意向",
            head: "汤纪文",
          },
          {
            status: '有效',
            level: "B",
            coName: "在一起",
            contacts: "小小小",
            tel: "15896541256",
            invest: "北京销售部",
            identify: "落地页",
            sourse: "百度推广",
            followTime: "2019-10-10 12:20:20",
            followContent: "第二次跟进",
            nextFollowTime: "2019-10-10 12:20:20",
            remarks: "微槈向",
            head: "小白",
          }, {
            status: '无效',
            level: "C",
            coName: "红米",
            contacts: "李总",
            tel: "15698845652",
            invest: "深圳销售部",
            identify: "落地页",
            sourse: "百度推广",
            followTime: "2019-10-10 12:20:20",
            followContent: "第一次跟进",
            nextFollowTime: "2019-10-10 12:20:20",
            remarks: "林向",
            head: "小张",
          }
        ],
        orderModel: false, //下单弹出层显隐
        editModel: false, //编辑弹出层显隐
        followModel: false, //跟进记录弹出层显隐
        visitModel: false, //拜访弹出层显隐
        orderForm:{
select1:'hys',
select2:'rhx'
        },
        editForm: {
          input1: '',
          input2: '',
          input3: '',
          textarea1: '',
          date: '',
          radio: 'yes',
          textarea2: ''
        },


      };
    },
    mounted() {
      this.state = this.stateList[0].value
      this.level = this.levelList[0].value
      this.department = this.departList[0].value
    },
    methods: {
      todd() {
        this.$router.push('/salesLead/placeOrder')
      },
      orderFollow() {
        this.ifFollow = !this.ifFollow;
        this.ifImport = false;
      },
      orderImport() {
        this.ifImport = !this.ifImport;
        this.ifFollow = false;
      }
    }
  };

</script>
<style lang="less" scoped>

.alignCenter {
  display: flex;
  align-items: center;
}
#potential_clients {
  /* 搜索栏 */
  .searchBar {
    .alignCenter;
    justify-content: space-between;
    .searchBarLeft {
      .alignCenter;
      .keyword,
      .coState,
      .cuLevel,
      .department {
        font-size: 14px;
        margin-right: 10px;
        font-weight: bold;
        white-space: nowrap;
      }

      .search-input {
        width: 150px;
        margin-right: 30px;
      }
      .stateSelect,
      .levelSelect,
      .departSelect {
        width: 100px;
        margin-right: 30px;
      }
    }
    .searchBarRight {
      .alignCenter;
      .btn {
        margin-left: 30px;
        font-size: 14px;
      }
    }
  }
  /* 排序栏 */
  .orderBar {
    .alignCenter;

    margin-top: 10px;
    .orderGroup {
      .alignCenter;
      margin-left: 50px;
      .follow,
      .import {
        cursor: pointer;
        display: flex;
        align-items: center;
        // display: inline-block;
        height: 32px;
        line-height: 30px;
        margin: 0;
        padding: 0 15px;
        font-size: 12px;
        color: #515a6e;
        border: 1px solid #dcdee2;
        background-color: #fff;
        margin: 0 10px;
        i {
          display: block;
          font-style: normal;
          transition: all 1s;
          &.ordered {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  /* tabs */
  .tabs {
    margin-top: 20px;
  }
}
.ivu-modal-body {
  padding: 10px 50px !important;
}
.conversation {
  margin: 10px 0;
  p {
    font-size: 16px;
  }
}
.visition {
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  .visitionTitle {
    width: 110px;
    text-align: right;
    font-size: 16px;
  }
  .visitionCon {
    margin-left: 50px;
    .ivu-input-with-suffix {
      padding-right: 0;
    }

  }
}
.ivu-input {
  font-size: 16px;
}
.ivu-form-item-label{
  // font-size: 16px!important;
  white-space: nowrap!important;
}
.ivu-form-item-content{
  margin-left: 120px!important;
}
.ivu-modal-header-inner {
  font-size: 16px;
}


</style>