const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// View engine setup
app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public")); 

// Routes
const routes = [
    { path: "/", view: "index", title: "Home Page" },
    { path: "/about", view: "about", title: "About Page" },
    { path: "/services", view: "services", title: "Services Page" },
    { path: "/contact", view: "contact", title: "Contact Page" },
    { path: "/get-started", view: "get-started", title: "Get Started Page" },
    { path: "/blog", view: "blog", title: "Blogs Page" },
    { path: "/blog/welcome-to-softedigi", view: "blog-post-1", title: "Welcome to Softedigi — Where Ideas Turn Into Digital Reality" },
    { path: "/blog/future-of-web-development", view: "blog-post-2", title: "The Future of Web Development: Trends to Watch" },
    { path: "/blog/maximizing-roi-digital-marketing", view: "blog-post-3", title: "Maximizing ROI with Digital Marketing Strategies" },
    { path: "/privacy", view: "privacy", title: "Privacy Page" },
    { path: "/terms", view: "terms", title: "Terms Page" }
];

// Generate routes dynamically
routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.render(route.view, { title: route.title });
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
