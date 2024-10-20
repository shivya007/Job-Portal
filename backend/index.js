import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});

const app = express();

const __dirname = path.resolve();
// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const coreOptions = {
    origin: 'https://job-portal-3kyh.onrender.com/',
    credentials: true,
};
app.use(cors(coreOptions));

const port = process.env.port || 8080;
// API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/jobs", jobRoute);

app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(port, ()=>{
    connectDB();
    console.log(`Listening on port ${port}`);
})


// home route
app.get("/home", (req, res)=>{
    return res.status(200).json({
        message: "Backend success",
        success: true,
    })
});