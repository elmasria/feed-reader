/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

// Detect whether a string is in URL format or not Reference : http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
 function isValidUrl(str) {
 	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
 	return regexp.test(str);
 }


// For checking if a string is blank, null or undefined; Reference: http://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}

$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		 it('are defined', function() {
		 	expect(allFeeds).toBeDefined();
		 	expect(allFeeds.length).not.toBe(0);
		 });


		/* Loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		 it('URL is defined, and valid', function() {
		 	allFeeds.forEach(function(feed) {
		 		expect(feed.url).toBeDefined();
		 		expect(isBlank(feed.url)).not.toBe(true);
		 		expect(isValidUrl(feed.url)).toBe(true);
		 	});
		 });


		/* loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		 it('Name is defined, and valid', function() {
		 	allFeeds.forEach(function(feed) {
		 		expect(feed.name).toBeDefined();
		 		expect(isBlank(feed.name)).not.toBe(true);
			});
		});

	});


	/* Test suite named "The menu" */
	describe('The menu', function() {
		var body = $('body');
		var menuIcon = $('.menu-icon-link');
		/* Ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('menu element is hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		 /* Ensures the menu changes
		  * visibility when the menu icon is clicked. This test
		  * should have two expectations: does the menu display when
		  * clicked and does it hide when clicked again.
		  */
		it('changes visibility when the menu icon is clicked', function() {
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(false);
			menuIcon.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* Test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* Ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('function return at least a single entry', function(done) {
			var entries = $('.feed').find('.entry');
			expect(entries.length >= 1).toBe(true);
			done();
		});
	});

	/* Test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		var before, after;
		beforeEach(function(done) {
			/* Insure the availability of at least two feeds to test */
			expect(allFeeds.length >= 2).toBe(true);
			/* Initiate the first feed (index 0) */
			loadFeed(0, function() {
				/* Set the before to content of feed */
				before = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
				/* Load second feed at index 1 */
				loadFeed(1, function() {
					/* Set the after to content of new feed */
					after = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
					done();
				});
			});
		});

		/* Eensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		 it('changes content', function(done) {
		 	expect(before != after).toBe(true);
		 	done();
		});
	});
}());
