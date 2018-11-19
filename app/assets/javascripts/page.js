//jQuery(".business").click(function() {
//	jQuery(".side").show(400);// 显示
//});
//
//jQuery(".side").on("click", ".closxx", function() {
//	jQuery(".side").hide(400);// 关闭
//});

$(function(){
	  //外部(实操助手)--拖拽
	$(".business").Tdrag();

	  //外部--实操助手
	$(".lower").click(function(){
	  	  $(".side").show(300);
	  	  $(".business").hide(300);
	  });

	  //内部--关闭
	$(".upper").click(function(){
		$(".side").hide();
		$(".business").show();
	  });

	//内部(实操助手)--拖拽
	$(".side").Tdrag({
	    //scope:".zhuai",
	    handle:".side_tit",
	    axis:"x"
	});
	
//	$(".business").mouseenter(function(){
////		alert(1);
//		$(".business").css('pointer-events', 'auto');
//	});
//	
//	$(".business").mouseleave(function(){
////		alert(2);
//		$(".business").css('pointer-events', 'none');
//	});
	
//	$(".side").mouseenter(function(){
////		alert(3);
//		$(".zhuai").css('pointer-events', 'auto');
//	});
	
//	$(".side").mouseover(function(){
////		alert(4);
//		$(".zhuai").css('pointer-events', 'auto');
//	});
//
//
//	$(".side").mouseout(function(){
////		alert(4);
//		$(".zhuai").css('pointer-events', 'none');
//	});


});




