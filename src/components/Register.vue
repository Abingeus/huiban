<template>
  <div class="Register_container">
    <div class="Register_title">用户登录界面</div>
    <div class="Register_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/images/dinosaur.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="RegisterFormRef" :model="RegisterForm" :rules="RegisterFormRules" label-width="0px" class="Register_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model.trim="RegisterForm.username" prefix-icon="iconfont icon-gerenxinxi"  placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="RegisterForm.password" prefix-icon="iconfont icon-tianchongxing-" type="password"  placeholder="请输入密码"
                    @keyup.enter.native="Register" :show-password="true"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="Register" :loading="RegisterLoading">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    粒子插件特效-->
    <vue-particles class="Register-bg" color="#39AFFD" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle"
                   :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                   :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="footer">
      <span style="font-weight: bold;color:white;margin-bottom: 10px">
        登录页面切换
        <!-- <i class="iconfont icon-haoyou " @click="goUser"></i> -->
      </span>
      <span>
        <i class="iconfont icon-guanliyuan" @click="goManage"></i>
      </span>
    </div>
  </div>
</template>





<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      //登录表单
      RegisterForm: {
        username: "",
        password: "",
      },

      //登录表单规则的验证对象
      RegisterFormRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      RegisterLoading: false
    };
  },
  methods: {
    resetRegisterForm() {
      this.$refs.RegisterFormRef.resetFields();
    },
    Register() {
      this.$refs.RegisterFormRef.validate(async (valid) => {
        // console.log(valid);
        //如果表单验证无效，直接返回
        if (!valid) {
          return;
        }
        this.RegisterLoading = true;
        // 进行md5加密
        const params = new URLSearchParams();
        params.append("username",this.RegisterForm.username);
        params.append("password",this.RegisterForm.password);
        params.append("isAdmin","0");
        // const username = this.RegisterForm.username;
        // const password = this.RegisterForm.password;
        //
        // const encodedData = qs.stringify({
        //   username: this.RegisterForm.username,
        //   password: this.RegisterForm.password
        // });

        const { data: res } = await axios.post('/api/user/register', params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if(res.code==1)
        {
          this.RegisterLoading=false;
          return this.$message.error(res.message);
          console.log(res);
        }
        //向数据库发送axios请求，如果登录成功，就跳转
        // const { data: res } = await this.$http.post(
        //   "user/Register",
        //   {
        //     username,
        //     password
        //   }
        // );
        // if (res.status !== 200) {
        //   this.RegisterLoading = false;
        //   return this.$message.error(res.msg);
        // }
        // console.log(res);
        if (res.code==0)
        {
          this.$message.success(res.message);
          this.RegisterLoading = false;
          // window.sessionStorage.setItem("token", res.map.token);
          // window.sessionStorage.setItem("userId", res.map.id);
          this.$router.push("/top_menu/home"); //跳转到home页面下
        }

      });
    },
    goUser() {
      this.$router.push("/Register");
    },
    goManage() {
      this.$router.push("/Registermanage");
    },
  },
};
</script>



<style lang="less" scoped>
.footer2 {
  position: absolute;
  bottom: 0px;
  left: 35%;
  color: #ccc;

  a {
    color: #ccc;
  }
}

.Register_container {
  // background-color: #2b4b6b;
  background: url(https://xxx.xiaobaitiao.icu/img/icu/202312211236280.jpg) no-repeat 0px 0px;
  background-size: cover;
  height: 100%;
}

.Register_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.Register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.Register_title {
  position: relative;
  top: 5%;
  font-size: 36px;
  color: white;
  text-align: center;
  font-weight: 700;
  //控制字体间距
  letter-spacing: 10px;
}

.footer {
  display: flex;
  position: absolute;
  flex-direction: column;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 120px;

  // background-color: pink;
  span {
    // width: 100%;
    // background-color: red;
    text-align: center;
  }
}
</style>