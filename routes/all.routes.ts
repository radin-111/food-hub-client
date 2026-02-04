import {
  Home,
  BarChart3,
  Users,
  ShoppingBag,
  ClipboardList,
  User,
  Utensils,
  ShoppingCart,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { TbCategoryFilled } from "react-icons/tb";
export const userRoutes = {
  adminRoutes: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Statistics",
      url: "/admin-dashboard",
      icon: BarChart3,
    },
    {
      title: "Users",
      url: "/admin-dashboard/users",
      icon: Users,
    },
    {
      title: "Categories",
      url: "/admin-dashboard/categories",
      icon: TbCategoryFilled ,
    },
    {
      title: "Orders",
      url: "/admin-dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Provider profiles",
      url: "/admin-dashboard/provider-profiles",
      icon: UserCheck ,
    },
    {
      title: "Provider requests",
      url: "/admin-dashboard/provider-requests",
      icon: ClipboardList,
    },
    {
      title: "Profile",
      url: "/admin-dashboard/profile",
      icon: User,
    },
  ],

  providerRoutes: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Statistics",
      url: "/provider-dashboard",
      icon: BarChart3,
    },
    {
      title: "Meals",
      url: "/provider-dashboard/meals",
      icon: Utensils,
    },
    {
      title: "Orders",
      url: "/provider-dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Profile",
      url: "/provider-dashboard/profile",
      icon: User,
    },
  ],

  customerRoutes: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Cart",
      url: "/customer-dashboard/cart",
      icon: ShoppingCart,
    },
    {
      title: "Checkout",
      url: "/customer-dashboard/checkout",
      icon: CreditCard,
    },
    {
      title: "Orders",
      url: "/customer-dashboard/orders",
      icon: ClipboardList,
    },
    {
      title: "Profile",
      url: "/customer-dashboard/profile",
      icon: User,
    },
  ],
};
