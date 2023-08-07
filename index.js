var rapidApiKey = "Add your api key from rapid api";

function getPnrChecker_Click() {
  var pnrno = document.getElementById("txtId").value;
  getPnrChecker(pnrno);
}

//BLL

function afterResponseCallback() {
  var response = JSON.parse(this.responseText);

  if (!response || !response.data || typeof response.data !== "object") {
    console.error(
      "Invalid data format: 'data' property not found or not an object."
    );
    return;
  }

  var data = response.data;

  if (!data.PassengerStatus || !Array.isArray(data.PassengerStatus)) {
    console.error(
      "Invalid data format: 'PassengerStatus' property not found or not an array."
    );
    return;
  }

  var tableHtml = `<table>
            <tr>
                <th>Train No.</th>
                <th>Train Name</th>
                <th>Boarding Date</th>
                <th>From</th>
                <th>To</th>
                <th>Booking Status</th>
                <th>Current Status</th>
                <th>Class</th>
                <th>Total Fare</th>
            </tr>`;

  data.PassengerStatus.forEach(function (passenger) {
    var row = `<tr>
                    <td>${data.TrainNo}</td>
                    <td>${data.TrainName}</td>
                    <td>${data.SourceDoj}</td>
                    <td>${data.From}</td>
                    <td>${data.To}</td>
                    <td>${passenger.BookingStatus}</td>
                    <td>${passenger.CurrentStatus}</td>
                    <td>${data.Class}</td>
                    <td>${data.TicketFare}</td>
                  </tr>`;
    tableHtml += row;
  });

  tableHtml += "</table>";
  document.getElementById("divAllData").innerHTML = tableHtml;
}

function getPnrChecker(pnrno) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnrno}`
  );
  req.setRequestHeader("X-RapidAPI-Key", rapidApiKey);

  req.onload = afterResponseCallback;
  req.send();
}
