const jwt=require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("HEADER:", authHeader); // 👈 ADD THIS

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token); // 👈 ADD THIS

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded); // 👈 ADD THIS

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message); // 👈 MOST IMPORTANT
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
module.exports = authMiddleware;