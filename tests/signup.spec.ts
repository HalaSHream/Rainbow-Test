import "dotenv/config";
import { expect, test } from '@playwright/test';
import { signUpPage } from '../pages/signUpPage';
import { lastOTP } from '../utils/email';
import { verifyPage } from '../pages/verifyPage';


test('Dont have an account? Sign Up button working', async ({ page }) => {

    const signupPage = new signUpPage(page);
    const VerifyPage = new verifyPage(page);

    await signupPage.goto();
    await page.waitForTimeout(3000);

    await signupPage.goToSignUp();
    await page.waitForTimeout(3000);

    const randomSuffix = Math.floor(Math.random() * 1000);
    const email = `shreamhala004+${randomSuffix}@gmail.com`;
    await signupPage.enterNewEmail(email);
    await page.waitForTimeout(3000);

    const otp = await lastOTP(); 
    const password = 'Hala122@000shream004';

    if (otp) {
        await VerifyPage.completeVerify(otp, password);
    } else {
        throw new Error("OTP code not found in email");
    }
});
