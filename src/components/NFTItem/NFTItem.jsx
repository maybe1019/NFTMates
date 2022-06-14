import './nft-item.scss'

import React from 'react'
import { Paper } from '@mui/material';

import networks from '../../config/networks.json'

export default function NFTItem({ img, name, price, chainId, creatorImg }) {
  return (
    <Paper sx={{p:2, borderRadius: 3}}>
      <div className='nft-item'>
        <div className='nft-image' style={{backgroundImage: `url(${img})`}}>
        </div>
        <div className='nft-name'>{name}</div>
        <div className='nft-price'>
          <img src={`./image/crypto/${networks[chainId].nativeCurrency.symbol.toLowerCase()}.svg`} alt={chainId} />
          {price}
        </div>
      </div>
    </Paper>
  )
}
