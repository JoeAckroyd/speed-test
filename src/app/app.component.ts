import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public message: string;

  constructor() {}

  ngOnInit(): void {}

  test() {
    var updateMessage = (str) => {
      this.message = str;
    };

    var data = 'd=';

    for (
      let i = 0;
      i < 1024 * 30000 - 2; // 30mb
      i++
    ) {
      data += 'k'; // add one byte of data;
    }

    var http = new XMLHttpRequest();
    var startTime, endTime;
    var lastNow = new Date().getTime();
    var lastKBytes = 0;

    http.upload.addEventListener(
      'progress',
      function (e) {
        if (e.lengthComputable) {
          var now = new Date().getTime();
          var bytes = e.loaded;
          var total = e.total;
          var percent = (bytes / total) * 100;
          var kbytes = bytes / 1024;
          var mbytes = kbytes / 1024;
          var uploadedkBytes = kbytes - lastKBytes;
          var elapsed = (now - lastNow) / 1000;
          var kbps = elapsed ? uploadedkBytes / elapsed : 0;
          lastKBytes = kbytes;
          lastNow = now;

          updateMessage(
            mbytes.toFixed(2) +
              'MB (' +
              percent.toFixed(2) +
              '%) ' +
              kbps.toFixed(2) +
              'KB/s'
          );
        }
      },
      false
    );

    http.open('POST', 'https://httpbin.org/status/200', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        endTime = performance.now();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = 8000 * 30000;
        var speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);
        updateMessage('Speed: ' + speedMbps + ' Mbps');
      }
    };

    startTime = performance.now();
    http.send(data);
  }
}
