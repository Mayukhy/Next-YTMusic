'use client'

import axios from "axios";

const instance = axios.create({
  baseURL: 'https://shazam-api7.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '7109928e0bmsh507c1dd3b0910dfp168636jsn5f2d5614e915',
    'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
  }
});

export default instance;