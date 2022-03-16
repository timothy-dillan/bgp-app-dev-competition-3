import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import { fontSize } from '@mui/system';
import Container from '@mui/material/Container';



const ProductDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [Name, SetName] = useState("")
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("")
    const [start, setStart] = useState(new Date());
    const [start_time, setStartTime] = useState("");

    useEffect(() => {
        api.get('product/detail/' + id)
            .then(res => {
                console.log(res)
                if (res.status !== 200) {
                    return
                }
                //SetSrc(res.data.data.image)
                SetName(res.data.data.name)
                setprice(res.data.data.price_determinant)
                setdesc(res.data.data.description)
                setStart(res.data.data.start_time)
                //setEnd(res.data.data.end_time)
            }).catch(res => {
                navigate('/login', { replace: true })
            })
    }, []);
    useEffect(() => {
        let d = new Date(start)
        setStartTime(d.toLocaleDateString('id-ID') + " " + d.toLocaleTimeString())
    }, [start]);

    return (
        <Container sx={{ py: 4, height: '40vh' }} maxWidth="lg">
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image="https://source.unsplash.com/random"
                            alt="random"
                            sx={{ height: "5vh" }}
                        />
                        <CardContent>
                            <Stack spacing={1} justifyContent="center" alignItems="center">
                                <Typography sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
                                    {Name}
                                </Typography>
                                <Typography sx={{ fontSize: '1.8rem' }} >
                                    {desc}
                                </Typography>
                                <Grid container spacing={2} sx={{ marginX: 10 }}>
                                    <Grid item xs={4} sx={{ textAlign: 'left' }}>
                                        <Typography variant="caption" display="block" sx={{ fontSize: '1.8rem', textAlign: 'right' }}>
                                            📅  {start_time}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                        <Typography variant="caption" display="block" sx={{ fontSize: '1.8rem' }}>
                                            💵  {price}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Container>

    )
}

export default ProductDetail