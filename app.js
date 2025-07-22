const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public")); 
 
app.get("/", (req,res)=>{
    res.render("index",{title: "Home Page"});
})
app.get("/about", (req,res)=>{
    res.render("about",{title: "About Page"});
})
app.get("/services", (req,res)=>{
    res.render("services",{title: "Services Page"});
})
app.get("/contact", (req,res)=>{
    res.render("contact",{title: "Contact Page"});
})
app.get("/get-started", (req,res)=>{
    res.render("get-started",{title: "Get Started Page"});
})
app.get("/blog", (req,res)=>{
    res.render("blog",{title: "Blogs Page"});
})

app.get("/package", (req,res)=>{
    res.render("package",{title: "Package Page"});
})

app.use((req, res) => {
    res.status(404).send("404 Not Found - Check your route and file structure.");
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
