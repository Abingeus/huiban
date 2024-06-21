import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [

  { path: "/",redirect: "/login" },
  { path: "/Register",component:()=>import("@/components/Register.vue")},
  { path: "/login", name:"login",component: () => import("@/components/Login.vue") },
  {
    path: "/loginmanage",

    component: () => import("@/components/BookManage/LoginBookManage.vue"),
  },
  {
    path: "/home",
    component: () => import("@/components/Home/Home.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/components/Index/Index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/to_index",
        component: () => import("@/components/User/to_index.vue"),
      },
      { path: "/Call_for_paper", component: () => import("@/components/User/Call_for_Papers.vue") },
      {
        path: "/notice",
        component: () => import("@/components/User/Notice.vue"),
      },
      {
        path: "/information",
        component: () => import("@/components/User/Information.vue"),
      },
      {
        path: "/borrow",
        component: () => import("@/components/User/Borrow.vue"),
      },
      {
        path: "/violation",
        component: () => import("@/components/User/Violation.vue"),
      },
      {
        path: "/comment",
        component: () => import("@/components/User/Comment.vue"),
      },
      {
        path: "/intelligent",
        component: () => import("@/components/User/Intelligent.vue"),
      },
      // { path: "/chat", component: () => import("@/components/User/Chat") },
    ],
  },
  // {
  //   path: "/conference",
  //   component:()=>import("@/components/User/Conference.vue"),
  //   children: [
  //     {
  //       path: "/conference/call_for_papers",
  //       component:()=>import("@/components/User/call_for_papers_detail.vue"),
  //     },
  //     {
  //       path: "/conference/call_for_papers_finish",
  //       component:()=>import("@/components/User/call_for_papers_finish.vue"),
  //     }
  //   ]
  // },
  // {
  //   path: "/journals",
  //   component:()=>import("@/components/User/journals.vue"),
  //   children: [
  //     {
  //       path: "/journals/call_for_papers_ccf",
  //       component:()=>import("@/components/User/journals_ccf.vue"),
  //     },
  //     {
  //       path: "/journals/call_for_papers_finish",
  //       component:()=>import("@/components/User/journal_details.vue"),
  //     }
  //   ]
  // },

  {
    path:"/top_menu",
    component:()=>import("@/components/User/top_menu.vue"),
    children:[
      {
        path:"page_view",
        component:()=>import("@/components/User/Page_Views.vue"),

      },
      {
        path:"conference",
        component:()=>import("@/components/User/Conference.vue"),
        children:[
          {
            path:"viewed",
            component:()=>import("@/components/User/Conference_viewed.vue"),
          },
          {
            path:"tracked",
            component:()=>import("@/components/User/conference_track.vue"),
          },
          {
            path:"attended",
            component:()=>import("@/components/User/conference_attend.vue"),
          },


          ]
      },
      {
        path:"conference_information",
        name:"conference_information",
        component:()=>import("@/components/Conference_information/Conference_information.vue"),
      },

      {
        path:"user_information",
        component:()=>import("@/components/User/user_information.vue"),

      },
      {
        path:"edituser_information",
        component:()=>import("@/components/User/Userupdateinfo.vue")
      },
      {
        path:"journals",
        component:()=>import("@/components/User/journals.vue"),
        children: [
          {
            path: "viewed",
            component:()=>import("@/components/User/journals.vue"),
          },
          {
            path:"tracked",
            component:()=>import("@/components/User/journals_track.vue"),
          }




        ]
      },
      {
        path:"/Login",
        component:()=>import("@/components/Login.vue"),
      },
      {
        path:"",
        component:()=>import("@/components/User/Page_Views.vue"),
      },
      {
        path:"",
        component:()=>import("@/components/User/Page_Views.vue"),
      },
      {
        path:"",
        component:()=>import("@/components/User/Page_Views.vue"),
      }


    ]
  },

  {
    path: "/homemange",
    component: () => import("@/components/Home/HomeManage.vue"),
    children: [
      {
        path: "/borrowbook",
        component: () => import("@/components/BookManage/BorrowBook.vue"),
      },
      {
        path: "/returnbook",
        component: () => import("@/components/BookManage/ReturnBook.vue"),
      },
      {
        path: "/borrowstatement",
        component: () => import("@/components/BookManage/BorrowStatement.vue"),
      },
      {
        path: "/returnstatement",
        component: () => import("@/components/BookManage/ReturnStatement.vue"),
      },
      {
        path: "/noticemanage",
        component: () => import("@/components/BookManage/NoticeManage.vue"),
      },
      {
        path: "/bookexpire",
        name: "bookexpire",
        component: () => import("@/components/BookManage/BookExpire.vue"),
      },
    ],
  },
  {
    path: "/loginadmin",
    component: () => import("@/components/Admin/LoginAdmin.vue"),
  },
  {
    path: "/homeadmin",
    component: () => import("@/components/Home/HomeAdmin.vue"),
    children: [
      {
        path: "/bookmanage",
        component: () => import("@/components/Admin/BookManage.vue"),
      },
      {
        path: "/booktype",
        component: () => import("@/components/Admin/BookType.vue"),
      },
      {
        path: "/statementmanage",
        component: () => import("@/components/Admin/StatementManage.vue"),
      },
      {
        path: "/statementsearch",
        component: () => import("@/components/Admin/StatementSearch.vue"),
      },
      {
        path: "/statementrulemanage",
        component: () => import("@/components/Admin/StatementRuleManage.vue"),
      },
      {
        path: "/bookadminmanage",
        component: () => import("@/components/Admin/BookAdminManage.vue"),
      },
      {
        path: "/adminmanage",
        component: () => import("@/components/Admin/AdminManage.vue"),
      },
      {
        path: "/intelligent_analysis",
        component: () => import("@/components/Admin/IntelligentAnalysis.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/components/404/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 获取 JWT Token
  if (localStorage.getItem('jwtToken')&& Date.now()<parseInt(localStorage.tokenExpiration)) {
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({path:'/login'});
    }
  }
});
// // //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   //to将要访问的路径
//   //from代表从哪个路径跳转而来
//   //next是一个函数表示放行
//   const tokenStr = window.sessionStorage.getItem("token");
//   if (tokenStr) {
//     next();
//   } else {
//     // 用户未登录判断
//     if (
//       to.path === "/login" ||
//       to.path === "/loginmanage" ||
//       to.path === "/loginadmin"
//     ) {
//       next();
//     } else {
//       next({ path: "/login" });
//     }
//   }
// });
export default router
