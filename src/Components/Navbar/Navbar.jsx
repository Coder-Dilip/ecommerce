import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'

function Navbar({totalItems}) {
    const classes=useStyles();
    const location=useLocation();

  
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Link style={{textDecoration:'none'}} to='/'><Typography variant='h6' className={classes.title}  >
                        <img src='https://cdn.iconscout.com/icon/free/png-512/ecommerce-1742874-1479711.png' alt="Commerce.js" height='35px' className={classes.image} />
                        Shoplity
                    </Typography></Link>
                    <div className={classes.grow} />
                    {location.pathname=='/'?
                    <div className={classes.button}>
                        <Link to='/cart'><IconButton aria-label="Show Cart Items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary' >
                                <ShoppingCart />
                            </Badge>


                        </IconButton></Link>

                    </div>:<div className={classes.button}>
                        <Link to='/cart'><IconButton aria-label="Show Cart Items" color='inherit'>
                      
                                <ShoppingCart />
                            


                        </IconButton></Link>

                    </div>
}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
