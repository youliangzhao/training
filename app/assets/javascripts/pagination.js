var rows=[];
var rows_title=[];
var sortField;

function select(){
	firstLoadPage();
	selectByAjax();
}

function getPageInfo(){
	var pageInfo="pageInfo={\"pageIndex\":"+$("#pageIndex").text();
	pageInfo+=",\"pageSize\":"+$("#pageSize").text();
	pageInfo+=",\"totalRowNum\":"+$("#totalRowNum").text()+"}";
	return pageInfo;
}

function firstLoadPage()
{
	$("#pageIndex").text(1);
	rows=[];
	rows_title=[];
	$("#query_waiting").show();
}

function pushRowData(row){
	var row_title_=[];
	var truncated=$("#dg").attr("truncated");
	if(truncated && truncated=="true"){
		var ths=$("#dg").prev().find("tr > th");
		for(var i=0;i<ths.length;i++){
			var field=$(ths[i]).attr("field");
			var dataWidth=$(ths[i]).attr("dataWidth");
			if(dataWidth && dataWidth!=""){
				if (row[field] != null && typeof(row[field]) != "undefined") {
					value=row[field].toString();
					if(value.length>dataWidth){
						row[field]=value.substr(0,dataWidth)+"...";
						row_title_[field]=value;
					}
				}
			}
		}
	}
	rows.push(row);
	rows_title.push(row_title_);
}



function initPageInfo(totalRowNum) {
	if (totalRowNum == 0) {
		$("#totalPage").text(0);
		$("#pageIndex").text(0);
		$("#startIndex").text(0);
		$("#endIndex").text(0);
		$("#totalRowNum").text(0);
	}else{	
		var totalPage = Math.ceil(totalRowNum / $("#pageSize").val());
		$("#totalPage").text(totalPage);
		$("#totalRowNum").text(totalRowNum);
	}
}
function jumpTo(pageIndex) {
	// only when the jumping page is not current page, and the jumping page index is allowed
	//, and the jumping page index is small than total page index
	var totalPage = $("#totalPage").text();
	$(".chk_all").attr('checked',false);
	if (pageIndex != $("#pageIndex").text() && pageIndex > 0 && totalPage > 0 && pageIndex <= totalPage) {
		var totalRowNum=$("#totalRowNum").text();
		if(rows.length<totalRowNum){
			$("#pageIndex").text(pageIndex);
			rows=[];
			$("#query_waiting").show();
			selectByAjax();//重新查询数据库
		}else{
			calculatePageInfo(pageIndex);
			paintTableByCache();
			iconChange();
			//宝利来结算审核中店铺选择页面的事件绑定
			if (typeof(eval(trOnclick)) == "function") {
				trOnclick();
	        }
		}
	}
}

function calculatePageInfo(pageIndex){
	var pageSize=$("#pageSize").val();
	var startIndex=(pageIndex-1)*pageSize+1;
	var endIndex=pageIndex*pageSize;
	var totalRowNum=$("#totalRowNum").text();
	$("#pageIndex").text(pageIndex);
	if(totalRowNum>0){
	/*	if((totalRowNum < pageSize) || (pageIndex * pageSize)>totalRowNum ){
			$("#pageIndex").text("1");
			startIndex=0;
		}
		*/
		if(endIndex>totalRowNum){
			endIndex=totalRowNum;
		}
		$("#startIndex").text(startIndex);
		$("#endIndex").text(endIndex);
	}
}

function paintTable(mypageinfo){
	var totalRowNum = mypageinfo.totalRowNum;
	var mypageindex = mypageinfo.pageIndex;
	initPageInfo(totalRowNum);
	calculatePageInfo(mypageindex);
	var totalRowNum=$("#totalRowNum").text();
	if(rows.length<=totalRowNum){
		paintTableByDB();
	}else{
		paintTableByCache();
	}
	iconChange();
	$("#query_waiting").hide();
	//清空之前的表里面的数据
	rows=[];
}

function paintTableByDB(){
	var ths=$("#dg").prev().find("tr > th");
	var content="";
	for(var i=0;i<rows.length;i++){
		var row=rows[i];
		var row_title=rows_title[i];
		var tr="<tr>";
		for(var j=0;j<ths.length;j++){
			var field=$(ths[j]).attr("field");
			if(field && field!=""){
				if($(ths[j]).hasClass('hide')){
					tr+="<td style='display: none;'>"+toStr(row[field])+"</td>";
				}else{
					tr+="<td title='" + toStr(row_title[field]) +"'>"+toStr(row[field])+"</td>";
				}
			}
		}
		tr+="</tr>";
		content+=tr;
	}
	$("#dg").empty();
	$("#dg").append(content);
}


function paintTableByCache(){
	var ths=$("#dg").prev().find("tr > th");
	var content="";
	var startIndex=$("#startIndex").text();
	var endIndex=$("#endIndex").text();
	for(var i=0;i<rows.length;i++){
		if(i>=startIndex-1 && i<=endIndex-1){
			var row=rows[i];
			var row_title=rows_title[i];
			var tr="<tr>";
			for(var j=0;j<ths.length;j++){
				var field=$(ths[j]).attr("field");
				if(field && field!=""){
					if($(ths[j]).hasClass('hide')){
						tr+="<td style='display: none;'>"+toStr(row[field])+"</td>";
					}else{
						tr+="<td title='" + toStr(row_title[field]) +"'>"+toStr(row[field])+"</td>";
					}
				}
			}
			tr+="</tr>";
			content+=tr;
		}
	}
	$("#dg").empty();
	$("#dg").append(content);
}


