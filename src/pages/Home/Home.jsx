import "./home.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
    </div>
  );
}
