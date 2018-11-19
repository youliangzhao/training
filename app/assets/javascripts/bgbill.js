var bgBillDlg;
function getBgBill(id, title, href) {
	bgBillDlg = lhgdialog.list['bgBillDlg'];
	if (!bgBillDlg) {
		bgBillDlg = $.dialog.notice({
			id : 'bgBillDlg',
			title : '背景单据',
			width : window.parent.document.body.offsetWidth,
			height : 290,
			content : 'url:../question/bgbill.html',
			init : function() {
				bgBillDlg.content.addTab(id, title, "../../bgbill/" + href);
			}
		});
	} else {
		bgBillDlg.content.addTab(id, title, "../../bgbill/" + href);
	}
}