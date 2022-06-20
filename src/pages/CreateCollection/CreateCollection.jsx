import "./create-collection.scss";

import React, { useRef, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useSnackbar } from "notistack";
import { useEthers } from "@usedapp/core";

export default function CreateCollection() {
  const fields = [
    {
      name: "name",
      title: "Name of your collection",
      placeholder: "Bored Ape Yacht Club",
      inputRef: useRef(),
    },
    {
      name: "symbol",
      title: "Symbol of your collection",
      placeholder: "BAYC",
      inputRef: useRef(),
    },
    {
      name: "imgUrl",
      title: "Link of your collection metadata",
      placeholder: "ipfs://...",
      inputRef: useRef(),
    },
    {
      name: "size",
      title: "Size of your collection",
      placeholder: "The number of items in your collection",
      inputRef: useRef(),
    },
    {
      name: "price",
      title: "Price for each NFT",
      placeholder: "The Price for each NFT sold from your collection",
      inputRef: useRef(),
    },
  ];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { account } = useEthers();

  const [createLoading, setCreateLoading] = useState(false);
  const [revenueSplit, setRevenueSplit] = useState(false);
  const [revenueList, setRevenueList] = useState([]);
  const [ownerAmount, setOwnerAmount] = useState(100);
  const [warningKey, setWarningKey] = useState(-1);

  let f = false;
  if (f) {
    setCreateLoading(true);
  }

  useEffect(() => {
    let amount = 100;
    revenueList.forEach((r) => {
      let t = parseInt(r.amount);
      if (isNaN(t)) t = 0;
      amount -= t;
    });
    setOwnerAmount(amount);
  }, [revenueList]); //eslint-disable-line

  useEffect(() => {
    if (account && warningKey !== -1) {
      closeSnackbar(warningKey);
      setWarningKey(-1);
      return;
    }
    if (!account && warningKey === -1) {
      setWarningKey(
        enqueueSnackbar("Wallet Unconnected!", {
          variant: "warning",
          persist: true,
        })
      );
    }
  }, [account]); //eslint-disable-line

  const handleCreate = () => {};

  const handleRevenueSplit = () => {
    setRevenueSplit((prev) => !prev);
  };

  const handleAddNewRevenueAccount = () => {
    let tmp = revenueList.map((e) => e);
    tmp.push({
      account: "",
      amount: "",
    });
    setRevenueList(tmp);
  };

  const handleRevenueValueChange = (e, field, ind) => {
    let tmp = revenueList.map((e) => e);
    tmp[ind][field] = e.target.value;
    setRevenueList(tmp);
  };

  const handleRemoveRevenueAccount = (index) => {
    let tmp = [];
    revenueList.forEach((e, i) => {
      if (i === index) return;
      tmp.push(e);
    });
    setRevenueList(tmp);
  };

  return (
    <div className="create-collection page">
      <div className="container">
        <h1>Create NFT Collection</h1>
        <h3>Details</h3>
        <Paper component="div" sx={{ pt: 2, pb: 4, pl: 3, pr: 3 }}>
          {fields.map((f) => (
            <div className="field" key={f.name}>
              <p>{f.title}</p>
              <OutlinedInput
                name={f.name}
                placeholder={f.placeholder}
                inputRef={f.inputRef}
                fullWidth={true}
              />
            </div>
          ))}

          <FormControlLabel
            label="Revenue Split"
            control={
              <Checkbox checked={revenueSplit} onChange={handleRevenueSplit} />
            }
            sx={{ pt: 2, pb: 1 }}
          />
          {revenueSplit ? (
            <div className="revenue-list">
              <div className="revenue-item">
                <div className="account">
                  <OutlinedInput
                    name="account"
                    placeholder=""
                    value={account ? account : "0x..."}
                    fullWidth={true}
                    disabled={true}
                  />
                </div>
                <div className="amount">
                  <OutlinedInput
                    name="percent"
                    placeholder=""
                    value={ownerAmount}
                    fullWidth={true}
                    disabled={true}
                  />
                  %
                </div>
                <div className="add">
                  <IconButton
                    color="success"
                    onClick={handleAddNewRevenueAccount}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </div>
              </div>
              {revenueList.map((rev, index) => (
                <div className="revenue-item" key={index}>
                  <div className="account">
                    <OutlinedInput
                      name="account"
                      placeholder="0x..."
                      value={rev.account}
                      onChange={(e) =>
                        handleRevenueValueChange(e, "account", index)
                      }
                      fullWidth={true}
                    />
                  </div>
                  <div className="amount">
                    <OutlinedInput
                      name="percent"
                      placeholder="0"
                      value={rev.amount}
                      fullWidth={true}
                      onChange={(e) =>
                        handleRevenueValueChange(e, "amount", index)
                      }
                    />
                    %
                  </div>
                  <div className="add">
                    <IconButton
                      color="success"
                      onClick={() => handleRemoveRevenueAccount(index)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <LoadingButton
            loading={createLoading}
            onClick={handleCreate}
            variant="contained"
            fullWidth={true}
            sx={{ mt: 3, p: 1 }}
            endIcon={<AddCircleIcon />}
          >
            Create
          </LoadingButton>
        </Paper>
      </div>
    </div>
  );
}
