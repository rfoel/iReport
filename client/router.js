import { Session } from 'meteor/session'

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "home", footer: "footer"});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "login", footer: "footer"});
	}
});

FlowRouter.route('/user', {
	name: 'user',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "user", footer: "footer"});
	}
});

FlowRouter.route('/category', {
	name: 'category',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "category", footer: "footer"});
	}
});

FlowRouter.route('/category/new', {
	name: 'new_category',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "new_category", footer: "footer"});
	}
});

FlowRouter.route('/category/deleted', {
	name: 'category_deleted',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "category_deleted", footer: "footer"});
	}
});

FlowRouter.route('/ForgotPassword', {
	name: 'ForgotPassword',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "ForgotPassword", footer: "footer"});
	}
});

FlowRouter.route('/reset-password/:token', {
	name: 'ResetPassword',
	action: function(params) {
		Session.set('resetPassword', params.token);
		BlazeLayout.render("mainLayout", {header: "nav", main: "ResetPassword", footer: "footer"});
	}
});

FlowRouter.route('/logout', {
	name: 'logout',
	action() {
		Accounts.logout();
		FlowRouter.go('/');
		Materialize.toast('Até logo!', 4000, 'green accent-4');
	}
});

FlowRouter.route('/report', {
	name: 'report',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "report", footer: "footer"});
	}
});

FlowRouter.route('/report/new', {
	name: 'new_report',
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "new_report", footer: "footer"});
	}
});

ActiveRoute.configure({
	activeClass: 'active',
	caseSensitive: false,
	disabledClass: 'disabled',
	regex: 'false'
});