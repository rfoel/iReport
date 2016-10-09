Template.mainLayout.onCreated(function() {
	Meteor.subscribe('category.user');
	Meteor.subscribe('report.user');

	setTimeout(function(){
		$('.tooltipped').tooltip({ delay: 50 });
		$(".dropdown-button").dropdown({
			belowOrigin: true,
		});
		$(".button-collapse").sideNav({
			closeOnClick: true
		});		
	}, 1500 );
});