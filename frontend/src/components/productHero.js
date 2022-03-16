import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const ProductHero = () => (
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
)

export default ProductHero