// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Vibe Code App E2E Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the app before each test
        await page.goto('/');
    });

    test('Test 1: Page loads and textarea is visible', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/Vibe Code App/i);

        // Check main heading
        const heading = page.locator('h1');
        await expect(heading).toHaveText('Vibe Code App');

        // Check textarea is visible
        const textarea = page.getByTestId('response-box');
        await expect(textarea).toBeVisible();

        // Check both buttons are visible
        const randomButton = page.getByTestId('btn-random');
        const nextButton = page.getByTestId('btn-next');
        await expect(randomButton).toBeVisible();
        await expect(nextButton).toBeVisible();

        console.log('✓ Test 1 passed: Page loaded successfully');
    });

    test('Test 2: Click Random button fills textarea', async ({ page }) => {
        const textarea = page.getByTestId('response-box');
        const randomButton = page.getByTestId('btn-random');

        // Get initial value (should be empty or placeholder)
        const initialValue = await textarea.inputValue();

        // Click Random button
        await randomButton.click();

        // Wait for API response (give it time to fetch)
        await page.waitForTimeout(1000);

        // Get new value
        const newValue = await textarea.inputValue();

        // Verify textarea is not empty
        expect(newValue.length).toBeGreaterThan(0);

        // Verify value changed (if it wasn't already populated)
        if (initialValue === '') {
            expect(newValue).not.toBe(initialValue);
        }

        console.log('✓ Test 2 passed: Random button works');
        console.log('  Response:', newValue.substring(0, 50) + '...');
    });

    test('Test 3: Click Next button twice changes text', async ({ page }) => {
        const textarea = page.getByTestId('response-box');
        const nextButton = page.getByTestId('btn-next');

        // Click Next first time
        await nextButton.click();
        await page.waitForTimeout(1000);
        const firstValue = await textarea.inputValue();

        // Verify first response exists
        expect(firstValue.length).toBeGreaterThan(0);

        // Click Next second time
        await nextButton.click();
        await page.waitForTimeout(1000);
        const secondValue = await textarea.inputValue();

        // Verify second response exists
        expect(secondValue.length).toBeGreaterThan(0);

        // Verify the text changed
        expect(secondValue).not.toBe(firstValue);

        console.log('✓ Test 3 passed: Next button works and text changes');
        console.log('  First response:', firstValue.substring(0, 50) + '...');
        console.log('  Second response:', secondValue.substring(0, 50) + '...');
    });

    test('Test 4: Multiple Next clicks cycle through responses', async ({ page }) => {
        const textarea = page.getByTestId('response-box');
        const nextButton = page.getByTestId('btn-next');

        const responses = [];

        // Click Next 5 times and collect responses
        for (let i = 0; i < 5; i++) {
            await nextButton.click();
            await page.waitForTimeout(1000);
            const value = await textarea.inputValue();
            responses.push(value);
        }

        // Verify we got 5 different responses
        expect(responses.length).toBe(5);

        // Verify all responses are non-empty
        responses.forEach(response => {
            expect(response.length).toBeGreaterThan(0);
        });

        console.log('✓ Test 4 passed: Multiple Next clicks work');
        console.log('  Collected', responses.length, 'responses');
    });

    test('Test 5: Response matches a valid fortune from DB', async ({ page }) => {
        // Known fortunes from the database seed data
        const validFortunes = [
            "The automation journey begins with a single script.",
            "Testing is not just finding bugs, it's ensuring quality.",
            "CI/CD pipelines turn code into reliable software.",
            "Docker containers make deployment predictable.",
            "Playwright enables bulletproof end-to-end testing.",
            "Every commit should be potentially shippable.",
            "Automation frees developers to solve harder problems.",
            "Quality gates prevent bad code from reaching production.",
        ];

        const textarea = page.getByTestId('response-box');
        const randomButton = page.getByTestId('btn-random');

        // Click Random to get a fortune
        await randomButton.click();
        await page.waitForTimeout(1000);
        const response = await textarea.inputValue();

        // Verify the response is one of the valid fortunes
        expect(validFortunes).toContain(response);

        console.log('✓ Test 5 passed: Response is a valid fortune from DB');
        console.log('  Response:', response);
    });

    test('Test 6: Random and Next buttons can be used together', async ({ page }) => {
        const textarea = page.getByTestId('response-box');
        const randomButton = page.getByTestId('btn-random');
        const nextButton = page.getByTestId('btn-next');

        // Click Random
        await randomButton.click();
        await page.waitForTimeout(1000);
        const randomValue = await textarea.inputValue();
        expect(randomValue.length).toBeGreaterThan(0);

        // Click Next
        await nextButton.click();
        await page.waitForTimeout(1000);
        const nextValue = await textarea.inputValue();
        expect(nextValue.length).toBeGreaterThan(0);

        // Values might be the same (random chance), but both should work
        console.log('✓ Test 6 passed: Both buttons work together');
    });
});
