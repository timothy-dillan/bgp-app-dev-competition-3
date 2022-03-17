import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import { fontSize } from '@mui/system';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GetTimeDifference, PriceFormatter } from '../utils/utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SnackbarAlert } from '../components/SnackbarAlert';

function GetTimeWording(startTime, endTime) {
    const timeTo = GetTimeDifference(startTime);
    if (Object.keys(timeTo).length > 0) {
        if (timeTo.days > 0) {
            return `starts in ${timeTo.days} days`
        }

        if (timeTo.hours > 0) {
            return `starts in ${timeTo.hours} hours`
        }

        if (timeTo.minutes > 0) {
            return `starts in ${timeTo.minutes} minutes`
        }

        if (timeTo.seconds > 0) {
            return `starts in ${timeTo.seconds} seconds`
        }
    }

    const timeLeft = GetTimeDifference(endTime);
    if (Object.keys(timeLeft).length <= 0) {
        return "has ended."
    }

    if (timeLeft.days > 0) {
        return `ends in ${timeLeft.days} days.`
    }

    if (timeLeft.hours > 0) {
        return `ends in ${timeLeft.hours} hours.`
    }

    if (timeLeft.minutes > 0) {
        return `ends in ${timeLeft.minutes} minutes.`
    }

    if (timeLeft.seconds > 0) {
        return `ends in ${timeLeft.seconds} seconds.`
    }
}

const IsBiddingAllowed = (startTime, endTime) => {
    const timeTo = GetTimeDifference(startTime);
    const timeLeft = GetTimeDifference(endTime);
    return Object.keys(timeTo).length > 0 || Object.keys(timeLeft).length <= 0;
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ProductDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [bids, setBids] = useState([]);
    const [bidAmount, setBidAmount] = useState("");
    const [expanded, setExpanded] = useState('panel1');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("Successfully placed bid.");

    const changeBidAmount = e => {
        setBidAmount(e.target.value);
    }
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const showSnackbar = (severity, message) => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    }

    const createBid = (amount) => {
        if (isNaN(amount - parseFloat(amount))) {
            showSnackbar("warning", "Please enter a number.");
            return
        }
        amount = parseInt(amount);
        let userID = 0;
        api.get('user_id/from_session')
            .then(res => {
                userID = parseInt(res.data.data)
                const payload = {
                    "bidder": userID,
                    "product_id": parseInt(id),
                    "bidding_price": amount
                }
                api.post('bid/add', payload)
                    .then(res => {
                        if (res.status !== 200) {
                            return
                        }
                        showSnackbar("success", res.data.message);
                        getBids(id);
                    }).catch(res => {
                        showSnackbar("error", res.response.data.message);
                    })
            }).catch(res => {
                console.log(res)
                showSnackbar("error", res.response.data.message);
                /*setTimeout(function () {
                    navigate('/login', { replace: true })
                }, 1000);*/
            })
    }

    const getProductDetail = (id) => {
        api.get('product/detail/' + id)
            .then(res => {
                if (res.status !== 200) {
                    return
                }
                if (res.data.data !== null) {
                    setProduct(res.data.data)
                }
            }).catch(res => {
                navigate('/login', { replace: true })
            })
    }

    const getBids = (id) => {
        api.get('bid/product/' + id)
            .then(res => {
                if (res.status !== 200) {
                    return
                }
                if (res.data.data !== null) {
                    setBids(res.data.data)
                }
            }).catch(res => {
                navigate('/login', { replace: true })
            })
    }

    useEffect(() => {
        getProductDetail(id);
        getBids(id);
    }, [id]);

    return (
        <Container maxWidth="lg" sx={{ paddingX: '20vw', paddingY: '8vh' }} >
            <SnackbarAlert open={open} closeSnackbar={closeSnackbar} severity={severity} message={message} />
            <Grid container spacing={2}>
                <Grid item xs={4} style={{ marginTop: "1vh" }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            sx={{ height: "26vw" }}
                            image="https://source.unsplash.com/random"
                        />
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
                        {product.owner}
                    </Typography>
                    <Typography variant="h3" textAlign="left">
                        {product.name}
                    </Typography>
                    <Typography variant="h5" textAlign="left" style={{ marginTop: "1vh" }}>
                        <AccessTimeIcon></AccessTimeIcon> The auction for this item {GetTimeWording(product.start_time, product.end_time)}
                    </Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ marginTop: "1vh" }}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Offer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" textAlign="left">
                                        Current price
                                    </Typography>
                                    <Typography variant="h4" textAlign="left" style={{ marginTop: "2vh" }}>
                                        💵 {PriceFormatter(product.bidding_price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" textAlign="left">
                                        Your bid
                                    </Typography>
                                    <Typography variant="h4" textAlign="left" style={{ marginTop: "1vh" }}>
                                        <TextField required placeholder="💵 90k" disabled={IsBiddingAllowed(product.start_time, product.end_time)} id="outlined-size-normal" value={bidAmount} onChange={changeBidAmount} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" size="large" disabled={IsBiddingAllowed(product.start_time, product.end_time)} style={{ width: "100%", height: "100%", marginLeft: "4vh" }} onClick={() => createBid(bidAmount)}>Bid Now</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Product Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography textAlign="left">
                                {product.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Offers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Bidder</TableCell>
                                            <TableCell>Bid Amount (GoPay Coins)</TableCell>
                                            <TableCell>Bid Amount (IDR)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bids.map((bid) => (
                                            <TableRow
                                                key={bid.bidder_name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {bid.bidder_name}
                                                </TableCell>
                                                <TableCell>{PriceFormatter(bid.bidding_price)}</TableCell>
                                                <TableCell>Rp. {PriceFormatter(bid.bidding_price * 100)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Container>

    )
}

export default ProductDetail