var data = new Date();

$("#inicio").html(data)

data.setDate(01);

$("#inicioDois").html("Inicio dois " + data)

data.setMonth(data.getMonth() - 1);
$("#mesUm").html(data)
data.setMonth(data.getMonth() - 1);
$("#mesDois").html(data)
data.setMonth(data.getMonth() - 1);
$("#mesTres").html(data)
data.setMonth(data.getMonth() + 4);
$("#mesQuatro").html(data)