/* 
 * feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* 
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* 
     * This is our first test suite - This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* 
         *This is our first test - it tests to make sure that the
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

        /* 
         * This test loops through each feed in the allFeeds object. 
         * It ensures it has a URL defined and that the URL is not empty.
         */
        it('url is defined and not empty', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* 
         * This is a test that loops through each feed in the allFeeds object.
         * It ensures it has a name defined and that the name is not empty.
         */
        it('name is defined and not empty', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* 
     * This is our second test suite - This suite is all about the menu.
     * It checks if it is hidden by default.
     * It also checks if the menu displays when icon is clicked 
     * and hides when the icon is clicked again.
     */
    describe('The menu', function() {
        /* 
         * This is a test that ensures the menu element is hidden by default. 
         */
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* 
          * This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          * This has two tests. 
          */
        it('menu element changes visibility when icon is clicked', function() {
            /* 
             * This test checks if the menu appears when the menu icon is clicked
             */
            $('.menu-icon-link').trigger('click');              
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /* 
             * This test checks if the menu disappears when the menu icon is clicked again
             */
            $('.menu-icon-link').trigger( "click" );              
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* 
     * This is our third test suite - This suite is all about the initial entry.
     * It checks if loadFeed loads at least one entry.
     */
    describe('Initial Entries', function() {
        /* 
         * This a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed contains at least a single .entry within .feed container', function() {
            /* 
             * This test checks if the length of .entry is greater than 0.
             * If it is, then, there is at least one entry. 
             */
            const entry = $('.feed .entry');

            expect(entry.html().length).toBeGreaterThan(0);
        });
    });


    /* 
     * This is our fourth test suite - This suite is all about the loaded feed.
     * It checks if the content changes.
     */
    describe('New Feed Selection', function() {
        /*  
         * This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        
        /*  
         * Variables that will hold the values for comparison
         */
        let entryOne, entryTwo;

        /*  
         * This loads the feeds to compare      
         */
        beforeEach(function(done) {
            /*  
             * The following loads different feeds and grabs the length of the resulting feed
             * The length is stored in variables
             * The done is needed to tell Jasmine that this is Asynchronous
             */
            const entry = $('.feed');

            loadFeed(0, function() {
                entryOne = entry.html();
                
                loadFeed(1, function() {
                    entryTwo = entry.html();
                    done();
                });
            });
        });

        /*  
         * The test to compare the 2 values from the previous calls
         */
        it('when new feed is loaded by loadFeed, content changes', function() {
            expect(entryOne).not.toEqual(entryTwo);
        });
    });
}());
