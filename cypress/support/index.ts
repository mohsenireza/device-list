export { }

declare global {
    namespace Cypress {
        interface Chainable {
            findByTestId(testId: string): Chainable<JQuery<HTMLElement>>
        }
    }
}
