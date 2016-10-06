Template.new_report.onRendered(function() {
	$('select').material_select();
});

Template.new_report.helpers({
	getDate:function () {
		var datetime = moment().format('HH:mm DD/MM/YYYY');
		return datetime;
	},
	category:function () {
		return Category.find({deleted:false});
	}
});

Template.new_report.events({
	'change #category' : function(){
		var category_id = $('#category').val();
		var model = Category.findOne({_id:category_id}).model;
		$('#description').val(model);
		$('#description').trigger('autoresize');
		$('#description').focusin().focusout();
	}
});
