FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "blogHome"});
	}
});

FlowRouter.route('/login', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "login"});
	}
});

FlowRouter.route('/logout', {
	action() {
		Accounts.logout();
		FlowRouter.go('/');
		Materialize.toast('Até logo!', 4000, 'green');
	}
});

FlowRouter.route('/reports', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "reports"});
	}
});