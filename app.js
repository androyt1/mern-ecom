const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const chatRoutes = require("./routes/chat.routes");
const adminRoutes = require("./routes/admin.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const chatService = require("./services/chat.service");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: "https://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const allowedOrigins = ["http://localhost:5173"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());

mongoose
    .connect(config.db.uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", authMiddleware.isAuthenticated, cartRoutes);
app.use("/api/orders", authMiddleware.isAuthenticated, orderRoutes);
app.use("/api/payments", authMiddleware.isAuthenticated, paymentRoutes);
app.use("/api/chat", authMiddleware.isAuthenticated, chatRoutes);
app.use("/api/admin", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminRoutes);

app.use(errorMiddleware);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join-room", async (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on("send-message", async (data) => {
        const { senderId, recipientId, message } = data;
        const newMessage = await chatService.sendMessage(senderId, recipientId, message);
        io.to(senderId).to(recipientId).emit("new-message", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
