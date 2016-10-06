import { Session } from 'meteor/session'

Template.mainLayout.onCreated(function() {
	Meteor.subscribe('category');
	Meteor.subscribe('report');
});

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

Template.mainLayout.onRendered(function() {
	$('.tooltipped').tooltip({
		delay: 50,
		position: 'top'
	});
});