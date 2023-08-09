/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "guest"]
  },
  {
    title: "商品管理",
    path: "/shop",
    icon: "shop",
    children: [
      {
        title: "商品列表",
        path: "/shop/shoplist",
        roles: ["admin", "editor", "guest"]
      },
      {
        title: "添加商品",
        path: "/shop/addshop",
        roles: ["admin"]
      },
      {
        title: "商品列表",
        path: "/shop/deleteshop",
        roles: ["admin"]
      },
      {
        title: "商品详情列表",
        path: "/shop/tshoplist",
        roles: ["admin"]
      },
      {
        title: "添加商品详情",
        path: "/shop/explanation",
        roles: ["admin", "editor", "guest"]
      },
    ]
  },
  {
    title: "客户管理",
    path: "/customer",
    icon: "user",
    children: [
      {
        title: "用户列表",
        path: "/customer/customerlist",
        roles: ["admin"]
      },
      {
        title: "添加用户",
        path: "/customer/addcustomer",
        roles: ["admin"]
      },
      {
        title: "用户购物车列表",
        path: "/customer/shopcarlist",
        roles: ["admin"]
      }
    ]
  },
  {
    title: "分类管理",
    path: "/sortmanage",
    icon: "unordered-list",
    roles: ["admin", "editor", "guest"],
    children: [
      {
        title: '分类管理',
        path: '/sortmanage/index',
        roles: ["admin", "editor", "guest"]
      },
      {
        title: '添加分类',
        path: '/sortmanage/addcategory',
        roles: ["admin", "editor", "guest"]
      }
    ]
  },
  {
    title: "品牌管理",
    path: "/brand",
    icon: "snippets",
    roles: ["admin", "editor", "guest"],
    children: [
      {
        title: "品牌列表",
        path: "/brand/brandList",
        roles: ["admin", "editor", "guest"],
      },
      {
        title: "添加品牌",
        path: "/brand/add",
        roles: ["admin", "editor", "guest"],
      },
    ]
  },
  {
    title: "优惠卷",
    icon: 'account-book',
    path: "/coupon",
    roles: ["admin",],
    children: [
      {
        title: '优惠卷列表',
        path: "/coupon/voucher",
        roles: ["admin"]
      },
      {
        title: '添加优惠卷',
        path: "/coupon/coustomervoucher",
        roles: ['admin']
      }
    ]
  },
  {
    title: "轮播图管理",
    path: "/swiper",
    icon: "file-image",
    roles: ["admin", "editor", "guest"],
    children: [
      {

        title: 'swiper列表',
        path: "/swiper/swiperlist",
        roles: ["admin"]
      },
      {
        title: '添加swiper',
        path: "/swiper/addswiper",
        roles: ["admin"]
      },
    ]
  },
  {
    title: "商户页面",
    path: "/storeManage",
    icon: "audit",
    roles: ["admin", "editor", "guest"],
    children: [
      {
        title: "商户管理页面",
        path: "/storeManage/storePage",
        roles: ["editor"]
      },
      {
        title: "添加商户页面",
        path: "/storeManage/addStore",
        roles: ["editor"]
      },
    ]
  },
  {
    title: "评分管理",
    path: "/ratingManage",
    icon: "star",
    children: [
      {
        title: "评分列表",
        path: "/ratingManage/ratingPage",
        roles: ["admin", "editor", "guest"]
      },
    ]
  },
  {
    title: '订单',
    path: '/order',
    icon: 'container',
    children: [
      {
        title: '订单列表',
        path: '/order/orderList',
        roles: ["admin", "editor", "guest"]
      },
      {
        title: '添加订单',
        path: '/order/addOrder',
        roles: ["admin", "editor", "guest"]
      },
    ]
  },
  {
    title: "快递管理",
    path: "/delivery",
    icon: "gift",
    children: [
      {
        title: "快递列表",
        path: "/delivery/list",
        roles: ["admin", "editor", "guest"]
      },
      {
        title: "添加快递",
        path: "/delivery/add",
        roles: ["admin", "editor", "guest"]
      }
    ],
  },
  {
    title: "退货管理",
    path: "/backStore",
    icon: "code",
    children: [
      {
        title: "退款列表",
        path: "/backStore/list",
        roles: ["admin", "editor", "guest"]
      },
      {
        title: "添加退款订单",
        path: "/backStore/add",
        roles: ["admin", "editor", "guest"]
      },
    ],
  },
  {
    title: "权限测试",
    path: "/permission",
    icon: "lock",
    children: [
      {
        title: "权限说明",
        path: "/permission/explanation",
        roles: ["admin"]
      },
      {
        title: "admin页面",
        path: "/permission/adminPage",
        roles: ["admin"]
      },
      {
        title: "guest页面",
        path: "/permission/guestPage",
        roles: ["guest"]
      },
      {
        title: "editor页面",
        path: "/permission/editorPage",
        roles: ["editor"]
      },
    ],
  },
];
export default menuList;
