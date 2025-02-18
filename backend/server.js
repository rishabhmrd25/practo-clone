require("ignore-styles");
require("./babel-register.js");

const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const path = require("path");
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { sequelize } = require("./config/db.js");
const cors = require("cors");

const getRoute = require("./routes/getRoute.js");
const insertRoute = require("./routes/insertRoute.js");
const authRoute = require("./routes/authRoute.js");
const checkoutRoute = require("./routes/checkoutRoute.js"); // ✅ FIXED missing '/'

// Import your React components
const Home = require("../frontend/src/pages/Home/Home.jsx").default;
const ListDentist = require("../frontend/src/pages/ListDentist/ListDentist.jsx").default;
const ListCough = require("../frontend/src/pages/ListCough/ListCough.jsx").default;
const Login = require("../frontend/src/pages/Login/Login.jsx").default;
const Signup = require("../frontend/src/pages/Signup/Signup.jsx").default;
const DoctorProfile = require("../frontend/src/pages/DoctorProfile/DoctorProfile.jsx").default;

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API Routes
app.use("/api/v1/get", getRoute);
app.use("/api/v1/insert", insertRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/checkout", checkoutRoute); // ✅ FIXED missing '/'

// 🔹 **Initialize Razorpay**
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 **Create Razorpay Order**
app.post("/api/v1/checkout", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 **Verify Razorpay Payment**
app.post("/api/v1/checkout/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// 🔹 **Render function to generate HTML**
const renderPage = (Component, initialData = {}) => {
  const content = ReactDOMServer.renderToString(React.createElement(Component));
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Practo Clone</title>
        <link rel="stylesheet" href="/styles.css">
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
};

// 🔹 **Route Handlers**
app.get("/", (req, res) => {
  res.send(renderPage(Home));
});

app.get("/list-dentist", async (req, res) => {
  res.send(renderPage(ListDentist));
});

app.get("/list-cough", async (req, res) => {
  res.send(renderPage(ListCough));
});

app.get("/login", async (req, res) => {
  res.send(renderPage(Login));
});

app.get("/signup", async (req, res) => {
  res.send(renderPage(Signup));
});

app.get("/doctor/:id", async (req, res) => {
  res.send(renderPage(DoctorProfile));
});
