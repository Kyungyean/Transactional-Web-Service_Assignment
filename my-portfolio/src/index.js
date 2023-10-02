import React from "react";
import { createRoot } from 'react-dom'; 
import App from "./App";
// const dotenv = require('dotenv')
// const buf = Buffer.from('BASIC=basic')
// const config = dotenv.parse(buf)

const root = createRoot(document.getElementById('root')); 

root.render(<App />); 
