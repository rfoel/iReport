 Template.mainLayout.events({
 	'click .dropdown-button' : function(e) {
 		$(".dropdown-button").dropdown({
 			belowOrigin: true
 		});
 	},
 	'click .button-collapse' : function(e) {
 		$(".button-collapse").sideNav({
 			closeOnClick: true
 		});
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
 					Materialize.toast("O usuário não pode ser encontrado", 4000, 'red');
 				}
 				if(err.reason === 'Incorrect password') {
 					$('#login_password').addClass('invalid');
 					Materialize.toast("Senha inválida", 4000, 'pink accent-3');
 				}
 			}
 			else {
 				Materialize.toast('Logado com sucesso!', 4000, 'green');
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

 		console.log(email);

 		Accounts.createUser({email: email, password : password, profile: { name: name, surname: surname }}, function(err){
 			if (err) {
 				Materialize.toast(err, 4000, 'red');
 			} else {
 				Materialize.toast('Registrado com sucesso!', 4000, 'pink accent-3');
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
 	'change #plogin_assword': function() {
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