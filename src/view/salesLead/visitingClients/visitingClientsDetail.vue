<template>
  <div id="visiting_clientsdel">
    <div class="detail_title">拜访详情-凯蓝科技</div>
    <div class="datail_content">
      <!-- 客户类型 -->
      <div class="customer_type">
        <div>提交类型：膜拜</div>
        <div>
          客户类型：
          <RadioGroup v-model="animal">
            <Radio label="企业" disabled></Radio>
            <Radio label="个人" disabled></Radio>
          </RadioGroup>
        </div>
      </div>
      <!-- 客户基本信息 -->
      <div class="basic_info">
        <!-- 企业基本信息 -->
        <div class="enterprise" v-if="flag">
          <div class="basic_info_title">企业基本信息</div>
          <div class="basic_info_con">
            <div class="info_Item">
              <span>企业名称：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>单位性质：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>注册地址：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>纳税人识别号：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>实际经营地址：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>房产属性：</span>
              <RadioGroup v-model="animal">
                <Radio label="自有" disabled></Radio>
                <Radio label="租赁" disabled></Radio>
              </RadioGroup>
              <div class="years_total">
                <span>总租年数</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
              <div class="years">
                <span>已租年数</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
            </div>
            <div class="info_Item">
              <span>企业人数：</span>
              <Input disabled v-model="value" style="width: 300px" />
              <div>
                <span>预计入驻企业年业务量：</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
            </div>
            <div class="info_Item">
              <span>主营业务：</span>
              <Input disabled v-model="value" style="width: 300px" />
              <div>
                <span>预计年纳税总额：</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
            </div>
            <div class="info_Item">
              <span>注册时间：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>法人代表：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>法人代表电话：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>传真：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>实际负责人：</span>
              <Input disabled v-model="value" style="width: 300px" />
              <div>
                <span>实际负责人微信：</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
            </div>
            <div class="info_Item">
              <span>实际负责人手机：</span>
              <Input disabled v-model="value" style="width: 300px" />
              <div>
                <span>实际负责人邮箱：</span>
                <Input disabled v-model="value" style="width: 300px" />
              </div>
            </div>
          </div>
        </div>
        <!-- 个人基本信息 -->
        <div class="personal" v-if="!flag">
          <div class="basic_info_title">个人基本信息</div>
          <div class="basic_info_con">
            <div class="info_Item">
              <span>姓名：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>性别：</span>
              <Select v-model="model1" style="width:200px" disabled>
                <Option value="男"></Option>
                <Option value="女"></Option>
              </Select>
            </div>
            <div class="info_Item">
              <span>地址：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>身份证号：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>电话：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>微信号：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>QQ：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>邮箱：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>预计代理企业数量：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>预计代理类型：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
            <div class="info_Item">
              <span>预计企业年业务量：</span>
              <Input disabled v-model="value" style="width: 300px" />
            </div>
          </div>
        </div>
      </div>
      <!-- 监察记录 -->
      <div class="monitoring_record">
        <div class="monitoring_record_title">监察记录</div>
        <Table stripe :columns="columns" :data="data"></Table>
      </div>
      <!-- 调查结果 -->
      <div class="survey_results">
        <div class="survey_results_title">调查结果</div>
        <div class="survey_results_con">
          <span>调查结果</span>
          <Input v-model="value" type="textarea" :rows="4" placeholder="Enter something..." />
        </div>
      </div>
      <!-- 备注 -->
      <div class="note">
        <div class="note_title">备注</div>
        <div class="note_con">
          <span>备注</span>
          <Input v-model="value" type="textarea" :rows="4" placeholder="Enter something..." />
        </div>
      </div>
      <div class="submit_btn">
        <Button type="primary">提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "visitingClientsDel",
  data() {
    return {
      id: "",
      animal: "企业",
      value: "",
      flag: true,
      columns: [
        {
          title: "拜访时间",
          key: "name"
        },
        {
          title: "调查结果",
          key: "age"
        },
        {
          title: "定位图片",
          key: "address"
        },
        {
          title: "审核视频",
          key: "address"
        },
        {
          title: "资格认定表",
          key: "address"
        }
      ],
      data: []
    };
  },
  created() {
    console.log("触发", this.$route.query.id);
    this.id = this.$route.query.id;
  },
  methods: {
    // getDetilById
    getDetilById() {}
  }
};
</script>

<style lang="less">
#visiting_clientsdel {
  .detail_title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .datail_content {
    // 客户类型
    .customer_type {
      margin-bottom: 10px;
    }
    // 企业基本信息
    .enterprise {
      margin-bottom: 10px;
      .basic_info_title {
        font-size: 18px;
      }
      .basic_info_con {
        .info_Item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          & > span {
            flex: 0 0 100px;
          }
          &:nth-of-type(6) > div,
          &:nth-of-type(7) > div,
          &:nth-of-type(8) > div,
          &:nth-of-type(13) > div,
          &:nth-of-type(14) > div {
            display: flex;
            align-items: center;
          }
          &:nth-of-type(6) > div {
            &.years,
            &.years_total {
              margin-left: 20px;
            }
            span {
              flex: 0 0 60px;
            }
          }
          &:nth-of-type(7) > div {
            span {
              flex: 0 0 150px;
            }
          }
          &:nth-of-type(8) > div {
            span {
              flex: 0 0 150px;
            }
          }
          &:nth-of-type(13) > div,
          &:nth-of-type(14) > div {
            span {
              flex: 0 0 100px;
            }
          }
        }
      }
    }
    // 个人基本信息
    .personal {
      margin-bottom: 10px;
      .basic_info_title {
        font-size: 18px;
      }
      .basic_info_con {
        .info_Item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          & > span {
            flex: 0 0 150px;
          }
        }
      }
    }

    // 监察记录
    .monitoring_record {
      margin-bottom: 10px;
      .monitoring_record_title {
        font-size: 18px;
      }
    }
    // 调查结果
    .survey_results {
      margin-bottom: 10px;
      .survey_results_title {
        font-size: 18px;
      }
      .survey_results_con {
        display: flex;
        span {
          flex: 0 0 60px;
        }
      }
    }
    // 备注
    .note {
      margin-bottom: 10px;
      .note_title {
        font-size: 18px;
      }
      .note_con {
        display: flex;
        span {
          flex: 0 0 60px;
        }
      }
    }
    // 提交
    .submit_btn {
      text-align: center;
      padding: 40px;
    }
  }
}
</style>