// function tenantMiddleware(req, res, next) {
//     const tenantId = req.cookies.tenantID; // Retrieve tenantId from cookies
//     if (!tenantId) {
//         return res.status(400).json({ success: false, message: "Tenant ID is required" });
//     }

//     req.tenantId = tenantId; // Attach to the request object
//     next();
// }

// module.exports = tenantMiddleware;
