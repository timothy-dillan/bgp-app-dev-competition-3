import '../App.css'
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import Container from '@mui/material/Container';
import { BidCard } from "../components/bid";
import { Box, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";

const BidsPage = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
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
                            Bids List
                        </Typography>
                    </Container>
                </Box>
            <Grid justifyContent="center">
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    maxWidth: 1000,
                    borderRadius: 1,
                    margin: 'auto',
                }} justifyContent="center"
                >
                    <BidCard product_name={"Product Sample"} status={"in_progress"} current_bid={"60.000"} my_bid={"15.000"} />
                    <BidCard product_name={"Product Sample"} status={"end"} state={"won"} />
                    <BidCard product_name={"Product Sample"} status={"not_started"} />
                    <BidCard product_name={"Product Sample"} status={"in_progress"} current_bid={"60.000"} my_bid={"15.000"} />
                    <BidCard product_name={"Product Sample"} status={"end"} state={"lost"} />
                    <BidCard product_name={"Product Sample"} status={"not_started"} />
                </Box>
            </Grid>
            <Footer />
        </ThemeProvider>
    )
}

export default BidsPage