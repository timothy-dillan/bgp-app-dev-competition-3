import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/productCard';
import ProductHero from '../components/productHero';

export default function ViewProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        api.get('product/all')
            .then(res => {
                if (res.status !== 200) {
                    return
                }
                setProducts(res.data.data)
            }).catch(res => {
                navigate('/login', { replace: true })
            })
    }, [navigate]);

    return (
        <main>
            {/* Hero unit */}
            <ProductHero />
            <Container sx={{ py: 4, marginBottom: 10 }} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </Grid>
            </Container>
        </main>
    );
}