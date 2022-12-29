const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) =>{
    res.send('Smart task manager lool running');
});








app.listen(port, ()=>{
    console.log(`Smart task manager lool running on ${port}`);
})