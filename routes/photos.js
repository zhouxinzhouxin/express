var express = require('express');
var path = require('path');
var fs = require('fs');
var join = path.join;  //引用path.join，这样你就可以用“path”命名变量
var router = express.Router();

var photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', function(req, res, next) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
});
exports.form = function(req, res){
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};
exports.router = router;
exports.submit = function (dir) {
    return function(req, res, next){
        console.log(req.files);
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir, img.name);  //默认为原来的文件名
        fs.rename(img.path, path, function(err){  //重命名文件
            if (err) return next(err);  //委派错误
            res.redirect('/');  //重定向到首页
        });
    };
};