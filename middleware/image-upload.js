const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const fileFilter = require('./imageCongFig').filtFilter;
const s3Conf = require('../util/secret-data.json').s3Conf;
 

aws.config.update({
    secretAccessKey: s3Conf.secretAccessKey,
    accessKeyId: s3Conf.accessKeyId,
    region: s3Conf.region
})


const s3 = new aws.S3();
 
const upload = {
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: s3Conf.bucketName,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
}


module.exports = upload;