import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Menu = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SAT Result Management
                    </Typography>
                    <nav>
                        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                            <li>
                                <Button component={Link} to="/insert" color="inherit">Insert Data</Button>
                            </li>
                            <li>
                                <Button component={Link} to="/view-all" color="inherit">View all Data</Button>
                            </li>
                            <li>
                                <Button component={Link} to="/get-rank" color="inherit">Get Rank</Button>
                            </li>
                            <li>
                                <Button component={Link} to="/update-score" color="inherit">Update Score</Button>
                            </li>
                            <li>
                                <Button component={Link} to="/delete-record" color="inherit">Delete Record</Button>
                            </li>
                        </ul>
                    </nav>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Menu;
