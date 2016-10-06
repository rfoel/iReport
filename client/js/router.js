function checkLoggedIn (ctx, redirect) {  
	if (!Meteor.userId()) {
		redirect('/login')
	}
}

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
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "user", footer: "footer"});
	}
});

FlowRouter.route('/category', {
	name: 'category',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "category", footer: "footer"});
	}
});

FlowRouter.route('/category/new', {
	name: 'new_category',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "new_category", footer: "footer"});
	}
});

FlowRouter.route('/category/edit/:categoryId', {
	name: 'edit_category',
	triggersEnter: [checkLoggedIn],
	action: function(params) {
		BlazeLayout.render("mainLayout", {header: "nav", main: "edit_category", footer: "footer"});
	}
});

FlowRouter.route('/category/deleted', {
	name: 'category_deleted',
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "category_deleted", footer: "footer"});
	}
});

FlowRouter.route('/forgot-password', {
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
	triggersEnter: [checkLoggedIn],
	action: function() {
		BlazeLayout.render("mainLayout", {header: "nav", main: "report", footer: "footer"});
	}
});

FlowRouter.route('/report/new', {
	name: 'new_report',
	triggersEnter: [checkLoggedIn],
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