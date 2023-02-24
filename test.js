var lastNow = new Date().getTime();
var lastKBytes = 0;
var xhr = new window.XMLHttpRequest();
xhr.upload.addEventListener("progress", function(e) {
    if (e.lengthComputable) {
        var now = new Date().getTime();
        var bytes = e.loaded;
        var total = e.total;
        var percent = bytes / total * 100;
        var kbytes = bytes / 1024;
        var mbytes = kbytes / 1024;
        var uploadedkBytes = kbytes - lastKBytes;
        var elapsed = (now - lastNow) / 1000;
        var kbps =  elapsed ? uploadedkBytes / elapsed : 0 ;
        lastKBytes = kbytes;
        lastNow = now;
        console.log(mbytes.toFixed(2) + "MB (" + percent.toFixed(2) + "%) " + kbps.toFixed(2) + "KB/s");
    }
}, false);