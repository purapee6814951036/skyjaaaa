require("dotenv").config();

const app = require("../../server/src/app");
const connectDB = require("../../server/src/config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();

    // Vercel can pass either the public URL or a path relative to this function.
    // Restore the Express mount path in both cases so /login and /register reach
    // the routes mounted at /api/auth.
    const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (!requestUrl.pathname.startsWith("/api/")) {
      requestUrl.pathname = requestUrl.pathname.startsWith("/auth/")
        ? `/api${requestUrl.pathname}`
        : `/api/auth${requestUrl.pathname === "/" ? "" : requestUrl.pathname}`;
      req.url = `${requestUrl.pathname}${requestUrl.search}`;
    }

    return app(req, res);
  } catch (error) {
    console.error("Authentication function failed", error);
    return res.status(503).json({ message: "ระบบเข้าสู่ระบบยังไม่พร้อมใช้งาน กรุณาตรวจสอบการตั้งค่าฐานข้อมูล" });
  }
};
