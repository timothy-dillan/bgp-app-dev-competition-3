import '../App.css'
import Header from '../components/header'
import Footer from "../components/footer";
import { BidCard } from "../components/bid";
import { Box, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import api from '../utils/api';
import { useEffect, useState } from 'react';
import { GetTimeDifference, PriceFormatter } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { SnackbarAlert } from '../components/SnackbarAlert';

const GetBidStatus = (startTime, endTime) => {
    const timeTo = GetTimeDifference(startTime);
    const timeLeft = GetTimeDifference(endTime);
    if (Object.keys(timeTo).length > 0) {
        return "not_started"
    }
    if (Object.keys(timeLeft).length <= 0) {
        return "end"
    }
    return "in_progress";
}

const BidsPage = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    const [bids, setBids] = useState([]);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("Successfully placed bid.");

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const showSnackbar = (severity, message) => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    }

    const getBids = () => {
        let userID = 0;
        api.get('user_id/from_session')
            .then(res => {
                userID = parseInt(res.data.data)
                api.get('bid/user/' + userID)
                    .then(res => {
                        if (res.status !== 200) {
                            return
                        }
                        if (res.data.data !== null) {
                            setBids(res.data.data)
                        }
                    }).catch(res => {
                        if (res.response.status === 401) {
                            setTimeout(function () {
                                navigate('/login', { replace: true })
                            }, 1500);
                        }
                        showSnackbar("error", res.response.data.message);
                    })
            }).catch(res => {
                if (res.response.status === 401) {
                    setTimeout(function () {
                        navigate('/login', { replace: true })
                    }, 1500);
                }
                showSnackbar("error", res.response.data.message);
            })
    }

    useEffect(() => {
        getBids();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <SnackbarAlert open={open} closeSnackbar={closeSnackbar} severity={severity} message={message} />
            <Grid justifyContent="center">
                <Container maxWidth="lg">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx={{ marginTop: "5vh" }}
                    >
                        Your Recent Bids
                    </Typography>
                </Container>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    margin: 'auto',
                }} justifyContent="center"
                >
                    {bids.map((bid) => (
                        <BidCard product_name={bid.product_name} image={bid.product_image} status={GetBidStatus(bid.product_start_time, bid.product_end_time)} current_bid={PriceFormatter(bid.latest_bidding_price)} my_bid={PriceFormatter(bid.bidding_price)} />
                    ))}
                </Box>
            </Grid>
            <Footer />
        </ThemeProvider>
    )
}

export default BidsPage