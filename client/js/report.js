Session.set('reportLimit', 10);
lastScrollTop = 0;
$(window).scroll(function(event){
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
		var scrollTop = $(this).scrollTop();
		if(scrollTop > lastScrollTop) {
			Session.set('reportLimit', Session.get('reportLimit') + 10)
		}
		lastScrollTop = scrollTop;
	}
});

Template.report.helpers({
	report:function(){
		return Report.find({ $and: [{ createdBy: Meteor.userId() }, 
			{ deleted: false }]}, {sort: { createdOn: -1 }, limit: Session.get('reportLimit')});
	}
});

Template.report_deleted.helpers({
	report:function () {
		return Report.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: true }]}, {sort: { createdOn: 1 }});
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

Template.new_report.helpers({
	getDate:function () {
		var datetime = moment().format('HH:mm DD/MM/YYYY');
		return datetime;
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
				Materialize.toast('Relatório criado com sucesso!', 4000, 'green accent-4');
				FlowRouter.go('/report/'+result);
			}
		});

		return false;
	},
	'change #category' : function(){
		if(!($('#description').val())) {
			var category_id = $('#category').val();
			var model = Category.findOne({_id:category_id}).model;
			$('#description').val(model);
			$('#description').trigger('autoresize');
			$('#description').focusin().focusout();
		}
	}
});

Template.new_report.onRendered(function(){
	$("#new-report").validate({
		rules: {
			name: {
				required: true
			},
			description: {
				required: true
			}
		},
		messages: {
			name:{
				required: "Campo nome é obrigatório"
			},
			description:{
				required: "Campo descrição é obrigatório"
			}
		},
		errorElement : 'div',
		errorPlacement: function(error, element) {
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(error)
			} else {
				error.insertAfter(element);
			}
		}
	});
	$('select').material_select();
});

Template.edit_report.onRendered(function() {
	$("#edit-report").validate({
		rules: {
			name: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			name:{
				required: "Campo nome é obrigatório",
			},
			description:{
				required: "Campo descrição é obrigatório",
			}
		},
		errorElement : 'div',
		errorPlacement: function(error, element) {
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(error)
			} else {
				error.insertAfter(element);
			}
		}
	});
	$('select').material_select();
});

Template.edit_report.helpers({
	report:function () {
		var id = Session.get('reportId');
		return Report.findOne({_id:id});
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
	},
	'change #category' : function(){
		if(!($('#description').val())) {
			var category_id = $('#category').val();
			var model = Category.findOne({_id:category_id}).model;
			$('#description').val(model);
			$('#description').trigger('autoresize');
			$('#description').focusin().focusout();
		}
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
					FlowRouter.go('/report');
				}
			});
		}
		return false;
	},
	"click #edit":function(event){
		var id = FlowRouter.getParam('reportId');
		FlowRouter.go('/report/edit/'+id);
	},
	"click #back":function(event){
		FlowRouter.go('/report');
	},
	"click #withDate":function(e, t){
		e.preventDefault();
		var date = t.find('#date').value,
		description = t.find('#description').value;

		var clipboard = new Clipboard('#withDate', {
			text: function() {
				return date + ' - ' + description;
			}
		});

		clipboard.on('success', function(e) {
			Materialize.toast('Copiado com sucesso!', 4000, 'green accent-4');
			e.clearSelection();
		});

		clipboard.on('error', function(e) {
			Materialize.toast('Ocorreu um erro :(', 4000, 'pink accent-3');
		});
	},
	"click #withDateAndUser":function(e, t){
		e.preventDefault();
		var date = t.find('#date').value,
		description = t.find('#description').value,
		user = Meteor.user().profile.name + ' ' + Meteor.user().profile.surname;

		var clipboard = new Clipboard('#withDateAndUser', {
			text: function() {
				return date + ' - ' + user + '\n' + description;
			}
		});

		clipboard.on('success', function(e) {
			Materialize.toast('Copiado com sucesso!', 4000, 'green accent-4');
			e.clearSelection();
		});

		clipboard.on('error', function(e) {
			Materialize.toast('Ocorreu um erro :(', 4000, 'pink accent-3');
		});
	}
});