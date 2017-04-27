const https = require('https');
const TimerJob = require('timer-jobs');

const hostName = 'novascotiaimmigration.com';
const path = '/move-here/nova-scotia-demand-express-entry/';
const interval = 50000;

var oldData ='';

var options = {
  hostname: hostName,
  port: 443,
  path: path,
  method: 'GET'
};

function doRequest(){
    var req = https.request(options, (res) => {
    
      //console.log('statusCode:', res.statusCode);
      //console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        //extract the body content and compare for changes
        var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
        var newData = pattern.exec(d);
        
        if(oldData !== newData){
            console.log('changed');
            oldData = newData;
        }
        
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.end();
}


const timer = new TimerJob({interval: interval}, function(done) {
    doRequest();
    done();
});

timer.start();
