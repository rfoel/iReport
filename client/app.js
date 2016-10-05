import { Session } from 'meteor/session'

Template.nav.onRendered(function() {
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$(".dropdown-button").dropdown({
		belowOrigin: true,
	});
});

Template.dropdown_profile.onRendered(function() {
	$(".dropdown-button").dropdown({
		belowOrigin: true,
	});
});

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

Template.category.helpers({
	category:function () {
		return Category.find({deleted:false});
	}
});

Template.category_deleted.helpers({
	category:function () {
		return Category.find({deleted:true});
	}
});

Template.category.events({
	"click #delete":function(event){
		var category_id = this._id;
		Category.update({_id:category_id}, {$set: {deleted:true}});
		return false;
	}
});

Template.category_deleted.events({
	"click #restore":function(event){
		var category_id = this._id;
		Category.update({_id:category_id}, {$set: {deleted:false}});
		return false;
	},
	"click #delete":function(event){
		if (confirm("A categoria " + this.title + " será excluida permanentemente, você tem certeza?") == true) {
			var category_id = this._id;
			Category.remove({_id:category_id});
		}
		return false;
	}
});

Template.login.events({
	'submit #login-form' : function(e, t){
		e.preventDefault();
		var email = t.find('#login_email').value
		, password = t.find('#login_password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				if(err.reason === 'User not found') {
					$('#login_email').addClass('invalid');
					Materialize.toast("O usuário não pode ser encontrado", 4000, 'pink accent-3');
				}
				if(err.reason === 'Incorrect password') {
					$('#login_password').addClass('invalid');
					Materialize.toast("Senha inválida", 4000, 'pink accent-3');
				}
			}
			else {
				Materialize.toast('Logado com sucesso!', 4000, 'green accent-4');
				FlowRouter.go('/');
			}
		});
		return false; 
	},
	'submit #register-form' : function(e, t) {
		e.preventDefault();
		var name = t.find('#name').value,
		surname = t.find('#surname').value,
		email = t.find('#email').value,
		password = t.find('#password').value;

		Accounts.createUser({email: email, password : password, profile: { name: name, surname: surname }}, function(err){
			if (err) {
				Materialize.toast(err, 4000, 'pink accent-3');
			} else {
				Materialize.toast('Registrado com sucesso!', 4000, 'green accent-4');
				FlowRouter.go('/');
			}
		});
		return false;
	},
	'change #login_email': function() {
		if ($('#login_email').hasClass('invalid')) {
			$('#login_email').removeClass('invalid');
		}
	},
	'change #login_password': function() {
		if ($('#login_password').hasClass('invalid')) {
			$('#login_password').removeClass('invalid');
		}
	}
});

Template.login.onRendered(function(){
	$("#login-form").validate({
		rules: {
			login_email: {
				required: true,
				email:true
			},
			login_password: {
				required: true,
				minlength: 6
			}
		},
		messages: {
			login_email: {
				required: "Campo email é obrigatório",
				email: "Email inválido"
			},
			login_password:{
				required: "Campo senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres"
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

	$("#register-form").validate({
		rules: {
			name: {
				required: true
			},
			surname: {
				required: true
			},
			email: {
				required: true,
				email:true
			},
			password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
		},
		messages: {
			name:{
				required: "Campo nome é obrigatório"
			},
			surname:{
				required: "Campo sobrenome é obrigatório"
			},
			email: {
				required: "Campo email é obrigatório",
				email: "Email inválido"
			},
			password:{
				required: "Campo senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres"
			},
			confirm_password:{
				required: "Campo confirmar senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres",
				equalTo: "Campo confirmar senha deve ser igual ao campo senha"
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
});

Template.ForgotPassword.events({
	'submit #forgot-form': function(e, t) {
		e.preventDefault();
		var forgot_form = $(e.currentTarget),
		email = forgot_form.find('#forgot_email').val().toLowerCase();

		if (email) {
			Accounts.forgotPassword({email: email}, function(err) {
				if (err) {
					if(err.reason === 'User not found') {
						$('#forgot_email').addClass('invalid');
						Materialize.toast("O usuário não pode ser encontrado", 4000, 'pink accent-3');
					} else {
						$('#forgot_email').addClass('invalid');
						Materialize.toast("Desculpe, algo deu errado :(", 4000, 'pink accent-3');
					}
				} else {
					Materialize.toast('Email enviado com sucesso, verifique sua caixa de entrada!', 4000, 'green accent-4');
				}
			});
		}
		return false;
	},
	'change #forgot_email': function() {
		if ($('#forgot_email').hasClass('invalid')) {
			$('#forgot_email').removeClass('invalid');
		}
	},
});

Template.ForgotPassword.onRendered(function(){
	$("#forgot-form").validate({
		rules: {
			forgot_email: {
				required: true,
				email:true
			}
		},
		messages: {
			forgot_email: {
				required: "Campo email é obrigatório",
				email: "Email inválido"
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
});

// Template.ResetPassword.onCreated(function(){
// 	if (Accounts._resetPasswordToken) {
// 		Session.set('resetPassword', Accounts._resetPasswordToken);
// 		console.log('setting token', Session.get('resetPassword'));
// 	}
// });

Template.ResetPassword.helpers({
	resetPassword: function(){
		return Session.get('resetPassword');
	}
});

Template.ResetPassword.onRendered(function(){
	$("#reset-form").validate({
		rules: {
			password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
		},
		messages: {
			password:{
				required: "Campo senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres"
			},
			confirm_password:{
				required: "Campo confirmar senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres",
				equalTo: "Campo confirmar senha deve ser igual ao campo senha"
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
});

Template.ResetPassword.events({
	'submit #reset-form': function(e, t) {
		e.preventDefault();

		var reset_form = $(e.currentTarget),
		password = reset_form.find('#password').val(),
		confirm_password = reset_form.find('#confirm_password').val();

		Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
			if (err) {
				Materialize.toast("Ocorreu um erro :(", 4000, 'pink accent-3');
			} else {
				Materialize.toast('Senha alterada com sucesso!', 4000, 'green accent-4');
				Session.set('resetPassword', null);
				FlowRouter.go('/');
			}
		});

		return false;
	}
});

Template.new_report.onRendered(function() {
	$('select').material_select();
});

Template.new_report.helpers({
	getDate:function () {
		return moment().format('HH:mm DD/MM/YYYY');
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
})

Template.new_category.events({
	'submit #new-category' : function(e, t){
		e.preventDefault();

		var title = t.find('#title').value,
		model = t.find('#model').value;

		Category.insert({
			title:title,
			model:model,
			deleted:false
		});

		FlowRouter.go('/category');

		return false;
	}
});