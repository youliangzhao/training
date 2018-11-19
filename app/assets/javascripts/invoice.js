//非实训
var particulars_haveTax=false;
//是否使用了清单功能（转发票、完成）这两个功能的任意个，默认为没有打开，当打开了清单按钮，则发票增行和减行将都不能使用了
var productOrdersIsUse = false;
//查看是发票填开后的发票预览还是查看已填写发票中的发票预览，默认为false则关闭发票预览窗口时就只是关闭，如果为true证明是填开发票后的发票预览，则刷新页面
var isFillInvoice = false;
//发票列表中的打印类型，默认为0，打印发票则改为1，打印销货清单则改为2；
var printType = 0;
$(function() {
	$(".fp_wrong").click(function() {
		$(".wrong").show();
	});

	$(".wrong p").click(function() {
		$(".wrong").hide();
	});

	$(".wrong span").click(function() {
		$(".wrong").hide();
	});

	// 头部
	$(".tit_readx").click(function() {
		$(".read").show();
	});

	$(".fp_return").click(function() {
		$(".returnx").show();
	});

	$(".fp_gl_p1").click(function() {
		$(".flour").show();
	});

	$(".fp_gl_p4").click(function() {
		$(".invalid").show();
	});

	$(".fp_gl_p5").click(function() {
		$("#redbill_info_choose").show();
	});

	$(".fp_gl_p2").click(function() {
		$(".read").show();
	});

	$(".fp_gl_p3").click(function() {
		$(".query").show();
	});

//	// 发票读入
//	$(".inv_a1").click(function() {
//		$(".read").show();
////		$("#readgmfp").show();
////		$(".drfp").show();
////		$(".gmfp").show();
//	});
	
	$(".readmsg p").click(function() {
		$(".readmsg").hide();
	});
	
	$(".readmsg input").click(function() {
		$(".readmsg").hide();
	});

	$(".read p").click(function() {
		$(".read").hide();
	});

	// $(".read span").click(function(){
	// $(".read").hide();
	// });

	// 发票退回
	$(".inv_a2").click(function() {
		$(".returnx").show();
	});
	// 关闭
	$(".ret_close").click(function() {
		$(".returnx").hide();
	});

	$(".ret_out").click(function() {
		$(".returnx").hide();
	});

	// 打印
	$(".tit_printx").click(function() {
		$(".printx").show();
	});
	//发票打印预览关闭点击，刷新页面
	$(".preview_close").click(function() {
		//清空表单数据
		$("#preview_particulars")[0].reset();
		$("#preview_orders")[0].reset();
		if(isFillInvoice)
			location.reload();
		else
			$('.preview').hide();
		$('.orderslist').hide();
	});

	$(".prin_close").click(function() {
		$(".printx").hide();
		$(".printxlist").hide();
		$(".redbill_printx").hide();
	});

	$(".prin_yl").click(function() {
		$(".wrong").show();
	});

	$(".prin_yes").click(function() {
		$(".printx").hide();
		$(".redbill_printx").hide();
	});

	$(".prin_no").click(function() {
		$(".printx").hide();
		$(".redbill_printx").hide();
	});

	// 发票退回--警告
	$(".back p").click(function() {
		$(".back").hide();
	});

	$(".back_btn_no").click(function() {
		$(".back").hide();
	});

	$(".back_btn_yes").click(function() {
		$(".infox").show();
		$(".back").hide();// 警告 --隐藏
		$(".returnx").hide();// 已购发票退回金税设备--隐藏
	});

	// 发票退回--退回(弹窗显示)
	$(".ret_return").click(function() {
		$(".back").show();
	});

	$(".inf_yes").click(function() {
		$(".rubric").show();// 弹出--退回介质选择
		$(".infox").hide();// 隐藏--确认将发票卷退回金税设备
		$("#readgmfp").hide();
	});

	$(".inf_close").click(function() {
		$(".infox").hide();
		$("#readgmfp").hide();
	});

	$(".inf_no").click(function() {
		$(".infox").hide();
		$("#readgmfp").hide();
		$(".read").hide();
	});

	// 退回介质选择
	$(".rub_close").click(function() {
		$(".rubric").hide();// 隐藏关闭按钮
		$(".drfp").hide();
	});

	$(".rub_btn_no").click(function() {
		$(".rubric").hide();// 取消--隐藏
		$(".drfp").hide();// 取消--隐藏
	});

	$(".rub_btn_ok").click(function() {
		$(".details").show();// 弹出信息--成功退回发票
		$(".rubric").hide();// 隐藏退回介质选择
	});
	//点击读取发票
	$("#drfp_ok").click(function() {
		$("#readgmfp").show();// 弹出信息--成功退回发票
		$(".drfp").hide();// 隐藏退回介质选择
	});

	// 退回介质选择--信息
	$(".det_close").click(function() {
		$(".details").hide();// 隐藏关闭按钮
	});

	$(".details span").click(function() {
		$(".details").hide();// 确认--隐藏
	});

	// 信息表
	$(".inv_a6").click(function() {
//		$(".Category").show();// 信息表2个p--显示
	});

	$(".cat_p1").click(function() {
		$("#redbill_info_choose").show();// 红字发票信息表信息选择 --显示
		$(".Category").hide();// 信息表2个p--隐藏
	});

	$(".cat_p2").click(function() {
		$(".Category").hide();// 第2个p--隐藏
	});

	// 红字发票信息表信息选择
	$(".infor_close").click(function() {
		$("#redbill_info_choose").hide();// 关闭按钮--隐藏
		$("#redbill_confirm").hide();
		$("#redbill_fill").hide();
	});

	$(".infor_no").click(function() {
		$("#redbill_info_choose").hide();// 取消--隐藏
		$("#redbill_confirm").hide();// 取消--隐藏
	});

	$(".infor_next").click(function() {
		if($(".infor_sele_invoice_code").val() =="") {
			$(".messagex").show();// 下一步--弹出信息
			return false;
		}
		if($(".infor_sele_invoice_number").val() =="") {
			$(".messagex").show();// 下一步--弹出信息
			return false;
		}
		if($(".infor_sele_invoice_code").val() !="1101126240") {
			$(".messagex").show();// 下一步--弹出信息
			return false;
		}
		if($(".infor_sele_invoice_number").val() !="74928405") {
			$(".messagex").show();// 下一步--弹出信息
			return false;
		}
		$("#redbill_info_choose").hide();
		$("#redbill_confirm").show();
	});
	
	$(".infor_pre").click(function() {
		$("#redbill_info_choose").show();
		$("#redbill_confirm").hide();
//		$(".messagex").show();// 下一步--弹出信息
	});
	
	// 信息
	$(".messagex p").click(function() {
		$(".messagex").hide();// 关闭--隐藏
	});

	$(".messagex span").click(function() {
		$(".messagex").hide();// 确定--隐藏
	});

	// 发票作废
	$(".inv_a5").click(function() {
		$(".invalid").show();// 弹出--选择发票号码作废
	});
	
	$(".inv_close").click(function() {
		$(".invalid").hide();// 关闭
	});
	
	//发票库存查询
	$(".inv_a7").click(function() {
		$(".querie").show();// 弹出--发票库存查询
	});
	//发票库存关闭
	$(".querie_close").click(function() {
		$(".querie").hide();// 关闭--发票库存查询
	});

	// 头部图标
	// 1、退出
	$(".inv_hide").click(function() {
		$(".invalid").hide();
	});

	// 2、查看明细
	$(".inv_detailed").click(function() {
		$(".detailedx").show();
	});

	// 3、作废
	$(".inv_scrap").click(function() {
		if($(".invalid .reports .scr_cont table tbody tr.selected").length==1){
			if($(".invalid .reports .scr_cont table tbody tr.selected .isAbolish").text()=="是") {
				alertInfo("请选择没有作废的发票进行操作。");
				return false;
			}
			$(".count").show();
		} else {
			alertInfo("请选择一条记录，如已选择还出现此提示请刷新页面后重试。");
		}
	});
	// 作废--确认
	$(".count p").click(function() {
		$(".count").hide();// 关闭
	});

	$(".count_btn_no").click(function() {
		$(".count").hide();// 取消
	});

	$(".count_btn_ok").click(function() {
//		alert($(".invalid .reports .scr_cont table tbody tr.selected .ta_left input").val());
		var data = [];
		data.push({
			questionId:$(".invalid .reports .scr_cont table tbody tr.selected .ta_left .questionId").val(),
			answerCode:"isAbolish",
			answerDetail:"1"
		});
		$.ajax({
			url:"../question/saveanswernotdelete.json",
			data:JSON.stringify(data),
			contentType:"application/json",
			dataType:"json",
			type:"post",
			success:function(data){
				if(data.success){
					$.ajax({
						url:"../course/updateInvoiceDetails.json",
						data:{
							id : $(".invalid .reports .scr_cont table tbody tr.selected .ta_left .id").val(),
							isAbolish : 1
							},
						type:"post",
						success:function(msg){
							if(msg.success){
								$(".sure").show();// 弹出 --作废信息
							} else {
								alertInfo("废除失败，请退出后重试");
							}
						}
					});
					
				} else {
					alertInfo("废除失败，请退出后重试");
				}
			}
		});
	});

	// 作废--信息点击XX
	$(".sure p").click(function() {
		$(".sure").hide();// 关闭
		$(".count").hide();// 隐藏
		location.reload();
	});
	// 作废--信息点击确认按钮
	$(".sure button").click(function() {
		location.reload();
	});

	// 查看作废明细

	$(".detai_close").click(function() {
		$(".detailedx").hide();// 关闭
	});

	$(".detai_no").click(function() {
		$(".detailedx").hide();// 取消
	});

	// 增值税发票填开

//	$(".reports .scr_cont table tbody tr td").dblclick(function() {
//		$(".ticket").show();// 弹出--增值税发票填开
//	});

	$(".tick_close").click(function() {
//		$(".tablex table tbody tr").remove();
		$(".ticket").hide();// 关闭
	});

	$(".tick_out").click(function() {
		$(".tablex table tbody tr").remove();
		$(".ticket").hide();// 退出
	});

	// 发票查询
	$(".inv_a4").click(function() {
//		$(".query").show();// 弹出--发票查询
		$('.xuanzes').show();//新版已开发票查询页面
	});

	$(".query_close").click(function() {
		$(".query").hide();// 关闭
	});

	$(".choi_no").click(function() {
		$(".query").hide();// 取消
	});

	$(".choi_yes").click(function() {
		$(".optionsx").show();// 弹出--选择发票号码查询
	});

	// 选择发票号码查询
	// 1、关闭
	$(".optio_close").click(function() {
		$(".optionsx").hide();// 关闭
		$(".query").hide();// 发票查询--隐藏
	});

	// 2、退出
	$(".option_out").click(function() {
		$(".optionsx").hide();// 退出
		$(".query").hide();// 发票查询--隐藏
	});

	// 3、查看明细
	$(".option_see").click(function() {
		$(".ticket").show();
	});

//	// 4、双击表格--tr td
//	$(".watchx .watchx_scroll .watchx_cont table tbody tr td").dblclick(
//			function() {
//				alert("$!{regionName}");
//				$(".ticket").show();// 弹出--增值税发票填开
//			});

	// 发票填开
	$(".inv_a3").click(function() {
		$(".fill").show();// 弹出--增值税专用(普通)发票填开
	});

	$(".fil_p1").click(function() {
		if($('#flour_zy .figures .startNumber').text() == "" || 
				$('#flour_zy .figures').find("input[name='isRead[1]']").val() != "1") {
			$(".ordinary").show();// 弹出--增值税普通发票填开
			$(".fill").hide();// 隐藏
		} else {
			$("#flour_zy").show();// 增值税专用发票填开--弹出--发票号码确认
			$(".fill").hide();// 隐藏--增值税专用(普通)发票填开
		}
	});

	$(".fil_p2").click(function() {
		if($('#flour_pt .figures .startNumber').text() == "" ||
				$('#flour_pt .figures').find("input[name='isRead[0]']").val() != "1") {
			$(".ordinary").show();// 弹出--增值税普通发票填开
			$(".fill").hide();// 隐藏
		} else {
			$("#flour_pt").show();// 增值税普通发票填开--弹出--发票号码确认
			$(".fill").hide();// 隐藏--增值税专用(普通)发票填开
		}
	});

	// 增值税普通发票填开
	$(".ordinary p").click(function() {
		$(".ordinary").hide();// 关闭
	});

	$(".ordinary span").click(function() {
		$(".ordinary").hide();// 确定--隐藏
	});

	// 发票号码确认
	$(".flour_close").click(function() {
		$(".flour").hide();// 关闭
	});

	$(".flour_no").click(function() {
		$(".flour").hide();// 取消
	});

//	$(".flour_yes").click(function() {
//		//清空商品表单数据
//		$(".listing .list_scroll table tbody tr:not(:first)").remove();
//		$("#listing_id").val("");
//		$("#name").val("");
//		$("#spec").val("");
//		$("#unit").val("");
//		$("#number").val("");
//		$(".listing_price").val("");
//		$(".listing_money").val("");
//		$("#taxRate").val("");
//		$("#taxMoney").val("");
//		//清空客户表单数据
//		$("#cName").val("");
//		$("#cTaxId").val("");
//		$("#cAddress").val("");
//		$("#cAccounts").val("");
//		//清空合计表单数据
//		$("#totalNoTaxMoney").val("");
//		$("#totalTaxMoney").val("");
//		$("#upMoney").val("");
//		$("#totalMoney").val("");
//		
//		$(".Issue").show();// 弹出--开具增值税专用发票
//		$(".flour").hide();// 发票号码确认--隐藏
//	});

	// 3、清单--弹窗(清单填开)
	$(".part_tit_a2").click(function() {
		$(".listing .list_scroll table tbody tr").removeClass("selected");
//		//清空商品表单数据
//		$(".biaoge .biaoge_scroll table tbody tr:not(:first)").remove();
//		$('#productOrderForm')[0].reset();
		$(".orders").show();
	});
	
	// 添加折扣行--弹窗打开
	$(".part_tit_a8").click(function() {
		//发票填开页面选中商品
		var bindTr=$(".listing .list_scroll table tbody tr.selected");
		//清单页面选中商品
		var orderTr = $(".biaoge .biaoge_scroll table tbody tr.selected");
		if(bindTr.length == 0 && orderTr.length == 0) {
			alertInfo("请选中一条商品信息后再点击折扣。");
			return false;
		} else {
			$('.zhekou_rownum').val("0");
			$('.zhekou_totalmoney').val("0.00");
			$('.zhekou_rate').val("0.00");
			$('.zhekou_discountmoney').val("0.00");
			$(".zhekou").show();
		}
	});
	
	// 添加折扣行--弹窗打开
	$(".part_tit_a9").click(function() {
		//判断确认按钮是否还可用，如果不可用说明之前已经点击了确认按钮，则不清空扣除额
		if(!$(".balance_confirm").prop("disabled")) {
			//清空商品表单数据
			$(".listing .list_scroll table tbody tr:not(:first)").remove();
			$(".listing .list_scroll table tbody tr input").val("");
			$(".balance_deduction").val("0");
		}
		$(".balance").show();
	});

	// 4、红字
	$(".part_tit_a1").click(function() {
		$(".redcolor").show();// 弹出文字
	});
//	$(".part_tit_a1").mousemove(function(){
//	    $(".redcolor").show();
//	});
	$(".part_tit_a1").click(function(){
		$(".equivalent_text1").val("");
		$(".equivalent_text2").val("");
	});
    $("#Redcolor").mousemove(function(){
    	$(".redcolor").show();
    }).mouseout(function(){
    	$(".redcolor").hide();
    });


	$(".redcolor_p2").click(function() {
		$(".redcolor").hide();// 导入红字发票信息单/导入网络下载红字发票 ----隐藏
	});

	$(".redcolor_p1").click(function() {
//		$(".equivalent").show();// 直接开具--弹窗
		$("#dyxx").show();
		$(".redcolor").hide();// 隐藏红字--直接开具/导入红字/导入网络...
	});

	// 打印--信息
	$(".typed p").click(function() {
		$(".typed").hide();// 关闭
	});

	$(".typed span").click(function() {
		$(".typed").hide();// 确定---隐藏
	});

	// 购买方---按钮(弹窗)
	$(".grid_p1").click(function() {
		$(".customer").show();// 弹出客户编码
	});

	$(".cus_close").click(function() {
		$(".customer").hide();// 关闭 ---客户编码
	});

	// 清单填开
	$(".orders_close").click(function() {
		//清空清单列表
//		$('#productOrderForm')[0].reset();
		$(".orders").hide();// 关闭
	});
	

//	// 清单填开---头部（完成）
//	$(".orders_tit_a3").click(function() {
//		$(".orders").hide();// 完成---隐藏
//	});

	// 对应信息表编号填写、确认
	$(".equi_close").click(function() {
		$(".equivalent").hide();// 关闭
	});

	$(".equi_no").click(function() {
		$(".equivalent").hide();// 取消
	});

	

	$(".errorx p").click(function() {
		$(".errorx").hide();// 关闭
	});

	$(".errorx span").click(function() {
		$(".errorx").hide();// 确定--隐藏
	});
	
	// 发票填开--开具增值税专用发票
	$(".Issue_close").click(function() {
		$(".Issue").hide();// 关闭
	});

	// 发票填开--开具增值税专用发票----头部
	// 1、退出
	$(".part_tit_a7").click(function() {
		$(".Issue").hide();// 退出
	});

	// 2、打印
	$(".part_tit_a6").click(function() {
		if((!$("#cName").val())){
			$("#typed").show();// 弹窗--打印(信息)
		}else{
			var flag=true;
//			alert($(".listing .list_scroll table tbody tr td .xxxxx").val());
			$(".listing .list_scroll table tbody tr input:text").each(function(){
				if($(this).attr("id") == "name") {
					if(!$(this).val()){
						$("#typed_error").show();// 弹窗--打印(信息)
						flag=false;
						return false;
					}
				}
			
			});
			if(!flag){
				return;
			}
			//验证是否加入了差额开票功能，如果加入了则判断不含税总金额是否大于差额扣除额
			//差额开票扣除额
			var deduction = checkNumAndParseFloat($(".balance_deduction").val());
			//差额开票扣除额不为0且大于第一条商品商品总价格时，弹出提示，不允许后续操作
			if(deduction > 0 && deduction > checkNumAndParseFloat($("#totalMoney").val())) {
				alertInfo("第1行：商品行含税销售额绝对值必须大于商品行扣除额绝对值！");
				return false;
			}
			
			//当用户打印之前发票单据为含税，设置成不含税，存入数据库
			if($(".listing .list_scroll table thead tr #price").html()=="单价(含税)"){
				
				$(".listing .list_scroll table thead tr #price").html("单价(不含税)");
				$(".listing .list_scroll table thead tr #money").html("金额(不含税)");
				particulars_haveTax=false;
				$(".listing .list_scroll table tbody tr").each(function(i,e){
					var priceEle=$(e).find("#price");
					var moneyEle=$(e).find("#money");
//					var taxMoney = $(e).find("#taxMoney");
					var taxMoney = $(e).find("#taxMoney").val();
					var taxRate=parseFloat($(e).find("#taxRate").val())/100;
					var number=$(e).find("#number").val();
					var noTaxMoney = parseFloat(moneyEle.val()) - parseFloat(taxMoney);
					var noTaxPrice = noTaxMoney / parseFloat(number);
					//判断单价后面有没有小数，如果没有则加上.00，如果有一位或两位小数，保留两位小数，其余的保留五位小数
					if(noTaxPrice%1 === 0 || noTaxPrice*10%1 === 0 || noTaxPrice*100%1) {
						priceEle.val(noTaxPrice.toFixed(2));
					} else {
						if(!isNaN(noTaxPrice)) {
							priceEle.val(noTaxPrice.toFixed(7));
						}
					}
					if(!isNaN(noTaxMoney)) {
						moneyEle.val(noTaxMoney.toFixed(2));
					}
				});
				getAllMoney();
			}
			//如果差额扣除额不为0，则为差额开票流程，需要改变开票数据
			if(deduction > 0) {
				$(".listing .list_scroll table tbody tr").each(function(i,e){
					$(e).find("#taxRate").val("***");
				});
				$("#notice_textarea").text("差额征税：" + deduction.toFixed(2));
			}
			$(".printx").show();
			$(".printx .prin_yes").unbind("click").bind("click",function(){
				if($(".whole_r_go").length>0){
					//答案数据
					var data=[];
					//查看是否使用了清单列表，如果使用，则需要将清单列表也保存在用户答案中
					if(productOrdersIsUse) {
						//存储清单页面数据
						$(".biaoge .biaoge_scroll table tbody tr").each(function(i,e){
							$(e).find("input").each(function(index,ele){
								$(ele).attr("name",$(ele).attr("id")+"[discount"+i+"]")
							});
						});
						var ordersData=$("#productOrderForm").serializeArray();
						for(var i=0;i<ordersData.length;i++){
							var inputData=ordersData[i];
							if(inputData.name.indexOf("listing_id") >= 0)
								continue;
							var isTrueValue = "";
							if(document.getElementById("istrue_" + inputData.name) != null) {
								isTrueValue = document.getElementById("istrue_" + inputData.name).value;
							}
							data.push({
								questionId:$("#questionId").val(),
								answerCode:inputData.name,
								answerDetail:trimStr(inputData.value, "g"),
								isTrue : trimStr(isTrueValue, "g") == trimStr(inputData.value, "g")?1:0
							});
						}
					}
					//存储发票页面数据
					$(".listing .list_scroll table tbody tr").each(function(i,e){
						$(e).find("input").each(function(index,ele){$(ele).attr("name",$(ele).attr("id")+"["+i+"]")});
					});
					var formData=$("#addTaxSpecialInvoiceForm").serializeArray();
					//将打印预览项清空
					$("#preview_particulars")[0].reset();
					for(var i=0;i<formData.length;i++){
						var inputData=formData[i];
						if(inputData.name.indexOf("listing_id") >= 0)
							continue;
						var isTrueValue = "";
						if(document.getElementById("istrue_" + inputData.name) != null) {
							isTrueValue = document.getElementById("istrue_" + inputData.name).value;
						}
						data.push({
							questionId:$("#questionId").val(),
							answerCode:inputData.name,
							answerDetail:trimStr(inputData.value, "g"),
							isTrue : trimStr(isTrueValue, "g") == trimStr(inputData.value, "g")?1:0
						});
						$(".preview input[name='" + inputData.name + "']").val(inputData.value);
						$(".preview p[name='" + inputData.name + "']").text(inputData.value);
						$(".preview h3[name='" + inputData.name + "']").text(inputData.value);
						$(".preview textarea[name='" + inputData.name + "']").text(inputData.value);
					}
					opacitybg();
					//保存发票信息
					$.ajax({
						url:"../course/saveanswer.json",
						data:JSON.stringify(data),
						contentType:"application/json",
						dataType:"json",
						type:"post",
						success:function(data){
							if(data.success){
								alert("打印成功");
							}
							opacityhid();
							$(".printx").hide();
							if($('input[name="type"]').val() == "专用发票") {
								$('#preview_img1').attr('src','images/fp/fp_print_zy.png');
								$('.preview .receipt .rece_city').css("color","#95a49f");
							} else {
								$('#preview_img1').attr('src','images/fp/fp_print_pt.png');
								$('.preview .receipt .rece_city').css("color","#1487c6");
							}
							$("#addTaxSpecialInvoiceForm")[0].reset();
							$(".Issue").hide();
							//将填开发票的状态设置为true，则关闭预览窗口为刷新页面
							isFillInvoice = true;
//							$(".side .side_box .whole li .whole_r_no:first").click();
							$('.preview').show();
							
						}
					});
				}else{
					alert("已结束的业务无法重新提交，请重新选择业务");
				}
			});
		}

	});
	
	// 加载客户编码列表
	loadCustomers(null,$('#menuTrainingCode').val(),null);
	//商品编码弹窗
	$(".listing .list_scroll table tbody").on("click","tr",function(){
		if($(this).next().hasClass('discount')) {
			alertInfo("请删除关联折扣行后再编辑该行数据。");
			return false;
		}
		$(this).addClass("selected").siblings().removeClass("selected");
	}).on("dblclick","tr #name",function(){
		$(this).parent().parent().addClass("selected").siblings().removeClass("selected");
		$(".commodity").show();
	});
	//商品编码弹窗-关闭
	$(".comm_close").click(function(){
		$(".commodity").hide();
	});

	loadProducts(null, $('#menuTrainingCode').val());
	//增行
	$(".particulars .part_tit_a4").click(function(){
		if(productOrdersIsUse)
			alertInfo("已经使用了清单功能请不要再进行增减行操作。");
		else if($(".balance_deduction").val() != "0") {
			alertInfo("差额征税的商品明细只能开具一行！");
		}
		else
			$(".listing .list_scroll table tbody tr:first").clone().appendTo(".listing .list_scroll table tbody").find("input").each(function(){$(this).val("")});
	});
	//减行
	$(".particulars .part_tit_a5").click(function(){
		if(productOrdersIsUse)
			alertInfo("已经使用了清单功能请不要再进行增减行操作。");
		else {
			if($(".listing .list_scroll table tbody tr").length>1&&confirm("你确定要删除这条记录吗？")){
				$(".listing .list_scroll table tbody tr.selected").remove();
			};
		}
	});
	
	$(".listing .list_scroll table thead tr #price").html("单价(不含税)");
	$(".listing .list_scroll table thead tr #money").html("金额(不含税)");
	
	//价格
	$(".particulars .part_tit_a3").click(function(){
		if(particulars_haveTax){
			$(".listing .list_scroll table thead tr #price").html("单价(不含税)");
			$(".listing .list_scroll table thead tr #money").html("金额(不含税)");
			particulars_haveTax=false;
			$(".listing .list_scroll table tbody tr").each(function(i,e){
				var priceEle=$(e).find("#price");
				var moneyEle=$(e).find("#money");
//				var taxMoney = $(e).find("#taxMoney");
				var taxMoney = $(e).find("#taxMoney").val();
				var taxRate=parseFloat($(e).find("#taxRate").val())/100;
				var number=$(e).find("#number").val();
					
//				//由于梦圆开的第一张发票含税价相差1分钱，没有办法，只能这样改
//				if(priceEle.val() == "4.50") {
//					priceEle.val("4.50001");
//				}
//				if(priceEle.val() == "26.00") {
//					priceEle.val("26.00001");
//				}
//				if(taxRate && number){priceEle.val((priceEle.val()/(1+parseFloat(taxRate))).toFixed(5));}
////				taxMoney.val((parseFloat(moneyEle.val()) - parseFloat(number*priceEle.val())).toFixed(2));
//				var taxMoneyTemp = (parseFloat(number*priceEle.val()) * parseFloat(taxRate)).toFixed(2);
//				//如果税额为0则可能为折扣行，需要从总金额中计算出税额
//				if(taxMoneyTemp == "0.00") {
//					taxMoneyTemp = (parseFloat(moneyEle.val())*taxRate/(1 + taxRate)).toFixed(2);
//				}
//				taxMoney.val(taxMoneyTemp);
//				if(number){moneyEle.val(parseFloat(number*priceEle.val()).toFixed(2));}
//				//没有数量说明为折扣后，总金额需要扣除之前的税额
//				else{moneyEle.val((parseFloat(moneyEle.val()) - taxMoneyTemp).toFixed(2));}
					
				var noTaxMoney = parseFloat(moneyEle.val()) - parseFloat(taxMoney);
				var noTaxPrice = noTaxMoney / parseFloat(number);
				//判断单价后面有没有小数，如果没有则加上.00，如果有一位或两位小数，保留两位小数，其余的保留五位小数
				if(noTaxPrice%1 === 0 || noTaxPrice*10%1 === 0 || noTaxPrice*100%1 === 0) {
					priceEle.val(noTaxPrice.toFixed(2));
				} else {
					if(!isNaN(noTaxPrice)) {
						priceEle.val(noTaxPrice.toFixed(7));
					}
				}
				if(!isNaN(noTaxMoney)) {
					moneyEle.val(noTaxMoney.toFixed(2));
				}
				
			});
		}else{
			$(".listing .list_scroll table thead tr #price").html("单价(含税)");
			$(".listing .list_scroll table thead tr #money").html("金额(含税)");
			particulars_haveTax=true;
			$(".listing .list_scroll table tbody tr").each(function(i,e){
				var priceEle=$(e).find("#price");
				var moneyEle=$(e).find("#money");
				var taxRate=parseFloat($(e).find("#taxRate").val())/100;
				var number=$(e).find("#number").val();
//				var taxMoney = $(e).find("#taxMoney");
				var taxMoney = $(e).find("#taxMoney").val();
				
				var money = parseFloat(moneyEle.val()) + parseFloat(taxMoney);
				var taxPrice = money / parseFloat(number);
				//判断单价后面有没有小数，如果没有则加上.00，如果有一位或两位小数，保留两位小数，其余的保留五位小数
				if(taxPrice%1 === 0 || taxPrice*10%1 === 0 || taxPrice*100%1) {
					priceEle.val(taxPrice.toFixed(2));
				} else {
					if(!isNaN(taxPrice)) {
						priceEle.val(taxPrice.toFixed(7));
					}
				}
				if(!isNaN(money)) {
					moneyEle.val(money.toFixed(2));
				}
				
//				if(taxRate && number){priceEle.val((priceEle.val()*(1+parseFloat(taxRate))).toFixed(5));}
//				if(number){moneyEle.val((number*priceEle.val()).toFixed(2));}
//				//没有数量说明为折扣后，含税总金额需要加上之前的税额
//				else{moneyEle.val((parseFloat(moneyEle.val()) + parseFloat(taxMoney.val())).toFixed(2));}
//				taxMoney.val("0.00");
			});
		}
		getAllMoney();
	});
	
//	$(".listing .list_scroll table tbody").on("keyup","tr #number",function(){
//		var e=$(this).parent().parent();//取得当前tr
//		var number=$(this).val(($(this).val())).val();
////		var number=$(this).val(parseInt($(this).val())||"").val();//替换后的数量（整数）
//		var _number=$(this);
//		var _money=e.find("#money");
//		var _price=e.find("#price");
//		var _taxRate=e.find("#taxRate");
//		var _taxMoney=e.find("#taxMoney");
//		//差额开票扣除额
//		var deduction = checkNumAndParseFloat($(".balance_deduction").val());
//		if(isDoCount(e)){
//			var price=parseFloat(_price.val());//表单内的价格（含税/不含税）
//			var money=parseFloat(number*price).toFixed(2);//将要填入表单的金额（含税/不含税）
////			var taxRate=parseFloat(_taxRate.val());//表单内的税率
//			var taxRate=parseFloat(_taxRate.val())/100;
//			var noTaxMoney=(particulars_haveTax?(money/(1+taxRate)).toFixed(2):money);
//			_money.val(money);
////			if(particulars_haveTax) {
////				_taxMoney.val("0.00");
////			} else {
////				//证明需要进行差额开票
////				if(deduction > 0) {
////					_taxMoney.val(((checkNumAndParseFloat(noTaxMoney) - deduction)*taxRate).toFixed(2));
////				} else {
////					_taxMoney.val((noTaxMoney*taxRate).toFixed(2));
////				}
////			}
//			if(particulars_haveTax) {
//				//（金额-差额）/（1+税率）*税率
//				_taxMoney.val(((checkNumAndParseFloat(money) - deduction)/(1 + taxRate) * taxRate).toFixed(2));
//			} else {
//				//（金额-差额）*税率
//				_taxMoney.val(((checkNumAndParseFloat(noTaxMoney) - deduction)*taxRate).toFixed(2));
//			}
//			getAllMoney();
//		}
//	}).on("blur","tr #price",function(){
//		var e=$(this).parent().parent();
//		$(this).val(parseFloat($(this).val())||"0.00");
//		var _number=e.find("#number");
//		var _money=e.find("#money");
//		var _price=$(this);
//		var _taxRate=e.find("#taxRate");
//		var _taxMoney=e.find("#taxMoney");
//		//差额开票扣除额
//		var deduction = checkNumAndParseFloat($(".balance_deduction").val());
//		if(isDoCount(e)){
//			var taxRate=parseFloat(_taxRate.val())/100;
////			_money.val((_price.val()*_number.val()*(particulars_haveTax?(1+parseFloat(_taxRate.val())):1)).toFixed(2));
//			_money.val((parseFloat(_price.val()*_number.val())).toFixed(2));
////			if(particulars_haveTax) {
////				_taxMoney.val("0.00");
////			} else {
////				//证明需要进行差额开票
////				if(deduction > 0) {
////					_taxMoney.val(((checkNumAndParseFloat(_money.val()) - deduction)*parseFloat(_taxRate.val())/100).toFixed(2));
////				} else {
//////					_taxMoney.val((_money.val()*_taxRate.val()).toFixed(2));
////					_taxMoney.val((_money.val()*parseFloat(_taxRate.val())/100).toFixed(2));
////				}
////			}
//			if(particulars_haveTax) {
//				//（金额-差额）/（1+税率）*税率
//				_taxMoney.val(((checkNumAndParseFloat(_money.val()) - deduction)/(1 + taxRate) * taxRate).toFixed(2));
//			} else {
//				//（金额-差额）*税率
//				_taxMoney.val(((checkNumAndParseFloat(_money.val()) - deduction)*taxRate).toFixed(2));
//			}
//		}
//		if(parseFloat($(this).val())%1 === 0 || parseFloat($(this).val())*10%1 === 0) {
//			$(this).val(parseFloat($(this).val()).toFixed(2));
//		}
//		getAllMoney();
//		//差额开票扣除额不为0且大于第一条商品商品总价格时，弹出提示，不允许后续操作
//		if(deduction > 0 && parseFloat(_number.val()) > 0 && deduction > (checkNumAndParseFloat($("#totalMoney").val()))) {
//			alertInfo("第1行：商品行含税销售额绝对值必须大于商品行扣除额绝对值！");
//			return false;
//		}
//	}).on("blur","tr #taxRate",function(){
////		if($(this).val().indexOf("%") > 0) {
//		if($(this).val().indexOf("%") < 0) {
////			$(this).val((parseFloat($(this).val())/100).toFixed(2)||"");
//			$(this).val(((parseFloat($(this).val())*100).toFixed(2) + "%")||"");
//		} else {
//			$(this).val((parseFloat($(this).val()).toFixed(2) + "%")||"");
//		}
//		if(isDoCount($(this).parent().parent())){
////			$(this).val(parseFloat($(this).val()).toFixed(2)||"");
//			if($(this).val().indexOf("%") < 0) {
//				$(this).val(((parseFloat($(this).val())*100).toFixed(2) + "%")||"");
//			} else {
//				$(this).val((parseFloat($(this).val()).toFixed(2) + "%")||"");
//			}
//			var e=$(this).parent().parent();
//			var _number=e.find("#number");
//			var _money=e.find("#money");
//			var _price=e.find("#price");
//			var _taxRateValue=parseFloat($(this).val())/100;
//			var _taxMoney=e.find("#taxMoney");
//			//差额开票扣除额
//			var deduction = checkNumAndParseFloat($(".balance_deduction").val());
//			_money.val((parseFloat(_price.val()*_number.val())).toFixed(2));
////			if(particulars_haveTax) {
////				_taxMoney.val("0.00");
////			} else {
////				_taxMoney.val((_money.val()*_taxRateValue).toFixed(2));
////			}
//			if(particulars_haveTax) {
//				//（金额-差额）/（1+税率）*税率
//				_taxMoney.val(((checkNumAndParseFloat(_money.val()) - deduction)/(1 + _taxRateValue) * _taxRateValue).toFixed(2));
//			} else {
//				//（金额-差额）*税率
//				_taxMoney.val(((checkNumAndParseFloat(_money.val()) - deduction) * _taxRateValue).toFixed(2));
//			}
//			getAllMoney();
//		}
//	}).on("blur","tr #number",function() {
//		var e=$(this).parent().parent();
//		var _number=e.find("#number");
//		var _money=e.find("#money");
//		var _price=e.find("#price");
//		//差额开票扣除额
//		var deduction = checkNumAndParseFloat($(".balance_deduction").val());
//		if(isDoCount(e)){
//			//差额开票扣除额不为0且大于第一条商品商品总价格时，弹出提示，不允许后续操作
//			if(deduction > 0 && parseFloat(_price.val()) > 0 && deduction > checkNumAndParseFloat($("#totalMoney").val())) {
//				alertInfo("第1行：商品行含税销售额绝对值必须大于商品行扣除额绝对值！");
//				return false;
//			}
//		}
//	});
	
	$(".listing .list_scroll table tbody").on("keyup","tr input",function() {
		var e=$(this).parent().parent();
		var _number=e.find("#number");
		var _money=e.find("#money");
		var _price=e.find("#price");
		var _taxRate=e.find("#taxRate");
		var _taxMoney=e.find("#taxMoney");
		if(isDoCount(e)){
			var number=checkNumAndParseFloat(_number.val());
			var price=checkNumAndParseFloat(_price.val());//表单内的价格（含税/不含税）
			var money=checkNumAndParseFloat(number*price);//将要填入表单的金额（含税/不含税）
			var taxRate=0;
			//将税率后面加入%：判断是否有%，如果没有，则在原数据的基础上加100倍然后加%，如果有就进行规范
			if(_taxRate.val().indexOf("%") < 0) {
				taxRate = parseFloat(_taxRate.val());
			} else {
				taxRate = parseFloat(_taxRate.val())/100;
			}
			var noTaxMoney=(particulars_haveTax?(money/(1+taxRate)):money);
			//差额开票扣除额
			var deduction = checkNumAndParseFloat($(".balance_deduction").val());
			_money.val(money.toFixed(2));
			var taxMoney = 0;
			if(particulars_haveTax) {
				//（金额-差额）/（1+税率）*税率
				taxMoney = (money - deduction)/(1 + taxRate) * taxRate;
			} else {
				//（金额-差额）*税率
				taxMoney = (money - deduction) * taxRate;
			}
			//判断如果是差额开票，税额是否小于零，小于零则填入空
			if(deduction > 0 && taxMoney < 0) {
				_taxMoney.val("");
			} else {
				_taxMoney.val(taxMoney.toFixed(2));
			}
			getAllMoney();
		}
	}).on("blur","tr input",function() {
		var e=$(this).parent().parent();
		var _number=e.find("#number");
		var _money=e.find("#money");
		var _price=e.find("#price");
		var _taxRate=e.find("#taxRate");
		//差额开票扣除额
		var deduction = checkNumAndParseFloat($(".balance_deduction").val());
		//将税率后面加入%：判断是否有%，如果没有，则在原数据的基础上加100倍然后加%，如果有就进行规范
		if(_taxRate.val().indexOf("%") < 0) {
			_taxRate.val(((parseFloat(_taxRate.val())*100).toFixed(2) + "%")||"");
		} else {
			_taxRate.val((parseFloat(_taxRate.val()).toFixed(2) + "%")||"");
		}
		//判断单价后面有没有小数，如果没有则加上
		if(parseFloat(_price.val())%1 === 0 || parseFloat(_price.val())*10%1 === 0) {
			_price.val(parseFloat(_price.val()).toFixed(2));
		}
		if(isDoCount(e)){
			//差额开票扣除额不为0且大于第一条商品商品总价格时，弹出提示，不允许后续操作
			if(deduction > 0 && checkNumAndParseFloat(_price.val()) > 0 && checkNumAndParseFloat(_number.val()) > 0 
					&& deduction > checkNumAndParseFloat($("#totalMoney").val())) {
				alertInfo("第1行：商品行含税销售额绝对值必须大于商品行扣除额绝对值！");
				return false;
			}
		}
	});
	
});

