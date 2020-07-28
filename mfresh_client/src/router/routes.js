import Home from "../pages/Home"
import About from "../pages/About"
import News from "../pages/News"
import Product from "../pages/Product"
import Contact from "../pages/Contact"
import Cart from "../pages/Cart"
import News_details from "../pages/News_details"
import Product_details from "../pages/Product_details"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Order_confirm from "../pages/Order_confirm"

export const routes = 
  [
    {
      path:"/",
      name:"home",component:Home
    },
    {
      path:"/about",
      name:"about",component:About
    },
    {
      path:"/news",
      name:"news",component:News
    },
    {
      path:"/product",
      name:"product",component:Product
    },
    {
      path:"/contact",
      name:"contact",component:Contact
    },
    {
      path:"/cart",
      name:"cart",component:Cart
    },
    {
      path:"/news_details",
      name:"news_details",component:News_details
    },
    {
      path:"/product_details",
      name:"Product_details",component:Product_details
    },
    {
      path:"/register",
      name:"Register",component:Register
    },
    {
      path:"/login",
      name:"Login",component:Login        
    },
    {
      path:"/order_confirm",
      name:"Order_confirm",component:Order_confirm
    }    
  ]
  