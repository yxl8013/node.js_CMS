jQuery(function($){
	let uname = $.cookie('adminname');
	// console.log(uname);
	if(!uname){
		location.href="../login.html";
	}
	$('.uname').text(uname);
	$('.drop-out').on('click',()=>{
		$.cookie('adminname',null, { expires:-1, path: '/' }); 
		location.href ='../login.html';
	})
})