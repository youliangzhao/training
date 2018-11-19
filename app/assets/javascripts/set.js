//头部
$(function() {
	$(".tit_regis").click(function() {
		$(".register").show();
	});

	$(".regi_close").click(function() {
		$(".register").hide();
	});

	$(".tit_par").click(function() {
		$(".parameterx").show();
	});

	$(".tit_mai").click(function() {
		$(".mailx").show();
	});

	$(".mai_close").click(function() {
		$(".mailx").hide();
	});

	$(".mai_aways").click(function() {
		$(".mailx").hide();
	});

	$(".mai_confirmx").click(function() {
		$(".mailx").hide();
	});
	// 非实训 start
	$(".wrong p").click(function() {
		$(".wrong").hide();
	});

	$(".wrong span").click(function() {
		$(".wrong").hide();
	});
	// end 非实训

	$(".tit_wrong").click(function() {
		$(".wrong").show();
	});

	// 头部--客户管理(显示)
	$(".tit_kehu").click(function() {
		$(".customer").show();
	});

	// 头部--商品编码(显示)
	$(".tit_shangpin").click(function() {
		$(".commodity").show();
	});

	// 参数设置
	// $(function(){
	// 系统参数设置的切换
	$("#sh_btn").find("li").click(function() {
		$(this).addClass("selx").siblings().removeClass("selx");

		var _index = $(this).index();
		$(".sh_pag").hide().eq(_index).show();
	});

	// });

	$(".xt_a1").click(function() {
		$(".parameterx").show();
	});

	$(".parameterx .par_close").click(function() {
		$(".parameterx").hide();
	});

	$(".par_btn .par_no").click(function() {
		$(".parameterx").hide();
	});

	$(".par_btn .par_yes").click(function() {
		$(".parameterx").hide();
	});

	// 系统注册
	// $(function(){
	$("#Ta_btn").find("li").click(function() {
		$(this).addClass("Ta_sel").siblings().removeClass("Ta_sel");

		var _index = $(this).index();
		$(".Ta_page").hide().eq(_index).show();
	});
	// });
	//validate默认值
	$.validator.setDefaults({
		errorClass : "table_td_red",
		errorElement : "span",
		errorPlacement : function(error, element) {
			error.appendTo(element.parent());
		}
	});
});
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
			});
		}
	});
	if(fatherCode != null) {
		$("#add_kh #addCustomer #fatherCode").val(fatherCode);
		$("#modify_kh #editCustomer #fatherCode").val(fatherCode);
		$('.addeditshow_tree').hide();
	}
	$(".comm_info_search").val("");
}
/**
 * 用于载入左侧树中的客户编码上级编码
 */
function loadFatherCustomers() {
	$.ajax({
		url : '../customer/list_tree.html',
		data : {trainingCode:$('#menuTrainingCode').val()},
		success : function(data) {
			isSessionOut(data);
			$('.kh_tree').html(data);
		}
	});
}
$(function() {
	// 加载客户编码列表数据
	loadCustomers(null,$('#menuTrainingCode').val(),null);
	loadFatherCustomers();
	//将客户上级编码填入上级编码框中
	$(".addeditshow_tree .st_tree ul").find(".st_tree_khbm").on("click",function(){
		alertInfo("添加客户请选择下级编码。");
		return false;
	});
	// 打开客户编码弹出窗
	$(".xt_a2").click(function() {
		$(".customer").show();
	});
	// 关闭客户编码弹窗
	$(".cus_close").click(function() {
		$(".customer").hide();
	});
	/*
	 * 客户编码头部（增、删、改、退出）
	 */
	// 1、退出
	$(".title_out").click(function() {
		$(".customer").hide();
	});
	// 2、导入，导出
	$(".title_fei").click(function() {
		// 非实训
		$(".wrong").show();
	});
	// 新增客户编码弹窗
	$(".title_add").click(function() {
		$("#add_kh").show();
		$(".zclassify").hide();
	});
	//新增客户分类编码弹窗
	$(".zadd").click(function() {
		$("#add_khclass").show();
		$(".zclassify").hide();
	});
	//修改客户分类编码弹窗
	$(".zchange").click(function() {
		if(!$(this).hasClass('active')) {
			$('.reports .re_scroll #customerTable').find("input[id='code']").each(function() {
				if($(this).val() == 
					$('.customer .choose_zchange ul li').find('.st_tree_choose').attr('ref')) {
					$(this).parent().parent().find('input').each(function() {
						var id = $(this).attr("id");
						var value = $(this).val();
						var e = $("#modify_khclass").find(
								"#" + id);
						e.val(value);
					});
				}
			});
			$('#modify_khclass').show();
			$('.zclassify').hide();
		}
	});

	// 新增客户编码表单验证
	$('#addCustomer').validate({
		rules : {
			"code" : {
				required : true,
				digits : true
			},
			"name" : {
				required : true
			},
			"taxId" : {
				required : true
			}
		},
		messages : {
			"code" : {
				required : "请输入客户编码",
				digits : "请输入有效数字"
			},
			"name" : {
				required : "请输入客户名称"
			},
			"taxId" : {
				required : "请输入客户税号"
			}
		}
	});
	// 新增客户编码
//	$('#save').click(function() {
	$('.kh_save').click(function() {
//		if ($('#add_kh #addCustomer').valid()) {
		if ($('#add_kh #addCustomer #code').val() != "") {
			if($('#add_kh #addCustomer #fatherCode').val() == "" || 
					$('#add_kh #addCustomer #code').val().indexOf($('#add_kh #addCustomer #fatherCode').val()) ||
					$('#add_kh #addCustomer #code').val() == $('#add_kh #addCustomer #fatherCode').val()) {
				alertInfo("必须以上级编码开头，且不能跟上级编码相同！");
				return false;
			}
//			alert(1);
//			alert($('#add_kh #addCustomer #code').val());
			jQuery.ajax({
				url : '../customer/add.json',
				data : $('#add_kh #addCustomer').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
//					//获取正在进行中的li，如果为新增商品编码则将这道题变为已答状态
//					var li_go = $('.whole .whole_right .whole_r_go').parent().parent();
//					var span = li_go.find('span').attr("title");
//					if(span == "新增客户编码") {
//						submitQuestion($('#questionId').val());
//					}
					//清除缓存
					$('#add_kh #addCustomer')[0].reset();
					
					$('.add_box').hide();
					loadCustomers(null,$('#menuTrainingCode').val(),null);
					loadFatherCustomers();
				}
			});
		}
		if ($('#add_khclass #addCustomer #code').val() != "") {
//			alert(2);
//			alert($('#add_khclass #addCustomer #code').val());
			jQuery.ajax({
				url : '../customer/add.json',
				data : $('#add_khclass #addCustomer').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
					//清除缓存
					$('#add_khclass #addCustomer')[0].reset();
					$('.add_box').hide();
					loadCustomers(null,$('#menuTrainingCode').val(),null);
					loadFatherCustomers();
				}
			});
		}
	});
	// 客户编码--增加--（关闭）
	$(".add_close").click(function() {
		$('#add_kh #addCustomer')[0].reset();
		$('#add_khclass #addCustomer')[0].reset();
		$(".add_box").hide();
		$('.addeditshow_tree').hide();
	});
	// 修改客户编码弹窗
	$(".title_modify").click(function() {
		if ($('.customer .reports .scr_cont table tbody tr.selected').length != 0) {
			$('.customer .reports .scr_cont table tbody tr.selected').find('input,textare').each(function() {
				var id = $(this).attr("id");
				var value = $(this).val()
						|| $(this).html();
				var e = $("#modify_kh").find(
						"#" + id);
				if ($(this).is("input")) {
					e.val(value);
				} else if ($(this)
						.is("textare")) {
					e.html(value);
				}
			});
//			$(".modify").show();
			$("#modify_kh").show();
		} else {
			alertInfo("请选择要修改的记录");
		}
	});
	// 修改客户上级编码表单验证
	$('#editCustomer_khclass').validate({
		rules : {
			"code" : {
				required : true
			},
			"name" : {
				required : true
			}
		},
		messages : {
			"code" : {
				required : "请输入客户编码"
			},
			"name" : {
				required : "请输入客户名称"
			}
		}
	});
	// 修改客户编码表单验证
	$('#editCustomer').validate({
		rules : {
			"code" : {
				required : true
			},
			"name" : {
				required : true
			},
			"taxId" : {
				required : true
			}
		},
		messages : {
			"code" : {
				required : "请输入客户编码"
			},
			"name" : {
				required : "请输入客户名称"
			},
			"taxId" : {
				required : "请输入客户税号"
			}
		}
	});
	// 修改客户上级编码
	$('#editSave_khclass').click(function() {
		if ($('#editCustomer_khclass').valid()) {
			jQuery.ajax({
				url : '../customer/edit.json',
				data : $('#editCustomer_khclass').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
					$('.modify').hide();
					loadCustomers(null,$('#menuTrainingCode').val(),null);
				}
			});
		}
	});
	// 修改客户编码
	$('#editSave').click(function() {
		if($('#editCustomer #fatherCode').val() == "" || 
				$('#editCustomer #code').val().indexOf($('#editCustomer #fatherCode').val()) ||
				$('#editCustomer #code').val() == $('#editCustomer #fatherCode').val()) {
			alertInfo("必须以上级编码开头，且不能跟上级编码相同！");
			return false;
		}
		if ($('#editCustomer').valid()) {
			jQuery.ajax({
				url : '../customer/edit.json',
				data : $('#editCustomer').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
					$('.modify').hide();
					loadCustomers(null,$('#menuTrainingCode').val(),null);
				}
			});
		}
	});
	// 客户编码--修改--（关闭）
	$(".modify_close").click(function() {
		$(".modify").hide();
		$('.addeditshow_tree').hide();
	});

	// 客户编码--删除
	$(".title_remover").click(function() {
		var selectTr = $('.customer .reports .scr_cont table tbody tr.selected');
		if (selectTr.length != 0) {
			var code = selectTr.find('td #code').val();
			var nextCode = selectTr.next('tr').find('td #code').val();
			if(nextCode) {
				if(nextCode.indexOf(code) >= 0) {
					alertInfo("该编码下有绑定下级编码，不能删除。");
					return false;
				}
			}
			$(".removerx").show();
			// $(".scr_cont").css("opacity","0.4");//透明层
		} else {
			alertInfo("请选择要删除的记录");
		}
	});
	
	// 确定删除按钮
	$(".re_btn_ok").click(function() {
		$.ajax({
			url : '../customer/delete.json',
			data : {
				customerId : $('.customer .reports .scr_cont table tbody tr.selected').find("input#id").val()
			},
			type : 'post',
			success : function(data) {
				alertInfo(data.msg);
				$(".removerx").hide();
				loadCustomers(null,$('#menuTrainingCode').val(),null);
				loadFatherCustomers();
			}
		});
	});
	// 取消删除按钮-X
	$(".removerx p").click(function() {
		$(".removerx").hide();
	});
	// 取消删除按钮-取消
	$(".re_btn_no").click(function() {
		$(".removerx").hide();
	});
});

