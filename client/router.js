FlowRouter.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "blogHome"});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "login"});
	}
});

FlowRouter.route('/logout', {
	name: 'logout',
	action() {
		Accounts.logout();
		FlowRouter.go('/');
		Materialize.toast('Até logo!', 4000, 'green');
	}
});

FlowRouter.route('/reports', {
	name: 'reports',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "reports"});
	}
});

FlowRouter.route('/new_report', {
	name: 'new_report',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "new_report"});
	}
});

ActiveRoute.configure({
  activeClass: 'active',
  caseSensitive: false,
  disabledClass: 'disabled',
  regex: 'false'
});