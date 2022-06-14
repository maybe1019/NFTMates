import './header.scss'

import React, { useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../../slices/themeSlice'
import WalletModal from '../WalletModal/WalletModal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  IconButton,
  Drawer,
  Box
} from "@mui/material";
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export default function Header() {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [connectButtonLoading, setConnectButtonLoading] = useState(false)

  return (
    <div className='container'>
      <header>
        <Link className='logo' to='/'>
          <img src={`./image/${theme}-logo.png`} alt="logo" />
        </Link>
        <IconButton aria-label="change theme" onClick={() => dispatch(changeTheme())}>
          {
            theme === 'dark' ?
              <DarkModeIcon />
            : <LightModeIcon />
          }
        </IconButton>
        <button className='account-button' onClick={() => setOpenDrawer(true)}>
        </button>

        <Drawer
          anchor={'right'}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{p: 2, width: 240}} className='drawer'>
            <div>
              <IconButton
                aria-label="close drawer"
                component="span"
                onClick={() => setOpenDrawer(false)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>

            <div className='user-image'>
              <img src="./image/user.png" alt="" />
            </div>
            <LoadingButton
              loading={connectButtonLoading}
              variant='contained'
              endIcon={<AccountBalanceWalletIcon/>}
              onClick={() => {
                setWalletModalOpen(true)
                setConnectButtonLoading(true)
              }}
            >
              Connect Wallet
            </LoadingButton>
          </Box>
        </Drawer>

        <WalletModal
          open={walletModalOpen}
          handleClose={() => {
            setWalletModalOpen(false)
            setConnectButtonLoading(false)
          }}
        />

      </header>
    </div>
  );
}
