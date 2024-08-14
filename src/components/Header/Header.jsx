import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Header as StyledHeader } from "../../styledComponents/Header";
import { useTheme } from "../../context/themeContext";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const { theme } = useTheme();
  const count = useSelector((state) => state.cart.count);
  console.log("COUNT", count);

  return (
    <>
      <StyledHeader theme={theme}>
        <Box
          component='form'
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField label='Search' variant='outlined' />
        </Box>
        <nav>
          <Link to='/profile'>Profile</Link>
        </nav>
        <Link to='/cart'>
          <IconButton color='primary' aria-label='add to shopping cart'>
            <Badge badgeContent={count} color='primary'>
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </StyledHeader>
    </>
  );
};
