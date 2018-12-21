jasmine.getEnv().describe("<name or title for the spec suite>", function() {
	jasmine.getEnv().beforeEach(function() {
		//gets executed once before each spec in the describe 
	});
	
	jasmine.getEnv().afterEach(function() {
		//gets executed once after each spec.
	});
	
	jasmine.getEnv().it("<title of the test case/spec>", function() {
		//write you automation code here
	});
				  
});