function pageSizeChange(pageSize) {
	var totalRowNum = parseInt($("#totalRowNum").text());
	$("#pageSize").val(pageSize);
	if (rows.length<totalRowNum) {
		select();//重新查询数据库
	}else{
		var totalPage=Math.ceil(totalRowNum/pageSize);
		$("#totalPage").text(totalPage);
		calculatePageInfo(1);
		paintTableByCache();
		iconChange();
	}
}


function iconChange() {
	var pageIndex = parseInt($("#pageIndex").text());
	var totalPage = parseInt($("#totalPage").text());
	if (totalPage <= 1) {
		// if no result or just one page, then disable all icons.
		$("#page_first").css("cursor", "default");
		$("#page_first img").attr("src", contextPath + "/page/image/firstPageDisabled.png");
		$("#page_prev").css("cursor", "default");
		$("#page_prev img").attr("src", contextPath + "/page/image/prevPageDisabled.png");
		$("#page_next").css("cursor", "default");
		$("#page_next img").attr("src", contextPath + "/page/image/nextPageDisabled.png");
		$("#page_last").css("cursor", "default");
		$("#page_last img").attr("src", contextPath + "/page/image/lastPageDisabled.png");
	} else if (pageIndex == 1) {
		// if more than one page, and the current page is the first, then disable the first and prev icon, enable the next and last icon.
		$("#page_first").css("cursor", "default");
		$("#page_first img").attr("src", contextPath + "/page/image/firstPageDisabled.png");
		$("#page_prev").css("cursor", "default");
		$("#page_prev img").attr("src", contextPath + "/page/image/prevPageDisabled.png");
		$("#page_next").css("cursor", "pointer");
		$("#page_next img").attr("src", contextPath + "/page/image/nextPage.png");
		$("#page_last").css("cursor", "pointer");
		$("#page_last img").attr("src", contextPath + "/page/image/lastPage.png");
	} else if (pageIndex < totalPage) {
		// if more than one page, and the current page is in middle, then enable all icons.
		$("#page_first").css("cursor", "pointer");
		$("#page_first img").attr("src", contextPath + "/page/image/firstPage.png");
		$("#page_prev").css("cursor", "pointer");
		$("#page_prev img").attr("src", contextPath + "/page/image/prevPage.png");
		$("#page_next").css("cursor", "pointer");
		$("#page_next img").attr("src", contextPath + "/page/image/nextPage.png");
		$("#page_last").css("cursor", "pointer");
		$("#page_last img").attr("src", contextPath + "/page/image/lastPage.png");
	} else if (pageIndex == totalPage) {
		// if more than one page, and the current page is the last one, then enable the first and prev icon, enable the next and last icon.
		$("#page_first").css("cursor", "pointer");
		$("#page_first img").attr("src", contextPath + "/page/image/firstPage.png");
		$("#page_prev").css("cursor", "pointer");
		$("#page_prev img").attr("src", contextPath + "/page/image/prevPage.png");
		$("#page_next").css("cursor", "default");
		$("#page_next img").attr("src", contextPath + "/page/image/nextPageDisabled.png");
		$("#page_last").css("cursor", "default");
		$("#page_last img").attr("src", contextPath + "/page/image/lastPageDisabled.png");
	}
}
function sort(field, index) {
	var tbody = document.getElementById("dg");
	var tr = tbody.rows;
	var trValue = new Array();
	for (var i = 0;i < tr.length; i++) {
		trValue[i] = tr[i];
	}
	if (sortField == field) {
		trValue.reverse();
	} else {
		trValue.sort(function(tr1, tr2){
			var value1 = tr1.cells[index].innerHTML;
			var value2 = tr2.cells[index].innerHTML;
			if(!isNaN(value1) && !isNaN(value2)){
				value1=parseFloat(value1);
				value2=parseFloat(value2);
				if(value1>value2){
					return 1;
				}else if(value1<value2){
					return -1;
				}else{
					return 0;
				}
			}else{
				return value1.localeCompare(value2);
			}
		});
	}
	var fragment = document.createDocumentFragment();
	var startIndex=$("#startIndex").text() - 1;
	for (var i=0;i<trValue.length;i++) {
		var node_ = trValue[i].cells[0].childNodes[0];
		if (node_.nodeType == 3) {
			node_.nodeValue = (i+1 + startIndex);
		} else if (node_.nodeType == 1) {
			node_ = trValue[i].cells[1].childNodes[0];
			node_.nodeValue = (i+1 + startIndex);
		}
		fragment.appendChild(trValue[i]);
	}
	tbody.appendChild(fragment);
	sortField=field;
}

function bindSortFunction(){
	var tableSortable=$("#dg").attr("sortable");
	if(tableSortable && tableSortable=="true"){
		$("#dg").prev().find("tr > th").each(function(index){
			var thSortable=$(this).attr("sortable");
			if(thSortable  && thSortable=="true"){
				$(this).css("cursor","pointer");
				$(this).bind("click",function(){
					sort($(this).attr("field"),index);
				});
			}
		});
	}
}

$(document).ready(function(){
	bindSortFunction();
});




