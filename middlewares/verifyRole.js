const verifyRole = function(acceptedRoles) {


    return (req, res, next) => {


        if (!req.user.id || !req.user.role) {

            return res.status(403).send({ success: false, message: "Permission denied" })

        } else {

            if (Array.isArray(acceptedRoles)) {

                if (acceptedRoles.includes(req.user.role)) {

                    next()

                } else {

                    return res.status(403).send({ success: false, message: "Permission denied" })

                }

            }
        }
    }
}


module.exports = { verifyRole }