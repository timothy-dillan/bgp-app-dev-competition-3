import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';


const pages = {
    'Explore': '/product/list',
    'Bids': '/bids',
    'Create Products': '/product/add'
};

const ResponsiveAppBar = () => {
    const navigate = useNavigate()

    const NavigateTo = (url) => (
        () => {
            navigate(url, { replace: true })
        }
    )
    return (
        <>
            <CssBaseline />
            <AppBar
                position="static"
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'left' }}>
                        BidSys
                    </Typography>
                    <nav>
                        {Object.entries(pages).map((page) => (
                            <Link
                                variant="button"
                                color="#fff"
                                href="#"
                                sx={{ my: 1, mx: 1.5 }}
                                onClick={NavigateTo(page[1])}
                            >
                                {page[0]}
                            </Link>
                        ))}
                    </nav>
                    <Button href="/login" color="secondary" variant="outlined" sx={{ my: 1, mx: 1.5, color: "white" }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default ResponsiveAppBar;