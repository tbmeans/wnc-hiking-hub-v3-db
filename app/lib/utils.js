const convertDate = (origDate) => {
  const date = new Date(origDate);
  const yyyy = date.getFullYear();
  let d = date.getDay();
  let dddd = "";
  switch (d) {
    case 0:
      dddd = "Sun";
      break;
    case 1:
      dddd = "Mon";
      break;
    case 2:
      dddd = "Tue";
      break;
    case 3:
      dddd = "Wed";
      break;
    case 4:
      dddd = "Thu";
      break;
    case 5:
      dddd = "Fri";
      break;
    case 6:
      dddd = "Sat";
      break;
  }
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedDate = dddd + ", " + mm + "/" + dd + "/" + yyyy;
  return formattedDate;
};

const convertTime = (time) => {
  let hh = parseInt(time.slice(0, 2));
  let mm = time.slice(3, 5);
  let ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12;
  hh = hh ? hh : 12;
  const formattedTime = hh + ":" + mm + " " + ampm;
  return formattedTime;
};



export { convertDate, convertTime };


