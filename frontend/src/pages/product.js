import {
    Routes,
    Route
  } from 'react-router-dom'
  import ProductAdd from '../components/productAdd'
  import Footer from '../components/footer' 


  const Products = () => {
    return(
        <>
        <Routes>
            <Route path="/add" element={ <ProductAdd />} />
            <Route path="/*" element={<>
                            <Routes>
                                <Route path="list" element={<>List</>} />
                                <Route path="history" element={<>history</>} />
                            </Routes>
                            <Footer />
                            </>} />

        </Routes>
        </>
    )
  }

  export default Products