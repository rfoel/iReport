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
		var email = t.find('#login-email').value
		, password = t.find('#login-password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				Materialize.toast(err, 4000, 'red');
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
		var name = t.find('#account-name').value,
		surname = t.find('#account-surname').value,
		email = t.find('#account-email').value,
		password = t.find('#account-password').value;

		Accounts.createUser({email: email, password : password, profile: { name: name, surname: surname }}, function(err){
			if (err) {
				Materialize.toast('err', 4000, 'red');
			} else {
				Materialize.toast('Registrado com sucesso!', 4000, 'green');
			}
		});

		return false;
	}
});