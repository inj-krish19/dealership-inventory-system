import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

// CONSTANTS 
const PORT = process.env?.PORT ?? 3000;
const DOMAIN = process.env?.DOMAIN ?? "http://localhost";
const FRONTEND_URL = process.env?.FRONTEND_URL ?? "http://localhost:5173";

app.use(cors());

app.get('/', async(req, res) => {
    return res.status(200).json({
        code: 200,
        status: "OK",
        message: "Dealership Inverntory System working"
    })
});

app.listen(PORT, () => {
    console.log("");
    console.log("[APP] Dealership Inventory System started working.");
    console.log(`[LIVE] App is running on ${DOMAIN}:${PORT}`)
    console.log("\n\n");
})

export default app;