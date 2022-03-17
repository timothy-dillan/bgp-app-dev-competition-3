import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GetTimeDifference, PriceFormatter } from '../utils/utils';

function GetTimeWording(startTime, endTime) {
    const timeTo = GetTimeDifference(startTime);
    if (Object.keys(timeTo).length > 0) {
        if (timeTo.days > 0) {
            return `${timeTo.days} days before`
        }

        if (timeTo.hours > 0) {
            return `${timeTo.hours} hours before`
        }

        if (timeTo.minutes > 0) {
            return `${timeTo.minutes} minutes before`
        }

        if (timeTo.seconds > 0) {
            return `${timeTo.seconds} seconds before`
        }
    }
    
    const timeLeft = GetTimeDifference(endTime);
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


const ProductCard = (props) => {
    let product = props.product
    const navigate = useNavigate()

    const Navigate = () => {
        navigate('/product/detail/' + product.id)
    }
    return (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={Navigate}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://source.unsplash.com/random"
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
                                    💵  {PriceFormatter(product.bidding_price)}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    {GetTimeWording(product.start_time, product.end_time)}
                                </Typography>
                            </Grid>
                        </Grid>

                    </CardContent>
                </CardActionArea>
                <CardActions xs={{ bottom: '0' }}>
                    <Button size="small">Buy Now</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard