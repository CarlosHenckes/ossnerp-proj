var fs = require('fs');
var baseuri = "public/data/appconfig.json";
var fileName = '../' + baseuri;

module.exports = function (app){
    var HomeController = {
        index: function (request, response){
            response.render('home/index');
        },
        config: function(request, response){            
            var file = require(fileName);
            response.render('home/config', {"file":file});
        },
        saveconfig: function(request, response){
            var file = require(fileName);

            var com = request.body.com;
            var signature = request.body.signature;
            var baudrate = request.body.baudrate;

            file.com = com;
            file.signature = signature;
            file.baudrate = baudrate;

            var pth = './' + baseuri;
            fs.writeFile(pth, JSON.stringify(file, null, 2), function (err) {
                if (err) return console.log(err);            
            });   
                response.render('home/config', {"file":file});
        },
        savereadings: function(request, response){
            var data = request.body;
            var reads = require('../public/data/readings.json');
            // remove first
            if (Object.keys(reads.readings).length >= 10) 
            reads.readings.shift();
            reads.readings.push(data);

            fs.writeFile('./public/data/readings.json', JSON.stringify(reads, null, 2), function (err) {
                if (err) return console.log(err);            
            });
            return 'ok';
        }
    };
    return HomeController;
};