function isDoCount(e){
	return e.find("#number")&&e.find("#price").val()&&e.find("#taxRate").val();
}

function getAllMoney(){
	var totalNoTaxMoney=0.00;
	var totalTaxMoney=0.00;
	var totalMoney=0.00;
	$(".listing .list_scroll table tbody tr").each(function(){
		var e=$(this);
		var _number=e.find("#number");
		var _money=e.find("#money");
		var _price=e.find("#price");
		var _taxRate=e.find("#taxRate");
		var _taxMoney=e.find("#taxMoney");
		
		
//		var taxRate=1+parseFloat(_taxRate.val());
		var taxRate=1+parseFloat(_taxRate.val())/100;
		var money=parseFloat(_money.val());
//		var noTaxMoney=particulars_haveTax?(money/taxRate):money;
		var noTaxMoney = money;
		totalNoTaxMoney+=noTaxMoney||0.00;
		totalTaxMoney+=parseFloat(_taxMoney.val())||0.00;
	});
//	totalMoney=parseFloat(totalNoTaxMoney+totalTaxMoney).toFixed(2);
	//查看是否含税，如果含税，则总金额=totalNoTaxMoney，如果不含税，则总金额=totalNoTaxMoney+totalTaxMoney
	if(particulars_haveTax) {
		totalMoney = totalNoTaxMoney.toFixed(2);
	} else {
		totalMoney = parseFloat(totalNoTaxMoney+totalTaxMoney).toFixed(2);
	}
	$("#totalNoTaxMoney").val(totalNoTaxMoney.toFixed(2));
	$("#totalTaxMoney").val(totalTaxMoney.toFixed(2));
	$("#totalMoney").val(totalMoney);
	$("#upMoney").val(numToChinese(totalMoney));
}


