Template.report.helpers({
	report:function(){
		return Report.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	}
});

Template.report_deleted.helpers({
	report:function () {
		return Report.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: true }]});
	}
});

Template.report_item.onRendered(function() {
	$('.tooltipped').tooltip({
		delay: 50,
		position: 'top'
	});
});

Template.report_options.events({
	'click .tooltipped': function(event){
		$('.tooltipped').tooltip('remove');
	}
});

Template.report_actions.events({
	'click .tooltipped': function(event){
		$('.tooltipped').tooltip('remove');
	}
});

Template.report_actions.events({
	"click #view":function(event){
		FlowRouter.go('/report/'+this._id);
	},
	"click #delete":function(event){
		Meteor.call('report.softRemove', this._id, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('O relatório foi enviado para relatórios deletados', 4000, 'green accent-4');
			}
		});
	},
	"click #edit":function(event){
		FlowRouter.go('/report/edit/'+this._id);
	},
	"click #restore":function(event){
		Meteor.call('report.restore', this._id, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('O relatório foi restaurado!', 4000, 'green accent-4');
			}
		});
	},
});

Template.new_report.onRendered(function() {
	$('select').material_select();
});

Template.new_report.helpers({
	getDate:function () {
		var datetime = moment().format('HH:mm DD/MM/YYYY');
		return datetime;
	},
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	}
});

Template.report_item.helpers({
	getCategory:function (category_id) {
		return Category.findOne(category_id).title;
	}	
})

Template.new_report.events({
	'submit #new-report' : function(e, t){
		e.preventDefault();

		var name = t.find('#name').value,
		description = t.find('#description').value,
		category = t.find('#category').value,
		datetime = t.find('#date').value;

		Meteor.call('report.insert', name, description, category, datetime, new Date(), function(err, result) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				console.log(result);
				Materialize.toast('Relatório criado com sucesso!', 4000, 'green accent-4');
				FlowRouter.go('/report/'+result);

			}
		});

		return false;
	},
	'change #category' : function(){
		var category_id = $('#category').val();
		var model = Category.findOne({_id:category_id}).model;
		$('#description').val(model);
		$('#description').trigger('autoresize');
		$('#description').focusin().focusout();
	}
});

Template.edit_report.onRendered(function() {
	$('select').material_select();
});

Template.edit_report.helpers({
	report:function () {
		var id = Session.get('reportId');
		return Report.findOne({_id:id});
	},
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	},
	equals:function (a, b) {
		return a === b;
	}
});

Template.edit_report.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('reportId');
		Session.set('reportId', id);
	});
});

Template.edit_report.events({
	'submit #edit-report' : function(e, t){
		e.preventDefault();

		var id = FlowRouter.getParam('reportId');
		var name = t.find('#name').value,
		description = t.find('#description').value,
		category = t.find('#category').value;

		Meteor.call('report.update', id, name, description, category, new Date(), function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('Relatório editado com sucesso!', 4000, 'green accent-4');
			}
		});

		return false;
	},
	'focus #description' : function(){
		$('#description').trigger('autoresize');
	}
});

Template.view_report.onRendered(function() {
	$('select').material_select();
});

Template.view_report.helpers({
	report:function () {
		var id = Session.get('reportId');
		return Report.findOne({_id:id});
	},
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	},
	equals:function (a, b) {
		return a === b;
	}
});

Template.view_report.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('reportId');
		Session.set('reportId', id);
	});
});

Template.view_report.events({
	'submit #edit-report' : function(e, t){
		e.preventDefault();

		var id = FlowRouter.getParam('reportId');
		var name = t.find('#name').value,
		description = t.find('#description').value,
		category = t.find('#category').value;

		Meteor.call('report.update', id, name, description, category, new Date(), function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('Relatório editado com sucesso!', 4000, 'green accent-4');
			}
		});

		return false;
	},
	'focus #description' : function(){
		$('#description').trigger('autoresize');
	},
	"click #delete":function(event){
		var id = FlowRouter.getParam('reportId');
		if (confirm("O relatório será excluido permanentemente, você tem certeza?") == true) {
			Meteor.call('report.remove', id, function(err) {
				if(err){
					Materialize.toast(err, 4000, 'pink accent-3');
				}else{
					Materialize.toast('O relatório foi deletado', 4000, 'green accent-4');
				}
			});
		}
	},
	"click #edit":function(event){
		var id = FlowRouter.getParam('reportId');
		FlowRouter.go('/report/edit/'+id);
	},
});