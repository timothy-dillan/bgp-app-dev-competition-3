import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../utils/api';
import GetTimeLeft from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/productCard';
import ProductHero from '../components/productHero';

const theme = createTheme();

function GetTimeLeftWording(endTime) {
    const timeLeft = GetTimeLeft(endTime);
    if (Object.keys(timeLeft).length <= 0) {
        return "Ended."
    }

    if (timeLeft.days > 0) {
        return `${timeLeft.days} days left`
    }

    if (timeLeft.hours > 0) {
        return `${timeLeft.hours} hours left`
    }

    if (timeLeft.minutes > 0) {
        return `${timeLeft.minutes} minutes left`
    }

    if (timeLeft.seconds > 0) {
        return `${timeLeft.seconds} seconds left`
    }
}

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
                <Container sx={{ py: 4, marginBottom:10 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {console.log(products)}
                        {products.map((product) => (
                            <ProductCard product={product} />
                        ))}
                    </Grid>
                </Container>
            </main>   
     );
}