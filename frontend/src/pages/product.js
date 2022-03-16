import {
  Routes,
  Route
} from 'react-router-dom'
import ProductAdd from '../components/productAdd'
import Footer from '../components/footer'
import Header from '../components/header'
import ViewProducts from './ViewProducts'
import ProductDetail from '../components/productDetail'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const Products = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/*" element={<>
          <Header />
          <Routes>
            <Route path="add" element={<ProductAdd />} />
            <Route path="list" element={<ViewProducts />} />
            <Route path="history" element={<>history</>} />
            <Route path="detail/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </>} />
      </Routes>
    </ThemeProvider>
  )
}

export default Products