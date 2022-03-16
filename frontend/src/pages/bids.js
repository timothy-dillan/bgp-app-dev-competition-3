import '../App.css'
import Footer from "../components/footer";
import { BidCard } from "../components/bid";
import { Box, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";

const BidsPage = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Grid justifyContent="center">
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    Bids
                </Typography>
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