<template>
  <div id="resource_pool">
    
    <Card>
                <!-- 搜索 -->
    <div class="search_box">
      <div class="search_input">
        <span>关键字</span>
        <Input v-model="serValue" placeholder="企业名称/电话号码/姓名" />
      </div>
      <div class="select_box">
        <span class="enterprise">企业状态</span>
        <Select v-model="enterpriseState" style="width:200px" @on-change="enterpriseChange">
          <Option
            v-for="item in enterpriseList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="select_box">
        <span class="customer">客户级别</span>
        <Select v-model="customerLevel" style="width:200px" @on-change="customerChange">
          <Option
            v-for="item in customerLevelList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="select_box">
        <span class="department">部门</span>
        <Select v-model="department" style="width:200px" @on-change="departmentChange">
          <Option
            v-for="item in departmentList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <Button class="search_btn" type="primary" icon="ios-search" @click="serchBtn">搜索</Button>
      <Button class="add_btn" type="primary" @click="addBtn">导入意向客户</Button>
      <Button class="dow_btn" type="primary" @click="dowBtn">下载Excel模板</Button>
      <Button class="import_btn" type="primary" @click="importBtn">导入模板</Button>
      <Button class="distribution_btn" type="primary" @click="distributionBtn">分配</Button>
      <Button class="return_btn" type="primary" @click="returnBtn">返回公海</Button>
    </div>
    <!-- 刷选 -->
    <div class="sizer_time">
      <RadioGroup v-model="timeButton" type="button" @on-change="timeBtn">
        <Radio label="昨天"></Radio>
        <Radio label="本周"></Radio>
        <Radio label="本月"></Radio>
      </RadioGroup>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按时间搜索"
        style="width: 200px"
        @on-change="searchTime"
      ></DatePicker>
    </div>
    <!-- tabs表格 -->
    <Tabs value="我的有效客户" @on-click="tabsChange">
      <TabPane label="我的有效客户" name="我的有效客户">
        <Table :loading="loading" ref="selection" :columns="customerMe" :data="customerMeData">
          <template slot-scope="{ row, index }" slot="action">
            <span style="cursor:pointer" @click="imports(index)">导入意向客户</span>
            <span style="margin: 0 10px;cursor:pointer" @click="editor(index)">编辑</span>
            <span style="cursor:pointer" @click="followUp(index)">跟进记录</span>
          </template>
        </Table>
      </TabPane>
      <TabPane label="我的资源池" name="我的资源池">
        <Table
          :loading="loading"
          ref="selection"
          :columns="resourcePoolMe"
          :data="resourcePoolMeData"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Select v-model="rPSelect" style="width:80px" @on-change="rPSelectMe">
              <Option value="未标注">未标注</Option>
              <Option value="有效">有效</Option>
              <Option value="无效">无效</Option>
            </Select>
            <span style="margin: 0 10px;cursor:pointer" @click="editor(index)">编辑</span>
            <span style="cursor:pointer" @click="followUp(index)">跟进记录</span>
          </template>
        </Table>
      </TabPane>
      <TabPane label="下属的资源池" name="下属的资源池">
        <Table
          :loading="loading"
          ref="selection"
          :columns="resourcePoolSub"
          :data="resourcePoolSubData"
        >
          <template slot-scope="{ row, index }" slot="action">
            <span style="cursor:pointer" @click="imports(index)">导入意向客户</span>
            <span style="margin: 0 10px;cursor:pointer" @click="editor(index)">编辑</span>
            <span style="cursor:pointer" @click="followUp(index)">跟进记录</span>
          </template>
        </Table>
      </TabPane>
      <TabPane label="昨日未跟进列表" name="昨日未跟进列表">
        <Table :loading="loading" ref="selection" :columns="yesterday" :data="yesterdayData">
          <template slot-scope="{ row, index }" slot="action">
            <span style="cursor:pointer" @click="auditVerify(index)">核实有效</span>
            <span style="margin: 0 10px;cursor:pointer" @click="auditingRemoveList(index)">移除列表</span>
            <span style="cursor:pointer" @click="followUp(index)">跟进记录</span>
          </template>
        </Table>
      </TabPane>
    </Tabs>

    <!-- 分页 -->
    <Page
      :current="pagingData.current"
      :total="pagingData.total"
      show-total
      show-elevator
      show-sizer
      @on-change="changePage"
      @on-page-size-change="changePageNum"
    />
            </Card>

    <!-- 分配弹窗 -->
    <Modal :mask-closable="false" v-model="DialogDistribution" title="分配"  @on-cancel="cancel">
      <div class="distribution_box" style="display:flex;align-items: center;">
        <span style="flex:0 0 80px">分配人员</span>
        <Input v-model="serValue" placeholder="公司名称默认" />
        
      </div>
      <div slot="footer" style="text-align:center">
            <Button type="primary" size="large"   @click="submitBtn">提交</Button>
        </div>
    </Modal>
    <!-- 编辑弹窗 -->
    <Modal :mask-closable="false" v-model="DialogEditor" title="编辑"  @on-cancel="cancel" >
      <div class="distribution_box" style="padding: 0 80px">
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">状态</span>
          <Select v-model="editorData.dialogSlect" style="width:200px">
            <Option value="拜访">未标注</Option>
            <Option value="拜访">有效</Option>
            <Option value="拜访">无效</Option>
          </Select>
        </div>
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">公司名称</span>
          <Input v-model="editorData.companyName" placeholder="公司名称默认" />
        </div>
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">联系人</span>
          <Input v-model="editorData.contact" placeholder="联系人" />
        </div>
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">电话号码</span>
          <Input v-model="editorData.phoneNumber" placeholder="电话号码" />
        </div>
        <div style="display:flex;margin-bottom:20px;">
          <span style="flex:0 0 80px">跟进内容</span>
          <Input v-model="editorData.followUpCon" type="textarea" placeholder="跟进内容" />
        </div>
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">下次跟进时间</span>
          <DatePicker type="datetime" placeholder="下次跟进时间" style="width: 200px" @on-change="nextTime"></DatePicker>
        </div>
        <div style="display:flex;align-items: center;margin-bottom:20px;">
          <span style="flex:0 0 80px">意向客户</span>
          <RadioGroup v-model="editorData.whetherIntention">
            <Radio label="是" value="是"></Radio>
            <Radio label="否" value="否"></Radio>
          </RadioGroup>
        </div>
        <div style="display:flex;margin-bottom:20px;">
          <span style="flex:0 0 80px">备注</span>
          <Input v-model="editorData.note" type="textarea" placeholder="备注" />
        </div>
      </div>
      <div slot="footer" style="text-align:center">
            <Button type="primary" size="large"   @click="editorSubmitBtn">提交</Button>
        </div>
    </Modal>
    <!-- 跟进记录弹窗 -->
    <Modal :mask-closable="false" v-model="DialogFollowUp" title="跟进记录"  @on-cancel="cancel">
      <div class="distribution_box" style="">
        <div style="margin-bottom:10px;">
          <p style="font-size:18px;font-weight: 700;margin-bottom:5px;">2019-19-12 22:22:22</p>
          <p style="font-size:16px;">第一次通话</p>
        </div>
        <div style="margin-bottom:10px;">
          <p style="font-size:18px;font-weight: 700;margin-bottom:5px;">2019-19-12 22:22:22</p>
          <p style="font-size:16px;">第一次通话</p>
        </div>
        <div style="margin-bottom:10px;">
          <p style="font-size:18px;font-weight: 700;margin-bottom:5px;">2019-19-12 22:22:22</p>
          <p style="font-size:16px;">第一次通话</p>
        </div>
        
      </div>
      <div slot="footer" style="text-align:center">
            <Button type="primary" size="large"   @click="DialogFollowUp=false">确定</Button>
        </div>
    </Modal>
    
  </div>
