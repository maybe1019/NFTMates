import "./edit-profile.scss";

import React, { useRef, useState, useEffect } from "react";
import { OutlinedInput, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import { useEthers } from '@usedapp/core';
import { useSnackbar } from "notistack";
import { loadProfile, saveProfile } from './../../utils/axios';

export default function EditProfile() {

  const fields = [
    {
      name: "name",
      title: "Username",
      placeholder: "Username1",
      inputRef: useRef(),
    },
    {
      name: "email",
      title: "Email",
      placeholder: "abc@xyz.com",
      inputRef: useRef(),
    },
    {
      name: "twitter",
      title: "Twitter",
      placeholder: "@account",
      inputRef: useRef(),
    },
    {
      name: "discord",
      title: "Discord",
      placeholder: "Account#123",
      inputRef: useRef(),
    },
    {
      name: "instagram",
      title: "Instagram",
      placeholder: "Instagram",
      inputRef: useRef(),
    },
    {
      name: "facebook",
      title: "Facebook",
      placeholder: "Facebook",
      inputRef: useRef(),
    },
  ];

  const [saveLoading, setSaveLoading] = useState(false)

  const { account } = useEthers()
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = async () => {
    if(fields[0].inputRef.current.value === '' || fields[1].inputRef.current.value === '') {
      enqueueSnackbar('Please input username and email.', { variant: 'warning' })
      return
    }
    setSaveLoading(true)

    let data = {
      account
    }
    fields.forEach(e => {
      data[e.name] = e.inputRef.current.value
    })
    try {
      await saveProfile(data)
      enqueueSnackbar("Success", { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar("Failed", { variant: 'error' })
    }
    
    setSaveLoading(false)
  }

  useEffect(() => {
    if(!account) return
    const func = async () => {
      const res = await loadProfile(account)
      if(res.profile) {
        fields.forEach(e => {
          e.inputRef.current.value = res.profile[e.name]
        })
      }
    }
    func()
  }, [account]) //eslint-disable-line

  return (
    <div className="edit-profile container page">
      <h1>Edit your profile</h1>
      <div className="placeholder">
        <img src="./image/placeholder.png" alt="placeholder" />
      </div>
      <div className="user-image">
        <img src="./image/user.png" alt="user" />
      </div>

      <Paper
        component="div"
        sx={{ pt: 2, pb: 4, pl: 3, pr: 3, mt: -4, borderRadius: 4 }}
      >
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
        <LoadingButton
          loading={saveLoading}
          variant='contained'
          fullWidth={true}
          endIcon={<SendIcon/>}
          sx={{mt: 4, p: 1}}
          disabled={account === undefined}
          onClick={handleSave}
        >
          {
            account ? "s a v e" : 'connect wallet'
          }
        </LoadingButton>
      </Paper>
    </div>
  );
}