/**
 * 加载客户编码列表
 * @param fatherCode 上级编码
 * @param trainingCode 菜单类目
 * @param searchContent 搜索条件
 */
function loadCustomers(fatherCode, trainingCode, searchContent) {
	$.ajax({
		url : '../customer/list.html',
		data : {
			fatherCode : fatherCode,
			trainingCode : trainingCode,
			searchContent : searchContent
		},
		success : function(data) {
			isSessionOut(data);
			$('#customerTable').html(data);
			$(".customer .reports .scr_cont table tbody tr").click(function() {
				$(this).addClass("selected").siblings().removeClass("selected");
			}).dblclick(function(){
				$(".Issue .particulars #part_buyer_id").val($(this).find("#rece_title_id").html());
				$(".Issue .particulars #cName").val($(this).find("#name").val());
				$(".Issue .particulars #cTaxId").val($(this).find("#taxId").val());
				$(".Issue .particulars #cAddress").val($(this).find("#address").val());
				$(".Issue .particulars #cAccounts").val($(this).find("#accounts").val());
				$(".customer").hide();
			});
		}
	});
	$.ajax({
		url : '../customer/list_tree.html',
		data : {trainingCode:trainingCode},
		success : function(data) {
			isSessionOut(data);
			$('.kh_tree').html(data);
		}
	});
//	if(fatherCode != null) {
//		$("#add_kh #addCustomer #fatherCode").val(fatherCode);
//		$(".modify #editCustomer #fatherCode").val(fatherCode);
//		$('.addeditshow_tree').hide();
//	}
	$(".comm_info_search").val("");
}
//加载商品编码列表
function loadProducts(fatherCode, trainingCode) {
	var searchContent = $(".commodity .cus_tit .comm_info_search").val();
	jQuery.ajax({
		url : '../product/list.html',
		data : {
			fatherCode : fatherCode,
			trainingCode : trainingCode,
			searchContent : searchContent
		},
		success : function(data) {
			isSessionOut(data);
			$('#productTable').html(data);
			$("#productTable").find("table tbody tr").click(function(){
				$(this).addClass("selected").siblings().removeClass("selected");
			}).dblclick(function(){
				//发票填开页面双击选中商品
				var bindTr=$(".listing .list_scroll table tbody tr.selected");
				bindTr.find("#listing_id").val($(this).find("#forxx_scroll_id").text());
				bindTr.find("#name").val("*" + $(this).find("#taxclassAbbreviation").text() + "*" + $(this).find("#name").text());
				bindTr.find("#spec").val($(this).find("#spec").text());
				bindTr.find("#unit").val($(this).find("#unit").text());
				bindTr.find("#price").val(($(this).find("#price").text()*(particulars_haveTax?(1+parseFloat($(this).find("#taxRate").text())):1)).toFixed(2));
//				bindTr.find("#taxRate").val($(this).find("#taxRate").html());
				bindTr.find("#taxRate").val((parseFloat($(this).find("#taxRate").text())*100).toFixed(2) + "%");
				bindTr.find("#number,#money,#taxMoney").val("");
				//清单页面双击选中商品
				var orderTr = $(".biaoge .biaoge_scroll table tbody tr.selected");
				orderTr.find("#listing_id").val($(this).find("#forxx_scroll_id").text());
				orderTr.find("#name").val("*" + $(this).find("#taxclassAbbreviation").text() + "*" + $(this).find("#name").text());
				orderTr.find("#spec").val($(this).find("#spec").text());
				orderTr.find("#unit").val($(this).find("#unit").text());
				orderTr.find("#price").val(($(this).find("#price").text()*(particulars_haveTax?(1+parseFloat($(this).find("#taxRate").text())):1)).toFixed(2));
//				orderTr.find("#taxRate").val($(this).find("#taxRate").html());
				orderTr.find("#taxRate").val((parseFloat($(this).find("#taxRate").text())*100).toFixed(2) + "%");
				orderTr.find("#number,#money,#taxMoney").val("");
				$(".commodity").hide();
			});
			$("#productTable").find(".ta_left").removeClass("ta_left").addClass("t_left");
		}
	});
	$(".comm_info_search").val("");
}

