import "./home.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NFTItem from './../../components/NFTItem/NFTItem';

const dropNfts = [
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_1.jpg',
    name: 'Walking On Air',
    price: 0.5,
    chainId: 1,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_1.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_2.jpg',
    name: 'Native Infinite',
    price: 0.7,
    chainId: 1,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_2.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_3.jpg',
    name: 'Mighty House',
    price: 1.1,
    chainId: 56,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_3.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_4.jpg',
    name: 'Black Factory',
    price: 0.8,
    chainId: 56,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_4.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_5.jpg',
    name: 'Oddy Deer',
    price: 1000,
    chainId: 137,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_5.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_6.jpg',
    name: 'Purple Spider',
    price: 1500,
    chainId: 137,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_6.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_7.jpg',
    name: 'Killer Dancer',
    price: 10,
    chainId: 43114,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_7.jpg'
  },
  {
    img: 'https://netstorm-react.theme-land.com/img/auction_8.jpg',
    name: 'Gaming Chair',
    price: 15,
    chainId: 43114,
    creatorImg: 'https://netstorm-react.theme-land.com/img/avatar_8.jpg'
  },
]

export default function Home() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="home">
      <div className="banner">
        <div
          className="bg-color"
          style={{
            backgroundColor: theme === "light" ? "white" : "black",
          }}
        ></div>
        <div className="container">
          <div>
            <h1>
              Create your collection <br /> Meet your mates
            </h1>
            <div className="btn-group">
              <Button variant="contained" color="secondary">
                Explore
              </Button>
              <Link to="/create">
                <Button variant="contained">
                  Create
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <img src="./image/banner.png" alt="banner" />
          </div>
        </div>
      </div>

      <div className="notable-drops container">
        <h1>Notable Drops</h1>
        <div className='items'>
          {
            dropNfts.map((item, index) => (
              <div className="item-container">
                <NFTItem {...item} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
