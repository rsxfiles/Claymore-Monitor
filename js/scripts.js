function timeConvert(n) {
    //CONVERT MINUTES TO DAY HOUR MIN 
    var num = n;
    var min = 0;
    var hours = 0;
    var days = 0;

    if (num<60) return n + "m";

    if (num/60<24) {
      min = num%60;
      hours = Math.floor(num/60);
      return hours + "h:" + min + "m";
    }

    min = num%60;
    hours = Math.floor(num/60);
    days = Math.floor(hours/24);
    hours = hours%24;
        
    return days + "d" + hours + " h: " + min + " m";
  };

function updateRig(ipS, portS) {
    var displayResources = $('#gpuTable');
    

    $.ajax({
    type: "POST",
    url: "http://127.0.0.1/rig/getMinerData.php",
    data: {ip:ipS, port:portS},
    dataType: 'json',
    success: function(result)
    {
      console.log(result); 

     var strArray= result.result[2].split(';');
     
     //TOTAL MH/s
     $('#totalHr').html(strArray[0]/1000+"<span>Mh/s</span>");

     //SHARES
     $('#totalShares').html(strArray[1]);

     //INVALIDS
     $('#totalInvalids').html(strArray[2]);

     //UPTIME
     $('#uptime').html(timeConvert(result.result[1]));

     //URL Pool
     $('#urlPool').html(result.result[7]);

     var output = "";
     
     //GPUs + TEMPs + FANs
     var gpuArr = result.result[3].split(';');
     var tempArr = result.result[6].split(';');

     for (var i = 0; i < gpuArr.length; i++) {
        output+="<tr><th>GPU" + i + "</th><td>" + gpuArr[i]/1000 + "MH/S</td><td>" + tempArr[(i+1)*2-2] + "F</td><td>" + tempArr[(i+1)*2-1] +"%</td></tr>";
     }
     
     displayResources.html(output);
    }
  });
};