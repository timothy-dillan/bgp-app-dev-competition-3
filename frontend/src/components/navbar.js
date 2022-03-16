import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Navbar = () => {
    return (
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
                    <Link
                        variant="button"
                        color="#fff"
                        href="/product/list"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Products
                    </Link>
                    <Link
                        variant="button"
                        color="#fff"
                        href="/bids"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Bids
                    </Link>
                    <Button href="/login" color="secondary" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Logout
                    </Button>
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar