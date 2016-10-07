Template.user.helpers({
	user: function(){
		return Meteor.user();
	}
})

Template.user.events({
	'submit #update-form' : function(e, t) {
		e.preventDefault();
		var name = t.find('#name').value,
		surname = t.find('#surname').value,
		email = t.find('#email').value;

		Meteor.call('user.update', Meteor.userId(), name, surname, email, function(err) {
			if(err){
				Materialize.toast(err, 4000, 'pink accent-3');
			}else{
				Materialize.toast('Seu perfil foi alterado com sucesso!', 4000, 'green accent-4');
			}
		});

		return false;
	}
});

Template.user.onRendered(function(){
	$("#update-form").validate({
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
			}
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


Template.change_password.events({
	'submit #change-form' : function(e, t) {
		e.preventDefault();
		var password = t.find('#password').value,
		new_password = t.find('#new_password').value;
		confirm_password = t.find('#confirm_password').value;

		Accounts.changePassword(password, new_password, function(err){
			if (err) {
				Materialize.toast(err, 4000, 'pink accent-3');
			} else {
				Materialize.toast('Senha alterada com sucesso!', 4000, 'green accent-4');
			}
		}); 
		return false;
	}
});

Template.change_password.onRendered(function(){
	$("#change-form").validate({
		rules: {
			password: {
				required: true,
				minlength: 6
			},
			new_password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#new_password"
			},
		},
		messages: {
			password:{
				required: "Campo senha é obrigatório",
			},
			password:{
				required: "Campo nova senha é obrigatório",
				minlength: "Campo nova senha deve contem pelo menos 6 caracteres"
			},
			confirm_password:{
				required: "Campo confirmar senha é obrigatório",
				minlength: "Campo senha deve contem pelo menos 6 caracteres",
				equalTo: "Campo confirmar senha deve ser igual ao campo nova senha"
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

Template.forgot_password.events({
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

Template.forgot_password.onRendered(function(){
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

Template.reset_password.helpers({
	resetPassword: function(){
		return Session.get('resetPassword');
	}
});

Template.reset_password.onRendered(function(){
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

Template.reset_password.events({
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