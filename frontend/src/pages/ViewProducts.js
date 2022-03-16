import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import api from '../utils/api';
import GetTimeLeft from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Discover, collect, and sell extraordinary items.
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            BidSys is the world's first and largest auction marketplace.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Sell Now</Button>
                            <Button variant="outlined">Buy Now</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 4 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {console.log(products)}
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.image}
                                            alt="random"
                                            sx={{ height: "15vw" }}
                                        />
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} sx={{ textAlign: 'left' }}>
                                                    <Typography>
                                                        {product.owner}
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="caption" display="block">
                                                        {product.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                                    <Typography>
                                                        {"Price"}
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        💵 {product.bidding_price}
                                                    </Typography>
                                                    <Typography variant="caption" display="block">
                                                        {GetTimeLeftWording(product.end_time)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small">Buy Now</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}