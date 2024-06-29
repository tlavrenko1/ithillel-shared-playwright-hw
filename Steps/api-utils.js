import {
    expect
} from '@playwright/test';
class Utils{
    validateStatusCode (response, statusCode){
        expect(response.status()).toBe(statusCode);
        expect(response.ok()).toBeFalsy();
    }
}
export const utils = new Utils();