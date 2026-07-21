// allows grouping test cases
describe("Numerical Check", () => {
    
    // ex. 1 : 1 is 1
    test("1 is 1", () => {
        expect(1).toBe(1);
    });

    // ex. 2 : expect number for typeof NaN
    test("NaN is Number", () => {
        expect(typeof NaN).toBe("number")
    });
});

describe("Authentication", () => {

    // Lifecyle
    afterAll(() => console.log("Test cases are executed") );
    beforeAll(() => console.log("Test cases will be executed"));

    test("User is authenticated", () => {
        // return randomly 0 or 1 - might lead pass or fail
        let authenticated: Boolean = Boolean( Math.round(Math.random()) );

        // Expcting authenticated variable to be true for auth access
        expect(authenticated).toBe(true);
    });

    test('multiple test cases', () => {
    
        let role: string = "admin";
        expect(role).not.toBe(null);
        expect(role).not.toBe("user");
        expect(role).toBe("admin");

    });

});