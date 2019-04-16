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

// function Grayscale 
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
