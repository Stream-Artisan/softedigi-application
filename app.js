require('dotenv').config();
const express = require("express");
// const nodemailer = require("nodemailer");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// // Hostinger Email Configuration
// const transporter = nodemailer.createTransport({
//     host: 'smtp.hostinger.com',
//     port: 587,
//     secure: false, // false for 587, true for 465
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// // Test transporter configuration
// transporter.verify(function(error, success) {
//     if (error) {
//         console.log('SMTP connection error:', error);
//     } else {
//         console.log('SMTP server is ready to take our messages');
//     }
// });

// // Email sending function with better error handling
// const sendEmail = async (formData, formType) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: 'info@softedigi.com',
//         subject: `New ${formType} Form Submission - Softedigi`,
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//                 <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
//                     New ${formType} Form Submission
//                 </h2>
//                 <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
//                     <p style="margin: 10px 0;"><strong>Name:</strong> ${formData.name}</p>
//                     <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
//                     ${formData.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${formData.phone}</p>` : ''}
//                     ${formData.service ? `<p style="margin: 10px 0;"><strong>Service:</strong> ${formData.service}</p>` : ''}
//                     <p style="margin: 10px 0;"><strong>Message:</strong></p>
//                     <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #667eea;">
//                         ${formData.message}
//                     </div>
//                 </div>
//                 <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
//                 <p style="color: #666; font-size: 12px; margin: 5px 0;">
//                     <strong>Submitted on:</strong> ${new Date().toLocaleString()}
//                 </p>
//                 <p style="color: #666; font-size: 12px; margin: 5px 0;">
//                     <strong>Source:</strong> ${formType} - Softedigi Website
//                 </p>
//             </div>
//         `
//     };

//     try {
//         console.log('Attempting to send email with options:', {
//             from: mailOptions.from,
//             to: mailOptions.to,
//             subject: mailOptions.subject
//         });
        
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully:', info.messageId);
//         return { success: true };
//     } catch (error) {
//         console.error('Email sending failed - Full error:', error);
//         console.error('Error code:', error.code);
//         console.error('Error message:', error.message);
//         return { success: false, error: error.message };
//     }
// };

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

// Add error handling middleware before the 404 handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Server error occurred' });
});

// 404 handler (keep this at the end)
app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.url); // Debug log
    res.status(404).render("404", { title: "Page Not Found" });
});

// Home page form handler (uses 'number' field)
app.post('/index', async (req, res) => {
    const { name, email, number, service, message } = req.body;
    
    console.log('Index form data:', { name, email, number, service, message }); // Debug log
    
    const result = await sendEmail({
        name, email, phone: number, service, message
    }, 'Home Page');
    
    if (result.success) {
        res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    } else {
        console.error('Email send error:', result.error); // Debug log
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Contact page form handler (uses 'phone' field)
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    console.log('Contact form data:', { name, email, phone, message }); // Debug log
    
    const result = await sendEmail({
        name, email, phone, message
    }, 'Contact Page');
    
    if (result.success) {
        res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    } else {
        console.error('Email send error:', result.error); // Debug log
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Get started page form handler (uses 'phone' field)
app.post('/get-started', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    console.log('Get started form data:', { name, email, phone, message }); // Debug log
    
    const result = await sendEmail({
        name, email, phone, message
    }, 'Get Started Page');
    
    if (result.success) {
        res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    } else {
        console.error('Email send error:', result.error); // Debug log
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Test email route (remove after testing)
app.get('/test-email', async (req, res) => {
    const result = await sendEmail({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        message: 'This is a test email to verify the setup.'
    }, 'Test');
    
    if (result.success) {
        res.send('Test email sent successfully!');
    } else {
        res.send(`Email failed: ${result.error}`);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
