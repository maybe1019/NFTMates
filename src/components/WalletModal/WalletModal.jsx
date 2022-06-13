import './wallet-modal.scss'

import { Box, Dialog } from '@mui/material'
import React from 'react'
import { useEthers } from '@usedapp/core';
import WalletConnectProvider from '@walletconnect/web3-provider'

import config from '../../config/config.json'

export default function WalletModal({ open, handleClose }) {

  const { activateBrowserWallet, activate } = useEthers()

  const handleConnectWallet = async wallet => {
    try {
      if(wallet === 'metamask') {
        await activateBrowserWallet()
      }
      else if(wallet === 'connectwallet') {
        const provider = new WalletConnectProvider({
          infuraId: config.infuraId,
        })
        await provider.enable()
        await activate(provider)
      }
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{m:0}}
    >
      <Box
        sx={{p: 2}}
        component='div'
        className='wallet-modal'
      >
        <div className='modal-header'>Connect Wallet</div>
        <div className='buttons'>
          {
            window.ethereum && window.ethereum.isMetaMask ? 
              <div className='wallet-button' onClick={() => handleConnectWallet('metamask')}>
                <div>Metamask</div>
                <img src="./image/wallet/metamask.svg" alt="metamask" />
              </div>
            : ''
          }
          <div className='wallet-button' onClick={() => handleConnectWallet('connectwallet')}>
            <div>Wallet Connect</div>
            <img src="./image/wallet/walletconnect.png" alt="wallet-connect" />
          </div>
        </div>
      </Box>
    </Dialog>
  )
}
