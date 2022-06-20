import axios from "axios";

const instance = axios.create({
//  baseURL: 'http://149.56.95.155/api/',
  baseURL: 'http://127.0.0.1:4000/api',
  timeout: 5000,
})

export const saveProfile = async (profile) => {
  const res = await instance.post('/user/save', {profile})
  return res.data
}

export const loadProfile = async (account) => {
  const res = await instance.post('/user', {account})
  return res.data
}