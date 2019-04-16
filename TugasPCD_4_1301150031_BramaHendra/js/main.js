// funtion memanggil button a href menu agar bisa mengakses main.js
$(function() {
	$('.navbar .navbar-nav a').not('.dropdown-toggle').bind('click', function(event) {
		var $anchor = $(this).attr('href'),
			$func   = $anchor.substr(1, $anchor.length);

		eval($func);
		return false;
	});
});

// buat variabel
var 
	cvs = document.getElementById("kanvas"), //variabel canvas
	ctx = cvs.getContext("2d"), //variabel dimensi, dimana 2d
	myImg = new Image(); //variabel gambar

// memanggil id imgFile pada modal upload
$(imgFile).change(function(){
	readURL(this);
});

//function read image
function readURL(input){
	if(input.files && input.files[0]){
		var reader =  new FileReader();
		reader.onload = function(e){
			$(myImg).attr("src", e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

// function untuk mengatur ukuran gambar saat ditampilkan di canvas
$(myImg).load(function(){
	$(kanvas).attr("width", myImg.width);
	$(kanvas).attr("height", myImg.height);
	// load original gambar
	ctx.drawImage(myImg, 0, 0);
	$("#inp-brightness").val(0);
	$("#inp-contrass").val(0);

	var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	$("#imgwidth").text("Lebar: "+imgData.width+"px");
	$("#imgheight").text("Tinggi: "+imgData.height+"px");
	$("#imglength").text("Panjang: "+imgData.data.length+"px");
	$(".imgtitle span").text("Gambar Asli");
});

//  function Reset gambar agar menjadi gambar asli
function imgReset(){
	$(kanvas).attr("width", myImg.width);
	$(kanvas).attr("height", myImg.height);
	$(".imgtitle span").text("Citra Asli");
	ctx.drawImage(myImg, 0, 0);
	$("#inp-brightness").val(0);
	$("#inp-contrass").val(0);
	$("#hist").hide();
}
// end function reset

// start function Grayscale 
function imgGrayscale(){
	// load original gambar
	ctx.drawImage(myImg, 0, 0);

	// mengambil data gambar
	var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);

	// manipulation data gamabar
	for(var i=0; i < imgData.data.length; i +=4){
		// rumus yg digunakan menggunakan metode average
		// yaitu dengan menjumlahkan seluruh nilai R G B, kemudian dibagi 3, sehingga diperoleh nilai rata-rata dari R G B, nilai rata-rata itulah yang dapat dikatakan sebagai grayclase. 
		//rumus : Grayscale = (R + G + B) / 3 
		var gr = (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3;
		if(gr < 0) gr = 0;
		if(gr > 255) gr = 255;
		imgData.data[i] = gr;
		imgData.data[i+1] = gr;
		imgData.data[i+2] = gr;
	}

	// show manipulation
	ctx.putImageData(imgData, 0, 0);

	// set title
	$(".imgtitle span").text("Grayscale");
}
// end function Grayscale 

// start funtion histogram
function histogram(){

	$("#hist").hide();
	$("#bar-chart").css("width", "99.5%");
	$("#bar-chart").css("height", "500px");

	// load original image
	// ctx.drawImage(myImg, 0, 0);

	// read img data
	var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	var hist = {"red":[], "green":[], "blue":[]};
	var pr = [], prrk = {"red":[], "green":[], "blue":[]};
	for(var n=0; n <= 255; n++){
		hist.red.push(0); hist.green.push(0); hist.blue.push(0);
		prrk.red.push(0); prrk.green.push(0); prrk.blue.push(0);
		pr.push(n/255);
	}

	// hitung nk
	for (var i = 0; i < imgData.data.length; i+=4) {
		for(var n=0; n <= 255; n++){
			if(imgData.data[i] == n) hist.red[n]++;
			if(imgData.data[i+1] == n) hist.green[n]++;
			if(imgData.data[i+2] == n) hist.blue[n]++;
		}

	}

	// Pr(rk)
	for(i=0; i<3; i++){
		for(var n=0; n <= 255; n++){
			if(i==0) prrk.red[n] = hist.red[n] / (imgData.data.length / 4);
			if(i==1) prrk.green[n] = hist.green[n] / (imgData.data.length / 4);
			if(i==2) prrk.blue[n] = hist.blue[n] / (imgData.data.length / 4);
		}
	}

	/* Bar Chart starts */

	var d1 = [];
	for (i = 0; i <= 255; i += 1)
		d1.push([i, hist.red[i]]);

	var d2 = [];
	for (i = 0; i <= 255; i += 1)
		d2.push([i, hist.green[i]]);

	var d3 = [];
	for (i = 0; i <= 255; i += 1)
		d3.push([i, hist.blue[i]]);

	var stack = 0, bars = true, lines = false, steps = false;

	function plotWithOptions() {
		$.plot($("#bar-chart"), [ d1, d2, d3 ], {
			series: {
				stack: stack,
				lines: { show: lines, fill: true, steps: steps },
				bars: { show: bars, barWidth: 0.8 }
			},
			grid: {
				borderWidth: 0, hoverable: true, color: "#777"
			},
			colors: ["#FF0000", "#00FF00", "#0000FF"],
			bars: {
				  show: true,
				  lineWidth: 0,
				  fill: true,
				  fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.8 } ] }
			}
		});
	}

	plotWithOptions();

	$(".stackControls input").click(function (e) {
		e.preventDefault();
		stack = $(this).val() == "With stacking" ? true : null;
		plotWithOptions();
	});
	$(".graphControls input").click(function (e) {
		e.preventDefault();
		bars = $(this).val().indexOf("Bars") != -1;
		lines = $(this).val().indexOf("Lines") != -1;
		steps = $(this).val().indexOf("steps") != -1;
		plotWithOptions();
	});

	/* Bar chart ends */

	$("#hist").slideDown('400');

}
// end function histogram
