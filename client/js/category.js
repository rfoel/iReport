Template.category_item.onRendered(function() {
	$(document).on('click.card', '.card', function (e) {
		if ($(this).find('> .card-reveal').length) {
			if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
				$(this).find('.card-reveal').velocity(
					{translateY: 0}, {
						duration: 225,
						queue: false,
						easing: 'easeInOutQuad',
						complete: function() { $(this).css({ display: 'none'}); }
					});
				$(this).velocity({height:$(this).data('height')},{duration:225});
			} else if ($(e.target).is($('.card .activator')) ||
				$(e.target).is($('.card .activator i')) ) {
				$(e.target).closest('.card').css('overflow', 'hidden');
				$(this).data('height',$(this).css('height')).find('.card-reveal').css({ display: 'block',height:'auto'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
				$(this).velocity({height:$(this).find('.card-reveal').height()+40},{duration:300});
			}
		}
		$('.card-reveal').closest('.card').css('overflow', 'hidden');
	});
});

Template.category_options.onRendered(function() {
	$('.tooltipped').tooltip({
		delay: 50,
		position: 'bottom'
	});
});

Template.category_options.events({
	'click .tooltipped': function(event){
		$('.tooltipped').tooltip('remove');
	}
});

Template.category_items.helpers({
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	}
});

Template.category.helpers({
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: false }]});
	}
});

Template.category_deleted.helpers({
	category:function () {
		return Category.find({ $and: [{ createdBy: Meteor.userId() }, { deleted: true }]});
	}
});

Template.category.events({
	"click #delete":function(event){
		var category_id = this._id;
		Meteor.call('category.softRemove', category_id, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('A categoria foi enviada para categorias deletadas', 4000, 'green accent-4');
			}
		});
	},
	"click #edit":function(event){
		Session.set('categoryId', this._id);
		var id = Session.get('categoryId');
		FlowRouter.go('/category/edit/'+this._id);
	}
});

Template.category_deleted.events({
	"click #restore":function(event){
		var category_id = this._id;
		Meteor.call('category.restore', category_id, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('A categoria foi restaurada!', 4000, 'green accent-4');
			}
		});
	},
	"click #delete":function(event){
		if (confirm("A categoria " + this.title + " será excluida permanentemente, você tem certeza?") == true) {
			var category_id = this._id;
			Meteor.call('category.remove', category_id, function(err) {
				if(err){
					Materialize.toast(err, 4000, 'pink accent-3');
				}else{
					Materialize.toast('A categoria foi removida.', 4000, 'green accent-4');
				}
			});
		}
	}
});

Template.new_category.events({
	'submit #new-category' : function(e, t){
		e.preventDefault();

		var title = t.find('#title').value,
		model = t.find('#model').value;

		Meteor.call('category.insert', title, model, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('A categoria foi adicionada com sucesso!', 4000, 'green accent-4');
			}
		});

		FlowRouter.go('/category');

		return false;
	}
});

Template.edit_category.events({
	'submit #edit-category' : function(e, t){
		e.preventDefault();

		var id = FlowRouter.getParam('categoryId');
		var title = t.find('#title').value,
		model = t.find('#model').value;

		Meteor.call('category.update', id, title, model, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('A categoria foi alterada com sucesso!', 4000, 'green accent-4');
			}
		});

		return false;
	},
	'focus #model' : function(){
		$('#model').trigger('autoresize');
	}
});

Template.edit_category.helpers({
	category:function () {
		var id = Session.get('categoryId');
		return Category.findOne({_id:id});
	}
});

Template.edit_category.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('categoryId');
		Session.set('categoryId', id);
	});
});