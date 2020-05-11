<template>
  <div class="category">
      分类
      <div class="top_search" style="margin-top: 15px;">
        <input type="text" v-model="input3" @input="onChange($event)">
        <a href="javascript:;" class="clear" @click="cssClear" v-show="Clear">×</a>
        <a href="#" style="cursor:help" class="prompt">图</a>
        <button>查询</button>
      </div>
      <div style="width:100%;border:1px solid #f00;margin:20px 0;"></div>
      <div class="content">
        <div class="left_content">
          <p>单位名称</p>
          <p @click="departmentCilck">工信海威（北京）信息科技有限公司</p>
          <div class="depart_cntent" v-show="departmentTorF">
            <div class="tit"><div>部门</div><div @click="edit()">加号</div></div>
            <!-- 遍历部门 -->
            <div>
              <div class="tit"><div>技术部门</div><div @click="delet()">删除</div></div>
            </div>
          </div>
        </div>
        <div class="right_content">
          <div class="tit"><div>账号</div><div @click="editAccount()">加号</div></div>
          <div class="con">
            <div class="account_number">
              <div>admin</div>
              <div>王鹏飞</div>
              <div>有效</div>
              <div><button>查看</button></div>
              <div>删除</div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync='showEdit'>
        <div>工信海威（北京）信息科技有限公司</div>
        <div>部门名称</div>
        <el-form :model="formData" ref="formData" label-width="110px" class="demo-formData">
          <div style="margin:21px 0">
              <el-input v-model="formData.title"></el-input>
          </div>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="updateSensitivity()">确定</el-button>
            <el-button type="primary" @click="close()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync='showEditAccount'>
        <el-form :model="ruleForm" :rules="rules" label-width="110px" class="demo-formData">
          <el-form-item label="账号" prop="Account">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="Remarks">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="updateTopic()">确定</el-button>
            <el-button type="primary" @click="close()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      input3: '',
      Clear: false,
      mes: '',
      departmentTorF: true,
      showEdit: false,
      formData: {
        title: '',
        id: null
      },
      showEditAccount: false,
      ruleForm: {
        Account: '',
        name: ''
      },
       rules: {
          Account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    cssClear() {
      console.log(11)
      this.input3 = ''
      this.Clear = false
    },
    onChange(e) {
      if (e.target.value !=='') {
        this.Clear = true
      }
      console.log(e)
    },
    departmentCilck() {
      this.departmentTorF = !this.departmentTorF
    },
    edit() {
      this.showEdit = true
    },
    updateSensitivity() {
      this.showEdit = false
    },
    close() {
      this.showEdit = false
    },
    delet() {
      console.log('删除')
      // 调用删除接口
    },
    // 账号
    editAccount() {
      this.showEditAccount = true
    }
  }
}
</script>

<style lang="less" scoped>
.top_search{
  width:80%;
  input{
    height: 25px;
    width: 50%;
  }

  .clear { 
    position: absolute;
    width: 16px;
    height: 16px; 
    margin: 6px 0 0 -20px;
    outline: none; 
  }
  .prompt{
    position: relative;
    top: -10px;
    left: -9px;
  }
  button{
    z-index: 9;
    width:100px;
    height: 25px;
    border:0;
    background-color:blue;
    color:#fff;
    position: relative;
    left: -16px;
    right: 0;
  }
}
.content{
  display: flex;
  .left_content{
    .depart_cntent{
      width:300px;
      height: 300px;
      border:1px solid #f00;
      .tit{
        display: flex;
        justify-content: space-between;
        padding:10px;
      }
    }
  }
  .right_content{
    padding-left: 50px;
    .tit{
      width:200px;
      display: flex;
      justify-content: space-between;
      padding:10px;
    }
    .con{
      width:400px;
      height: 400px;
      border:1px solid #f00;
      .account_number{
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #f00;
        padding:20px 10px;
      }
    }
    
  }
}


</style>
