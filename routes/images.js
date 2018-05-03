const router = require("express").Router()


router.get('/test', ((req, res) => {
    return res.json({
        test: "working"
    })
}))


module.exports = router