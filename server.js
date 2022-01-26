const express = require("express");
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

const Document = require('./models/Document');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hastebin', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


app.get("/",(req, res) =>
{
    const code = `Welcome to HasteBin!
    
# Haste

Sharing code is a good thing, and it should be _really_ easy to do it.
A lot of times, I want to show you something I'm seeing - and that's where we
use pastebins.
    
Haste is the prettiest, easiest to use pastebin ever made.

## Basic Usage

Type what you want me to see, click "Save", and then copy the URL.  Send that
URL to someone and they'll see what you see.

To make a new entry, click "New" `
    res.render("code-display", {code, language: 'plaintext'})
})

app.get("/new", (req,res) => {
    res.render("new")
})

app.post('/save', async (req, res) => {
    const value = req.body.value;
    console.log(value);
    try{    
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e){
        // res.render("new", {value})  
        console.log(e)
    }
}) 

app.get('/:id/duplicate', async(req,res) => {
    const id = req.params.id
    try{
        const document = await Document.findById(id)

        res.render("new", {value: document.value})
    } catch(e) {
        res.redirect(`/${id}`)
    }
})

app.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const document = await Document.findById(id)

        res.render("code-display", {code: document.value, id})
    } catch(e) {
        res.redirect("/")
        console.log(e)
    }
})

app.listen(PORT)