function showIssue(type) {
	//清空商品表单数据
	$(".listing .list_scroll table tbody tr:not(:first)").remove();
	$('#addTaxSpecialInvoiceForm')[0].reset();
	//清除差额扣除额数据
	$(".balance_deduction").removeAttr("readonly");
	$(".balance_confirm").prop("disabled", false);
	$(".balance_confirm").removeAttr("style");
	var categoryCode = $("p[name='categoryCode[" + type + "]']").text();
	var startNumber = $("p[name='startNumber[" + type + "]']").text();
	$('.bianhao_p1').html(categoryCode);
	$('.bianhao_p2').html(startNumber);
	$('input[name="categoryCode"]').val(categoryCode);
	$('input[name="invoiceNumber"]').val(startNumber);
	if(type == 1) {
		$('#fptk_bgimg').attr('src','images/fp/fptk.png');
		$('.Issue .Issue_tit').find('span').text("开具增值税专用发票");
		$('input[name="type"]').val("专用发票");
	} else {
		$('#fptk_bgimg').attr('src','images/fp/fptk_pt.jpg');
		$('.Issue .Issue_tit').find('span').text("开具增值税普通发票");
		$('input[name="type"]').val("普通发票");
	}
	
	$(".Issue").show();// 弹出--开具增值税专用发票
	$(".flour").hide();// 发票号码确认--隐藏
}