function getDatePublishedOn() {
    
    let now = new Date();
    let date = now.getDate();
    console.log(now.getMonth());
    let month = monthName[now.getMonth() + 1]; 
    let year = now.getFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();

    return  hour + ":" + pad(minutes, 2) +" "+date + " " + month + " " + year;
}


const monthName = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}
console.log(getDatePublishedOn());
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
 console.log(pad("11", 2))