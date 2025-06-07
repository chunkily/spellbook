// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err) => {
	// Ignore specific React hydration errors for React v18
	// see https://github.com/cypress-io/cypress/issues/27204

	if (
		err.message.includes("Minified React error #418") ||
		err.message.includes("Minified React error #423")
	) {
		// Return false to prevent Cypress from failing the test
		return false;
	}
	// Let other exceptions fail the test
	return true;
});
