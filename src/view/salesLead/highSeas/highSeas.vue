<template>
  <div id="high_seas">

    <Card>
      <!-- 搜索 -->
      <div class="search_box">
        <div class="search_input">
          <span>关键字</span>
          <Input
            v-model="serValue"
            placeholder="企业名称/姓名"
          />
        </div>
        <div class="select_box">
          <span>部门</span>
          <Select
            v-model="department"
            style="width:200px"
            @on-change="departmentChange"
          >
            <Option
              v-for="item in departmentList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <Button
          class="search_btn"
          type="primary"
          icon="ios-search"
          @click="serchBtn"
        >搜索</Button>
        <Button
          class="add_btn"
          type="primary"
          @click="addBtn"
        >导入资源池</Button>
        <Button
          class="dow_btn"
          type="primary"
          @click="dowBtn"
        >下载Excel模板</Button>
        <Button
          class="import_btn"
          type="primary"
          @click="importBtn"
        >导入模板</Button>
      </div>
      <!-- 刷选 -->
      <div class="sizer_time">
        <RadioGroup
          v-model="timeButton"
          type="button"
          @on-change="timeBtn"
        >
          <Radio label="昨天"></Radio>
          <Radio label="本周"></Radio>
          <Radio label="本月"></Radio>
        </RadioGroup>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="按时间搜索"
          style="width: 200px;margin-left:60px;"
          @on-change="searchTime"
        ></DatePicker>
      </div>
      <!-- tabs表格 -->
      <Tabs
        value="公海"
        @on-click="tabsChange"
      >
        <TabPane
          label="公海"
          name="公海"
        >
          <Table
            :loading="loading"
            ref="selection"
            :columns="highSeas"
            :data="highSeasData"
          ></Table>
        </TabPane>
        <TabPane
          label="已分配"
          name="已分配"
        >
          <Table
            :loading="loading"
            ref="selection"
            :columns="highDistribution"
            :data="highDistributionData"
          ></Table>
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

  </div>
</template>

<script>
export default {
  name: "highSeas",
  data () {
    return {
      serValue: '',  // 搜索框字段
      department: '全部',  // 部门字段
      departmentList: [    // 部门下拉框值列表
        {
          value: '全部',
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
      timeButton: "",  // 时间按钮筛选字段
      loading: false,
      highSeas: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: '公司名称'
        },
        {
          title: '联系人',
          key: '联系人'
        },
        {
          title: '联系电话',
          key: '联系电话'
        },
        {
          title: '备注',
          key: '备注'
        },
        {
          title: '招商部门',
          key: '招商部门'
        },
        {
          title: '标识',
          key: '标识'
        },
        {
          title: '来源',
          key: '来源'
        },
        {
          title: '创建时间',
          key: '创建时间'
        },
        {
          title: '创建人',
          key: '创建人'
        }
      ],
      highSeasData: [],
      highDistribution: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: '公司名称'
        },
        {
          title: '联系人',
          key: '联系人'
        },
        {
          title: '联系电话',
          key: '联系电话'
        },
        {
          title: '备注',
          key: '备注'
        },
        {
          title: '招商部门',
          key: '招商部门'
        },
        {
          title: '标识',
          key: '标识'
        },
        {
          title: '来源',
          key: '来源'
        },
        {
          title: '负责人',
          key: '负责人'
        },
        {
          title: '创建时间',
          key: '创建时间'
        },
        {
          title: '创建人',
          key: '创建人'
        }
      ],
      highDistributionData: [],
      pagingData: {
        current: 1,// 分页数
        total: 40, // 总页数
      }

    };
  },
  methods: {
    // 部门筛选
    departmentChange (value) {
      console.log(value)
    },
    // 条件筛选
    serchBtn () {
      console.log({ serValue: this.serValue, department: this.department })
    },
    // 时间按钮筛选
    timeBtn (value) {
      console.log(value)
    },
    // 时间选择器
    searchTime (value) {
      console.log(value)
    },
    // 导入资源池
    addBtn () {
      console.log("导入资源池")
    },
    // 下载Excel模板
    dowBtn () {
      console.log("下载Excel模板")
    },
    // 导入模板
    importBtn () {
      console.log("导入模板")
    },
    // tabs表格切换
    tabsChange (value) {
      console.log(value)
    },
    // 分页
    changePage (page) {
      this.pagingData.current = page
      console.log(this.current)
    },
    // 更改每页条数
    changePageNum (pages) {
      console.log(pages)
    }
  }
};
</script>

<style lang="less">
#high_seas {
  // 搜索
  .search_box {
    display: flex;
    .search_input {
      display: flex;
      align-items: center;
      margin-right: 40px;
      span {
        flex: 0 0 50px;
        margin-right: 10px;
      }
    }
    .select_box {
      display: flex;
      align-items: center;
      span {
        flex: 0 0 35px;
        margin-right: 10px;
      }
    }
    .search_btn {
      margin: 0 40px;
    }
    .add_btn {
    }
    .dow_btn {
      margin: 0 40px;
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

