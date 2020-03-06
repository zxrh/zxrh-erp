<template>
  <div id="orderDetail">

    <Tabs>
      <TabPane label="资格认定">

        <Card>
          <div slot="title"> <span>用户类型</span>
            <RadioGroup v-model="userType">
              <Radio label="enterprise" style="margin:0 20px;">企业</Radio>
              <Radio label="personal">个人</Radio>
            </RadioGroup>
          </div>


          <Form :model="formItem" label-position="left" :label-width="100" v-show="userType=='enterprise'">

            <Card>
              <div slot="title">
                <h2>企业基本信息</h2>
              </div>
              <FormItem label="企业名称">
                <Input v-model="formItem.input1" style="width:200px" />
              </FormItem>
              <FormItem label="单位性质">
                <Input v-model="formItem.input2" style="width:200px" />
              </FormItem>
              <FormItem label="注册地址">
                <Input v-model="formItem.input3" style="width:200px" />
              </FormItem>
              <FormItem label="纳税人识别号">
                <Input v-model="formItem.input4" style="width:200px" />
              </FormItem>
              <FormItem label="实际经营地址">
                <Input v-model="formItem.input4" style="width:200px" />
              </FormItem>
              <Row>
                <Col span="4">
                <FormItem label="房产属性">
                  <RadioGroup v-model="formItem.radio1">
                    <Radio label="own">自有</Radio>
                    <Radio label="rent">租赁</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
                <Col span="3">
                <FormItem label="总租年数" label-width="80">
                  <Input v-model="formItem.input5" style="width:100px" />
                </FormItem>
                </Col>
                <Col span="3">
                <FormItem label="已租年数" label-width="80">
                  <Input v-model="formItem.input6" style="width:100px" />
                </FormItem>
                </Col>
              </Row>

              <Row>
                <Col span="6">
                <FormItem label="企业人数">
                  <Input v-model="formItem.input7" style="width:200px" />
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="预计入驻企业年业务量" label-width="150">
                  <Input v-model="formItem.input8" style="width:200px" />
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                <FormItem label="主营业务">
                  <Input v-model="formItem.input9" style="width:200px" />
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="预计年纳税总额" label-width="150">
                  <Input v-model="formItem.input10" style="width:200px" />
                </FormItem>
                </Col>
              </Row>
              <FormItem label="注册时间">
                <DatePicker type="date" style="width:200px" placeholder="Select date" v-model="formItem.date">
                </DatePicker>
              </FormItem>

              <FormItem label="法人代表">
                <Input v-model="formItem.input11" style="width:200px" />
              </FormItem>
              <FormItem label="法人代表电话">
                <Input v-model="formItem.input12" style="width:200px" />
              </FormItem>
              <FormItem label="传真">
                <Input v-model="formItem.input13" style="width:200px" />
              </FormItem>
              <Row>
                <Col span="6">
                <FormItem label="实际负责人">
                  <Input v-model="formItem.input14" style="width:200px" />
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="实际负责人微信" label-width="150">
                  <Input v-model="formItem.input15" style="width:200px" />
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                <FormItem label="实际负责人手机">
                  <Input v-model="formItem.input16" style="width:200px" />
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem label="实际负责人邮箱" label-width="150">
                  <Input v-model="formItem.input17" style="width:200px" />
                </FormItem>
                </Col>
              </Row>
              <FormItem label="合同期限">
                <Row>
                  <Col span="3">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.date1"></DatePicker>
                  </Col>
                  <Col span="1" style="text-align: center">至</Col>
                  <Col span="3">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.date2"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="合同协议">
                <div class="demo-upload-list" v-for="item in uploadList" :key="item">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList"
                  :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
                  :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload" multiple type="drag"
                  action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
              </FormItem>
            </Card>

            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>认定程序</h2>
              </div>
              <FormItem label="认定程序" style="margin-bottom:0;">
                <RadioGroup v-model="formItem.radio2">
                  <Radio label="now">现有</Radio>
                  <Radio label="new" style="margin:0 30px;">新引进</Radio>
                  <Radio label="re">复核</Radio>
                </RadioGroup>
              </FormItem>
            </Card>

            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>备注</h2>
              </div>

              <FormItem label="备注" style="margin-bottom:0;">
                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
              </FormItem>
            </Card>

          </Form>



          <Form :model="formItem" label-position="left" :label-width="100" v-show="userType=='personal'">
            <Card>
              <div slot="title">
                <h2>受票方信息</h2>
              </div>
              <FormItem label-width='150' label="入驻申请人">
                <Input v-model="formItem2.input1" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="单位性质">
                <Input v-model="formItem2.input2" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="企业注册地址">
                <Input v-model="formItem2.input3" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="纳税人识别号">
                <Input v-model="formItem2.input4" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="实际经营地址">
                <Input v-model="formItem2.input5" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="企业人数">
                <Input v-model="formItem2.input6" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="入驻申请联系方式">
                <Input v-model="formItem2.input7" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="身份证号">
                <Input v-model="formItem2.input8" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="业务往来企业名称">
                <Input v-model="formItem2.input9" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="预计与往来企业年业务量">
                <Input v-model="formItem2.input10" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="预计企业年业务量">
                <Input v-model="formItem2.input11" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="预计年纳税总额">
                <Input v-model="formItem2.input12" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="预备主营业务">
                <Input v-model="formItem2.input13" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="往来企业联系人">
                <Input v-model="formItem2.input14" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="往来企业联系人电话">
                <Input v-model="formItem2.input15" style="width:200px" />
              </FormItem>
              <FormItem label-width='150' label="往来企业联系电话">
                <Input v-model="formItem2.input16" style="width:200px" />
              </FormItem>
            </Card>



            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>认定程序</h2>
              </div>
              <FormItem label="认定程序" style="margin-bottom:0;">
                <RadioGroup v-model="formItem2.radio">
                  <Radio label="now">现有</Radio>
                  <Radio label="new" style="margin:0 30px;">新引进</Radio>
                  <Radio label="re">复核</Radio>
                </RadioGroup>
              </FormItem>
            </Card>

            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>备注</h2>
              </div>

              <FormItem label="备注" style="margin-bottom:0;">
                <Input v-model="formItem2.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
              </FormItem>
            </Card>


          </Form>

          <Button type="primary" size='large' long style="margin-top:20px">提交</Button>
        </Card>

      </TabPane>

      <TabPane label="产品信息">
        <Card>
          <div slot="title">
            <span style="font-weight:bold;margin-right:20px;">入驻类型</span><span>企业客户入驻</span>
          </div>
          <Form :model="formItem" label-position="left" :label-width="100">

            <Card>
              <div slot="title">
                <h2>产品信息</h2>
              </div>
              <FormItem label="套餐选择">
                <Select v-model="proForm.select" style="width:150px;">
                  <Option value="basicA">基础包-A套餐</Option>
                  <Option value="basicB">基础包-B套餐</Option>
                  <Option value="basicC">基础包-C套餐</Option>
                </Select>
              </FormItem>
              <Row>
                <Col span="4">
                <FormItem label="套餐价格" style="margin-bottom:0;">
                  <Input v-model="proForm.input1" style="width:150px;" />
                </FormItem>
                </Col>
                <Col span="1"> <Button type="text">修改</Button></Col>
              </Row>

            </Card>
            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>协议信息</h2>
              </div>
              <FormItem label="入驻园区">
                <Select v-model="proForm.select2" style="width:150px;">
                  <Option value="ts">TS</Option>
                  <Option value="ci">CI</Option>
                  <Option value="cy">CY</Option>
                  <Option value="gx">GX</Option>
                  <Option value="hi">WG</Option>
                  <Option value="wn">WN</Option>
                  <Option value="ni">NI</Option>
                  <Option value="ci">CI</Option>
                  <Option value="hd">HD</Option>
                  <Option value="zi">ZI</Option>
                  <Option value="ji">JI</Option>
                </Select>
              </FormItem>


              <FormItem label="合作协议" style="margin-bottom:0">
                <div class="demo-upload-list" v-for="item in uploadList" :key="item">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList"
                  :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
                  :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload" multiple type="drag"
                  action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="md-add" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
              </FormItem>
            </Card>

            <Card style="margin-top:20px;">
              <div slot="title">
                <h2>代理信息</h2>
              </div>

              <FormItem label="代理">
                <Select v-model="proForm.select3" style="width:150px;">
                  <Option value="yes">是</Option>
                  <Option value="no">否</Option>
                 
                </Select>
              </FormItem>
