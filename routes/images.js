
const aws = require('aws-sdk');
const router = require("express").Router()
const secrets = require("../config/secrets")
const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'us-west-1'
});
aws.config.update({
    accessKeyId: secrets.accessKeyId,
    secretAccessKey: secrets.secretAccessKey,
    Bucket: secrets.aws_bucket
})
router.get('/signature', ((req, res) => {
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: secrets.aws_bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${secrets.aws_bucket}.s3.amazonaws.com/${fileName}`
        };
        return res.json(returnData);
    });
}))


module.exports = router