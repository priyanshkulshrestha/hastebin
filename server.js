const express = require("express");
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.get("/",(req, res) =>
{
    const code = `Welcome to HasteBin!
    
Use the commands in the top right corner
to create a new file to share with others.`
    res.render("code-display", {code})
})

app.get("/new", (req,res) => {
    res.render("new")
})

app.post('/save', (req, res) => {
    
})

app.listen(PORT)