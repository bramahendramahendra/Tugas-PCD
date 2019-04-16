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
	ctx.drawImage(myImg, 0, 0);
	$("#inp-brightness").val(0);
	$("#inp-contrass").val(0);

	var imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	$("#imgwidth").text("Lebar: "+imgData.width+"px");
	$("#imgheight").text("Tinggi: "+imgData.height+"px");
	$("#imglength").text("Panjang: "+imgData.data.length+"px");
	$(".imgtitle span").text("Gambar Asli");
});


