import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({ loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'), loading: Loading });
const Explanation = Loadable({ loader: () => import(/*webpackChunkName:'Explanation'*/'@/views/permission'), loading: Loading });
const AdminPage = Loadable({ loader: () => import(/*webpackChunkName:'AdminPage'*/'@/views/permission/adminPage'), loading: Loading });
const GuestPage = Loadable({ loader: () => import(/*webpackChunkName:'GuestPage'*/'@/views/permission/guestPage'), loading: Loading });
const EditorPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/permission/editorPage'), loading: Loading });


// 品牌
const Brand = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/brand'), loading: Loading });
const AddBrand = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/brand/add'), loading: Loading });

// 订单
const orderList = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/order'), loading: Loading });
const AddOrder = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/order/addOrder'), loading: Loading });


// 商品
const ShopPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/shop'), loading: Loading });
const AddshopPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/shop/addshop'), loading: Loading });
const ShoplistPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/shop/shoplist'), loading: Loading });
const DeleteshopPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/shop/deleteshop'), loading: Loading });
const TshoplistPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/shop/tshoplist'), loading: Loading });
// 客户
const customerPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/customer'), loading: Loading });
const addcustomerPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/customer/addcustomer'), loading: Loading });
// 快递
const Delivery = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/delivery/index'), loading: Loading })
const AddDelivery = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/delivery/add'), loading: Loading })
// 退货订单
const BackStore = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/backStore/index'), loading: Loading })
const AddBack = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/backStore/add'), loading: Loading })
// 商户
const storePage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/storeManage/storePage'), loading: Loading });
const addStore = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/storeManage/addStore'), loading: Loading });
// 评分
const ratingPage = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/ratingManage'), loading: Loading });
// 优惠券
const CouponVoucher = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/coupon/coustomerVoucher'), loading: Loading });
const AddVoucher = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/coupon/voucher'), loading: Loading });
// 轮播图
const SwiperList = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/swiper/swiperList'), loading: Loading });
const AddSwiper = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/swiper/addSwiper'), loading: Loading });
// 购物车
const shopCarList = Loadable({ loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/customer/shopcarPage'), loading: Loading });
// 分类
const CategoryList = Loadable({ loader: () => import(/*webpackChunkName:'CategoryList'*/'@/views/sortmanage'), loading: Loading });
const AddCategory = Loadable({ loader: () => import(/*webpackChunkName:'CategoryList'*/'@/views/sortmanage/addcategory'), loading: Loading });

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin", "editor", "guest"] },
  { path: "/permission/explanation", component: Explanation, roles: ["admin"] },
  { path: "/permission/adminPage", component: AdminPage, roles: ["admin"] },
  { path: "/permission/guestPage", component: GuestPage, roles: ["guest"] },
  { path: "/permission/editorPage", component: EditorPage, roles: ["editor"] },
  { path: "/brand/brandList", component: Brand, roles: ["admin", "editor", "guest"] },
  { path: "/brand/add", component: AddBrand, roles: ["admin", "editor", "guest"] },
  { path: "/order/orderList", component: orderList, roles: ["admin", "editor", "guest"] },
  { path: "/order/addOrder", component: AddOrder, roles: ["admin", "editor", "guest"] },
  { path: "/shop/explanation", component: ShopPage, roles: ["admin", "editor", "guest"] },
  { path: "/shop/addshop", component: AddshopPage, roles: ["admin"] },
  { path: "/shop/shoplist", component: ShoplistPage, roles: ["admin", "editor", "guest"] },
  { path: "/shop/deleteshop", component: DeleteshopPage, roles: ["admin"] },
  { path: "/shop/tshoplist", component: TshoplistPage, roles: ["admin"] },
  { path: "/customer/customerlist", component: customerPage, roles: ["admin"] },
  { path: "/customer/addcustomer", component: addcustomerPage, roles: ["admin"] },
  { path: "/delivery/list", component: Delivery, roles: ["admin", "editor", "guest"] },
  { path: "/delivery/add", component: AddDelivery, roles: ["admin", "editor", "guest"] },
  { path: "/backStore/list", component: BackStore, roles: ["admin", "editor", "guest"] },
  { path: "/backStore/add", component: AddBack, roles: ["admin", "editor", "guest"] },
  { path: "/storeManage/storePage", component: storePage, roles: ["admin", "editor", "guest"] },
  { path: "/storeManage/addStore", component: addStore, roles: ["admin", "editor", "guest"] },
  { path: "/ratingManage/ratingPage", component: ratingPage, roles: ["admin", "editor", "guest"] },
  { path: "/coupon/coustomervoucher", component: CouponVoucher, roles: ["admin"] },
  { path: "/coupon/voucher", component: AddVoucher, roles: ["admin"] },
  { path: "/swiper/swiperlist", component: SwiperList, roles: ["admin"] },
  { path: "/swiper/addswiper", component: AddSwiper, roles: ["admin"] },
  { path: "/customer/shopcarlist", component: shopCarList, roles: ["admin"] },
  { path: "/sortmanage/index", component: CategoryList, roles: ["admin", "editor", "guest"] },
  { path: "/sortmanage/addcategory", component: AddCategory, roles: ["admin", "editor", "guest"] },
];