// 商品编码
// 商品编码税率
function loadProductTaxes(fn) {
	jQuery.ajax({
		url : '../product/taxlist.html',
		success : function(data) {
			isSessionOut(data);
			$('#productTaxList').html(data);
			fn();
		}
	});
}
/**
 * 根据选入的上级编码填入框中
 * @param fatherCode
 */
function choosespbm(fatherCode) {
	$(".adding #addProduct #fatherCode").val(fatherCode);
	$(".revised #editProduct #fatherCode").val(fatherCode);
	$('.addeditshow_tree').hide();
}

// 商品编码表
function loadProducts(fatherCode, trainingCode) {
	var searchContent = $(".commodity .comm_tit .comm_info_search").val();
//	console.log(searchContent);
	jQuery.ajax({
		url : '../product/list.html',
		data : {
			fatherCode : fatherCode,
			trainingCode : trainingCode,
			searchContent : searchContent
		},
		success : function(data) {
			isSessionOut(data);
			$('.commodity .formx .for_con').html(data);
			$(".commodity .formx .for_con table tbody tr").click(function(){
				$(this).addClass("selected").siblings().removeClass("selected");
			});
		}
	});
	$(".comm_info_search").val("");
}

$(function() {
	//加载商品编码表
	loadProducts(null, $('#menuTrainingCode').val());
	// 商品编码 --(头部)
	$(".xt_a3").click(function() {
		$(".commodity").show();
	});
	// 商品编码弹出框-X
	$(".comm_close").click(function() {
		$(".commodity").hide();
	});
	// 商品编码 -退出
	$(".comm_out").click(function() {
		$(".commodity").hide();
	});
	// 商品编码 -导入，导出
	$(".comm_fei").click(function() {
		$(".wrong").show();
	});
	// 商品编码-删除（弹窗）
	$(".comm_remover").click(function() {
		if ($('.commodity .formx .for_con table tbody tr.selected').length != 0) {
			$(".deletex").show();
		} else {
			alertInfo("请选择要删除的记录");
		}
	});
	//商品编码-删除-X
	$(".deletex p").click(function() {
		$(".deletex").hide();
	});
	//商品编码-删除-确定
	$(".del_btn .del_btn_ok").click(function() {
		$.ajax({
			url : '../product/delete.json',
			data : {
				productId : $('.commodity .formx .for_con table tbody tr.selected').find("input#id").val()
			},
			type : 'post',
			success : function(data) {
				alertInfo(data.msg);
				$(".deletex").hide();
				loadProducts(null, $('#menuTrainingCode').val());
			}
		});
	});
	//商品编码-删除-取消
	$(".del_btn .del_btn_no").click(function() {
		$(".deletex").hide();
	});
	//商品编码-增加
	$(".comm_add").click(function() {
		$(".adding").show();
	});
	//商品编码-增加-X
	$(".adding_close").click(function() {
		$('.adding #addProduct')[0].reset();
		$(".adding").hide();
		$('.addeditshow_tree').hide();
	});
	//商品编码-增加-表单验证
	$('#addProduct').validate({
		rules : {
			"code" : {
				required : true
			},
			"name" : {
				required : true
			},
			"taxClassCode" : {
				required : true
			}
		},
		messages : {
			"code" : {
				required : "不能为空"
			},
			"name" : {
				required : "不能为空"
			},
			"taxClassCode" : {
				required : "不能为空"
			}
		}
	});
	// 新增客户编码
	$('#addProSave').click(function() {
		if($('#addProduct #fatherCode').val() == "" || 
				$('#addProduct #code').val().indexOf($('#addProduct #fatherCode').val()) ||
				$('#addProduct #code').val() == $('#addProduct #fatherCode').val()) {
			alertInfo("必须以上级编码开头，且不能跟上级编码相同！");
			return false;
		}
		if ($('#addProduct').valid()) {
			jQuery.ajax({
				url : '../product/add.json',
				data : $('#addProduct').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
//					//获取正在进行中的li，如果为新增商品编码则将这道题变为已答状态
//					var li_go = $('.whole .whole_right .whole_r_go').parent().parent();
//					var span = li_go.find('span').attr("title");
//					if(span == "新增商品编码") {
//						submitQuestion($('#questionId').val());
//					}
					//清除缓存
					$('.adding #addProduct')[0].reset();
					$('.adding').hide();
					loadProducts(null, $('#menuTrainingCode').val());
				}
			});
		}
	});
	
	
	// 商品编码-修改
	$(".comm_modify").click(function() {
		if ($('.commodity .formx .for_con table tbody tr.selected').length != 0) {
			$('.commodity .formx .for_con table tbody tr.selected').find('td').each(function() {
				var id = $(this).attr("id")||$(this).find("input").attr("id");
				var value = $(this).find("input").val() || $(this).text();
				var e = $(".commodity .revised").find("#" + id);
				if (e.is("input")) {
					if(id == "productTaxId" && value.length >60) {
						e.val("");
					} else {
						e.val(value);
					}
				} else if (e.is("select")) {
					e.find("option").each(function(){
						if(value==$(this).val()||value==$(this).text()){
							$(this).prop("selected",true);
							return false;
						}
					});
				}
			});
			$(".revised").show();
		} else {
			alertInfo("请选择要修改的记录");
		}
	});

	// 修改商品编码表单验证
	$('#editProduct').validate({
		rules : {
			"code" : {
				required : true
			},
			"name" : {
				required : true
			}
		},
		messages : {
			"code" : {
				required : "请输入客户编码"
			},
			"name" : {
				required : "请输入客户名称"
			}
		}
	});
	// 修改商品编码
	$('#editProSave').click(function() {
		if($('#editProduct #fatherCode').val() == "" || 
				$('#editProduct #code').val().indexOf($('#editProduct #fatherCode').val()) ||
				$('#editProduct #code').val() == $('#editProduct #fatherCode').val()) {
			alertInfo("必须以上级编码开头，且不能跟上级编码相同！");
			return false;
		}
		if ($('#editProduct').valid()) {
			jQuery.ajax({
				url : '../product/edit.json',
				data : $('#editProduct').serializeObject(),
				type : 'post',
				success : function(data) {
					alertInfo(data.msg);
					$('.revised').hide();
					loadProducts(null, $('#menuTrainingCode').val());
				}
			});
		}
	});
	
	// 商品编码选择--（关闭）
	$(".choi_close").click(function() {
		$(".choice").hide();
	});
	
	// 商品编码修改--(关闭)
	$(".revised_close").click(function() {
		$(".revised").hide();
		$('.addeditshow_tree').hide();
	});
	
	//商品编码-增加/修改-商品税号选择（弹出商品税号表）
	$(".shangpin_choice").click(function() {
		$(".choice").show();
	});
	//商品编码-增加/修改-税收分类税号选择（弹出商品税号表）
	$(".proclass_choice").click(function() {
		$(".proclass").show();
	});
	
	// 税收分类选择--（关闭）
	$(".proclass_close").click(function() {
		$(".proclass").hide();
	});

	//加载商品编码税目表
	loadProductTaxes(function(){
		$("#productTaxList").find("tr:not(:first)").dblclick(function(){
			var form=$(".commodity").find(".adding,.revised").find(":visible");
			form.find("input#productTaxId").val($(this).find("#id").val());
			form.find("input#productTaxName").val($(this).find("#name").html());
			form.find("select#taxRate").val($(this).find("#taxRate").html());
			$(".commodity .choice").hide();
		});
	});
	
	$(".st_tree ul li a").on('click', function(){
		$(".st_tree ul li a").removeClass('st_tree_choose').css({"color":"#000"});
		$(this).addClass('st_tree_choose');
		$(this).css({"color":"#fff"});
	});
	

});