</template>

<script>
export default {
  name: "resourcePool",
  data() {
    return {
      serValue: "", // 搜索框字段
      enterpriseState: "全部", // 企业状态字段
      enterpriseList: [
        // 企业状态下拉框值列表
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "未标注",
          label: "未标注"
        },
        {
          value: "有效",
          label: "有效"
        },
        {
          value: "无效",
          label: "无效"
        }
      ],
      customerLevel: "全部", // 客户级别字段
      customerLevelList: [
        // 客户级别下拉值列表
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "A",
          label: "A"
        },
        {
          value: "B",
          label: "B"
        },
        {
          value: "C",
          label: "C"
        },
        {
          value: "D",
          label: "D"
        },
        {
          value: "未标注",
          label: "未标注"
        }
      ],
      department: "全部", // 部门字段
      departmentList: [
        // 部门下拉框值列表
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "武汉销售部",
          label: "武汉销售部"
        },
        {
          value: "北京销售部",
          label: "北京销售部"
        },
        {
          value: "深圳销售部",
          label: "深圳销售部"
        }
      ],
      timeButton: "", // 时间按钮筛选字段
      loading: false,
      customerMe: [
        // 我的有效客户title
        {
          type: "selection",
          width: 40,
          align: "center"
        },
        {
          title: "状态",
          width: 60,
          key: "state"
        },
        {
          title: "客户级别",
          width: 90,
          key: "level"
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "ContactPhone"
        },
        {
          title: "招商部门",
          key: "zsbm"
        },
        {
          title: "标识",
          key: "biaoshi"
        },
        {
          title: "来源",
          key: "laiyuan"
        },
        {
          title: "跟进时间",
          key: "gjshijian"
        },
        {
          title: "跟进内容",
          key: "gjneirong"
        },
        {
          title: "下次跟进时间",
          key: "xcgjshijian"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "负责人",
          key: "fuzeren"
        },
        {
          title: "导入时间",
          key: "drshijian"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      customerMeData: [
        {
          state: "有效",
          level: "A",
          companyName: "凯蓝科技",
          contact: "凯总",
          ContactPhone: "15802788471",
          zsbm: "武汉销售部",
          biaoshi: "落地页1",
          laiyuan: "百度推广",
          gjshijian: "2019-19-12 22:22:22",
          gjneirong: "第三次跟进",
          xcgjshijian: "2019-19-13 22:22:22",
          beizhu: "微信号:hgg",
          fuzeren: "汤纪文",
          drshijian: "2019-19-12 22:22:22"
        }
      ], // 我的有效客户列表

      resourcePoolMe: [
        {
          type: "selection",
          width: 40,
          align: "center"
        },
        {
          title: "状态",
          width: 60,
          key: "state"
        },
        {
          title: "客户级别",
          width: 90,
          key: "level"
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "ContactPhone"
        },
        {
          title: "招商部门",
          key: "zsbm"
        },
        {
          title: "标识",
          key: "biaoshi"
        },
        {
          title: "来源",
          key: "laiyuan"
        },
        {
          title: "跟进时间",
          key: "gjshijian"
        },
        {
          title: "跟进内容",
          key: "gjneirong"
        },
        {
          title: "下次跟进时间",
          key: "xcgjshijian"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "负责人",
          key: "fuzeren"
        },
        {
          title: "导入时间",
          key: "drshijian"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ], // 我的资源池title
      resourcePoolMeData: [
        {
          state: "有效",
          level: "A",
          companyName: "凯蓝科技",
          contact: "凯总",
          ContactPhone: "15802788471",
          zsbm: "武汉销售部",
          biaoshi: "落地页1",
          laiyuan: "百度推广",
          gjshijian: "2019-19-12 22:22:22",
          gjneirong: "第三次跟进",
          xcgjshijian: "2019-19-13 22:22:22",
          beizhu: "微信号:hgg",
          fuzeren: "汤纪文",
          drshijian: "2019-19-12 22:22:22"
        }
      ], // 我的资源池列表
      rPSelect: "未标注", // 我的资源池标注状态

      resourcePoolSub: [
        {
          type: "selection",
          width: 40,
          align: "center"
        },
        {
          title: "状态",
          width: 60,
          key: "state"
        },
        {
          title: "客户级别",
          width: 90,
          key: "level"
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "ContactPhone"
        },
        {
          title: "招商部门",
          key: "zsbm"
        },
        {
          title: "标识",
          key: "biaoshi"
        },
        {
          title: "来源",
          key: "laiyuan"
        },
        {
          title: "跟进时间",
          key: "gjshijian"
        },
        {
          title: "跟进内容",
          key: "gjneirong"
        },
        {
          title: "下次跟进时间",
          key: "xcgjshijian"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "负责人",
          key: "fuzeren"
        },
        {
          title: "导入时间",
          key: "drshijian"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ], // 下属的资源池title
      resourcePoolSubData: [
        {
          state: "有效",
          level: "A",
          companyName: "凯蓝科技",
          contact: "凯总",
          ContactPhone: "15802788471",
          zsbm: "武汉销售部",
          biaoshi: "落地页1",
          laiyuan: "百度推广",
          gjshijian: "2019-19-12 22:22:22",
          gjneirong: "第三次跟进",
          xcgjshijian: "2019-19-13 22:22:22",
          beizhu: "微信号:hgg",
          fuzeren: "汤纪文",
          drshijian: "2019-19-12 22:22:22"
        }
      ], // 下属的资源池列表

      yesterday: [
        // 昨日未跟进title
        {
          type: "selection",
          width: 40,
          align: "center"
        },
        {
          title: "审核状态",
          key: "reviewState"
        },
        {
          title: "状态",
          width: 60,
          key: "state"
        },
        {
          title: "客户级别",
          width: 90,
          key: "level"
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系电话",
          key: "ContactPhone"
        },
        {
          title: "招商部门",
          key: "zsbm"
        },
        {
          title: "标识",
          key: "biaoshi"
        },
        {
          title: "来源",
          key: "laiyuan"
        },
        {
          title: "跟进时间",
          key: "gjshijian"
        },
        {
          title: "跟进内容",
          key: "gjneirong"
        },
        {
          title: "下次跟进时间",
          key: "xcgjshijian"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "负责人",
          key: "fuzeren"
        },
        {
          title: "导入时间",
          key: "drshijian"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      yesterdayData: [
        {
          reviewState: "已核实",
          state: "有效",
          level: "A",
          companyName: "凯蓝科技",
          contact: "凯总",
          ContactPhone: "15802788471",
          zsbm: "武汉销售部",
          biaoshi: "落地页1",
          laiyuan: "百度推广",
          gjshijian: "2019-19-12 22:22:22",
          gjneirong: "第三次跟进",
          xcgjshijian: "2019-19-13 22:22:22",
          beizhu: "微信号:hgg",
          fuzeren: "汤纪文",
          drshijian: "2019-19-12 22:22:22"
        }
      ], // 昨日未跟进列表
      pagingData:{
        current:1,// 分页数
        total:40, // 总页数
      },


      DialogDistribution: false, // 分配弹框
      serValue: "", // 分配弹框 分配人员字段

      DialogEditor:false,  // 编辑弹窗
      editorData:{
        dialogSlect:'', // 状态
        companyName:'', // 公司名称
        contact:"", // 联系人
        phoneNumber:'', // 电话号码
        followUpCon:'', // 跟进内容
        nextTime:"",
        whetherIntention:'',  // 意向客户
        note:"", // 备注
      },
      
      DialogFollowUp:false,// 跟进记录弹窗

    };
  },
  methods: {
    // 企业状态筛选
    enterpriseChange(value) {
      console.log(value);
    },
    // 客户级别筛选
    customerChange(value) {
      console.log(value);
    },
    // 部门筛选
    departmentChange(value) {
      console.log(value);
    },
    // 条件筛选
    serchBtn() {
      console.log({
        serValue: this.serValue,
        enterpriseState: this.enterpriseState,
        customerLevel: this.customerLevel,
        department: this.department
      });
    },
    // 时间按钮筛选
    timeBtn(value) {
      console.log(value);
    },
    // 时间选择器
    searchTime(value) {
      console.log(value);
    },
    // 导入意向客户
    addBtn() {
      console.log("导入意向客户");
    },
    // 下载Excel模板
    dowBtn() {
      console.log("下载Excel模板");
    },
    // 导入模板
    importBtn() {
      console.log("导入模板");
    },
    // 分配
    distributionBtn() {
      console.log("分配");
      this.DialogDistribution = true;
    },
    // 返回公海
    returnBtn() {
      console.log("返回公海");
    },
    // tabs表格切换
    tabsChange(value) {
      console.log(value);
    },
    // 单条导入意向客户
    imports(index) {
      console.log(index);
    },
    // 单条编辑
    editor(index) {
      console.log(index);
      this.DialogEditor=true

    },
    // 单条跟进记录
    followUp(index) {
      console.log(index);
      this.DialogFollowUp=true
    },
    // 我的资源池标注客户
    rPSelectMe(index) {
      console.log(index);
    },
    // 稽查页面--核实有效
    auditVerify(index) {
      console.log(index);
    },
    // 稽查页面--移除列表
    auditingRemoveList(index) {
      console.log(index);
    },
    // 稽查页面--跟进记录
    auditingFollowUp(index) {
      console.log(index);
    },
    /**
     * 弹框部分
     */
    cancel() {
      this.$Message.info("关闭");
    },
    // 弹框分配提交按钮
    submitBtn(){
      this.DialogDistribution=false
      this.$Message.info("成功");
      console.log(this.serValue)
    },
    // 弹窗编辑下次跟进时间
    nextTime(value){
      console.log(value)
      this.editorData.nextTime = value
    },
    // 弹窗编辑提交按钮
    editorSubmitBtn(){
      this.DialogEditor=false
      this.$Message.info("成功");
      console.log(this.editorData)
    },

    // 分页
    changePage(page) {
      this.pagingData.current = page;
      console.log(this.current);
    },
    // 更改每页条数
    changePageNum(pages) {
      console.log(pages);
    }
  }
};
</script>

<style lang="less">
#resource_pool {
  // 搜索
  .search_box {
    display: flex;
    .search_input {
      display: flex;
      align-items: center;
      margin-right: 20px;
      span {
        flex: 0 0 50px;
        margin-right: 10px;
      }
    }
    .select_box {
      display: flex;
      align-items: center;
      margin-right: 20px;
      &:last-child {
        margin-right: 0 !important ;
      }
      .enterprise {
        flex: 0 0 65px;
        margin-right: 10px;
      }
      .customer {
        flex: 0 0 65px;
        margin-right: 10px;
      }
      .department {
        flex: 0 0 30px;
        margin-right: 10px;
      }
    }
    .search_btn {
      margin-right:10px;
    }
    .add_btn {
      margin-right: 10px;
    }
    .dow_btn {
      margin-right: 10px;
    }
    .import_btn {
      margin-right: 10px;
    }
    .distribution_btn {
      margin-right: 10px;
    }
    .return_btn {
    }
  }
  // 筛选
  .sizer_time {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    
  }
  
}
</style>
