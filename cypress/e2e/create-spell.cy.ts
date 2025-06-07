describe("Creating a spell", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/");
		cy.get('a[href="/spells"]').click(); // Navigate to the spells page
		cy.get('a[href="/spells/new"]').click(); // Click the button to create a new spell
	});

	it("can create a spell", () => {
		// Fill out the spell creation form
		cy.get('input[name="name"]').type("Fireball");
		cy.get('select[name="level"]').select("3");
		cy.get('[data-testid="toggle-button-traits"]').click().type("Fire");
		cy.get('input[name="castAction"]').check("2");

		cy.get('textarea[name="description"]').type("A powerful fire spell.");

		// Submit the form
		cy.get('button[type="submit"]').click();

		// Verify the spell was created
		cy.url().should("include", "/spells");
		cy.contains("Fireball").should("exist");
	});
});
