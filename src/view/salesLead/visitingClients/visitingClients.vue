<template>
  <div id="visiting_clients">
    <!-- 搜索 -->
    <div class="search_box">
      <div class="search_input">
        <span>关键字</span>
        <Input v-model="value" placeholder="企业名称/联系人/电话" />
      </div>
      <Button class="search_btn" type="primary" icon="ios-search">搜索</Button>
      <Button class="add_btn" type="primary">添加</Button>
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
        placeholder="Select date"
        style="width: 200px"
        @on-change="searchTime"
      ></DatePicker>
    </div>
    <!-- 列表 -->
    <div class="visit_list">
      <div>拜访列表</div>
      <Table border ref="selection" :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">取消拜访</Button>
            <Button type="error" size="small" @click="todeil(index)">查看</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "visitingClients",
  data() {
    return {
      value: "",
      timeButton: "",
      columns:[
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '拜访类型',
            key: 'type'
        },
        {
            title: '公司名称',
            key: 'name'
        },
        {
            title: '联系人',
            key: 'popname'
        },
        {
            title: '联系电话',
            key: 'popnumber'
        },
        {
            title: '状态',
            key: 'flag'
        },
        {
            title: '拜访时间',
            key: 'time'
        },
        {
            title: '负责人',
            key: 'pop'
        },
        {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
        }
      ],
      data:[
        {
            type: '陌拜',
            name: '测试公司',
            popname: '张三',
            popnumber:'15667896789',
            flag:true,
            time: '2016-10-03',
            pop:'监护人'
        },
      ]
    };
  },
  methods: {
    
    // 时间按钮筛选
    timeBtn(value){
      console.log(value)
    },
    // 时间选择器
    searchTime(value){
      console.log(value)
    },
    // 取消拜访
    show(index){
      console.log(index)
    },
    // 查看详情
    todeil(id) {
      this.$router.push("/salesLead/visitingClientsDetail?id="+id);
    },
  }
};
</script>

<style lang="less" scope>
#visiting_clients {
  // 搜索
  .search_box {
    display: flex;
    .search_input {
      display: flex;
      align-items: center;
      span {
        flex: 0 0 40px;
        margin-right: 10px;
      }
    }
    .search_btn {
      margin: 0 10px;
    }
    .add_btn {
    }
  }
  // 筛选
  .sizer_time {
    display: flex;
    margin-top: 20px;
  }
  // 拜访列表
  .visit_list{
    margin-top:20px;
  }
}
</style>