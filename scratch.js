
<script>

var x = 0;
var y = 0;
var rotation = 0;
var r = 20;

$(document).ready(function(){

	// sets a function that will be called when the websocket connects/disconnects
	NetworkTables.addWsConnectionListener(onNetworkTablesConnection, true);

	// sets a function that will be called when the robot connects/disconnects
	NetworkTables.addRobotConnectionListener(onRobotConnection, true);

	// sets a function that will be called when any NetworkTables key/value changes
	NetworkTables.addGlobalListener(onValueChanged, true);
});


function onRobotConnection(connected) {
	$('#robotstate').text(connected ? "Connected!" : "Disconnected");
	$('#robotAddress').text(connected ? NetworkTables.getRobotAddress() : "disconnected");
}

function onNetworkTablesConnection(connected) {

	if (connected) {
		$("#connectstate").text("Connected!");

		// clear the table
		$("#nt tbody > tr").remove();

	} else {
		$("#connectstate").text("Disconnected!");
	}
}

function onValueChanged(key, value, isNew) {

	// Replace all forward slashes with double underscores
	var target_class = key.replace('/', '__')

	$('.' + target_class).each(function(e) {
		e.html(value)
	});

	// key thing here: we're using the various NetworkTable keys as
	// the id of the elements that we're appending, for simplicity. However,
	// the key names aren't always valid HTML identifiers, so we use
	// the NetworkTables.keyToId() function to convert them appropriately

}

function backup() {

	if (isNew) {
		var tr = $('<tr></tr>').appendTo($('#nt > tbody:last'));
		$('<td></td>').text(key).appendTo(tr);
		$('<td></td>').attr('id', NetworkTables.keyToId(key))
					   .text(value)
					   .appendTo(tr);
	} else {

		// similarly, use keySelector to convert the key to a valid jQuery
		// selector. This should work for class names also, not just for ids
		$('#' + NetworkTables.keySelector(key)).text(value);
	}
	if(key == "/SmartDashboard/Robot_State_X")
	{
		x = value+100;
	}
	if(key == "/SmartDashboard/Robot_State_Y")
	{
		y = value+100;
	}
	if(key == "/SmartDashboard/Robot_State_R")
	{
		rotation = -value;
	}

	if(key == "/SmartDashboard/Battery_Voltage")
	{
		var percent = batteryPercent(value);
		console.log(percent);
		x = value+100;
	}

	var x1,x2,x3,x4,y1,y2,y3,y4,x5,y5 = 0;
	x1 = x+r*Math.cos(toRadians(rotation-45));
	x2 = x+r*Math.cos(toRadians(rotation-135));
	x3 = x+r*Math.cos(toRadians(rotation-225));
	x4 = x+r*Math.cos(toRadians(rotation-315));
	y1 = y+r*Math.sin(toRadians(rotation-45));
	y2 = y+r*Math.sin(toRadians(rotation-135));
	y3 = y+r*Math.sin(toRadians(rotation-225));
	y4 = y+r*Math.sin(toRadians(rotation-315));
	x5 = x+r*0.5*Math.cos(toRadians(rotation));
	y5 = y+r*0.5*Math.sin(toRadians(rotation));
	$("#robot").html("<polygon points='"+x5.toString()+","+y5+" "+x1.toString()+","+y1+" "+x2.toString()+","+y2+ " " + x3+","+y3+" " + x4 + "," + y4 +"' stroke='green' stroke-width='4'  />");
}


function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

</script>
