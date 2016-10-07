function checkLoggedIn (ctx, redirect) {  
	if (!Meteor.userId()) {
		redirect('/login')
	}
}

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render("mainLayout", {main: "home"});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render("mainLayout", {main: "login"});
	}
});

FlowRouter.route('/user', {
	name: 'user',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "user"});
	}
});

FlowRouter.route('/user/change-password', {
	name: 'change_password',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "change_password"});
	}
});

FlowRouter.route('/category', {
	name: 'category',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "category"});
	}
});

FlowRouter.route('/category/new', {
	name: 'new_category',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "new_category"});
	}
});

FlowRouter.route('/category/edit/:categoryId', {
	name: 'edit_category',
	triggersEnter: [checkLoggedIn],
	action: function(params) {
		BlazeLayout.render("mainLayout", {main: "edit_category"});
	}
});

FlowRouter.route('/category/deleted', {
	name: 'category_deleted',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "category_deleted"});
	}
});

FlowRouter.route('/forgot-password', {
	name: 'ForgotPassword',
	action: function() {
		BlazeLayout.render("mainLayout", {main: "ForgotPassword"});
	}
});

FlowRouter.route('/reset-password/:token', {
	name: 'ResetPassword',
	action: function(params) {
		Session.set('resetPassword', params.token);
		BlazeLayout.render("mainLayout", {main: "ResetPassword"});
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
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "report"});
	}
});

FlowRouter.route('/report/new', {
	name: 'new_report',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "new_report"});
	}
});

FlowRouter.route('/report/edit/:reportId', {
	name: 'edit_report',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "edit_report"});
	}
});

FlowRouter.route('/report/deleted', {
	name: 'report_deleted',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "report_deleted"});
	}
});

FlowRouter.route('/report/:reportId', {
	name: 'view_report',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {main: "view_report"});
	}
});

ActiveRoute.configure({
	activeClass: 'active',
	caseSensitive: false,
	disabledClass: 'disabled',
	regex: 'false'
});