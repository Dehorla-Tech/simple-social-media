export function getPrivateData (req, res, next) {
    res.status(200).json({
        success: true, 
        message: "you have access to this protected route"
    })
};