<FormItem label="代理名称" style="margin-bottom:0;">
                  <Input v-model="proForm.input2" style="width:150px;" />
                </FormItem>

            </Card>

            <Button :size="large" type="primary" long  style="margin-top:20px;">提交</Button>
        
          </Form>
        </Card>

      </TabPane>


    </Tabs>

  </div>
</template>

<script>
  export default {
    name: "placeOrder",
    data() {
      return {
        userType: 'personal',
        formItem: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          radio1: 'own',
          input5: '',
          input6: '',
          input7: '',
          input8: '',
          input9: '',
          input10: '',
          input11: '',
          input12: '',
          input13: '',
          input14: '',
          input15: '',
          input16: '',
          input17: '',
          date1: '',
          date2: '',
          radio2: 'now',
          textarea: ''


        },
        formItem2: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
          input6: '',
          input7: '',
          input8: '',
          input9: '',
          input10: '',
          input11: '',
          input12: '',
          input13: '',
          input14: '',
          input15: '',
          input16: '',
          radio: "",
          textarea: ''
        },
        proForm: {
          select: 'basicA',
          input1: '6999',
          select2: 'hd',
          select3: 'no',
          input2: '',
        },
        defaultList: [{
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: []

      };
    },
    methods: {
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' 只能上传PNG或JPG格式图片'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' 图片太大，不能超过2M'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 10;
        if (!check) {
          this.$Notice.warning({
            title: '最多传10张'
          });
        }
        return check;
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
    }
  };

</script>
<style lang="less" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

</style>
