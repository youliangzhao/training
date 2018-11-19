 		  var mybg;
	  	  function opacitybg(){
                mybg = document.createElement("div");
				mybg.setAttribute("id", "mybg");
				mybg.style.background = "#000";
				mybg.style.width = "100%";
				mybg.style.height = "100%";
				mybg.style.position = "fixed";
				mybg.style.top = "0";
				mybg.style.left = "0";
				mybg.style.zIndex = "90";
				mybg.style.opacity = "0.2";
				mybg.style.filter = "Alpha(opacity=20)";
				document.body.appendChild(mybg);
				document.body.style.overflow = "hidden"; 

	  	  }

	  	  function opacityhid(){
	  	  	$(mybg).remove();
	  	  	document.body.style.overflowY = "scroll"; //点击隐藏右侧滚动条
	  	  }