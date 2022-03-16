import {
  Routes,
  Route
} from 'react-router-dom'
import ProductAdd from '../components/productAdd'
import Footer from '../components/footer'
import ViewProducts from './ViewProducts'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const Products = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/*" element={<>
          <Routes>
            <Route path="list" element={<ViewProducts />} />
            <Route path="history" element={<>history</>} />
          </Routes>
          <Footer />
        </>} />
      </Routes>
    </ThemeProvider>
  )
}

export default Products