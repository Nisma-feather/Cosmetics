import { useState } from 'react'
import TopHeader from './components/Header'
import NavBar from './components/NavBar'
import "./font.css"
import Banner from './components/Banner'
import AdminDashboard from './components/AdminComponents/AdminDashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AdminBanner from './components/AdminComponents/AdminBanner'
import AdminProducts from './components/AdminComponents/AdminProducts'
import { AddBanner } from './components/AdminComponents/AddBanner'
import AdminAddProduct from './components/AdminComponents/AdminAddProduct'
import Categories from './components/AdminComponents/Categories'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <NavBar/>   
     <Banner/> */}
     <BrowserRouter>
     <Routes>

      {/*Admin Routes */}
      <Route path="/" element={<AdminDashboard/>}>
        <Route path='banner' element={<AdminBanner/>}/>
        <Route path="add_banner" element={<AddBanner/>}/>
        <Route path="product-List" element={<AdminProducts/>}/>
        <Route path='/addProduct' element={<AdminAddProduct/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App
