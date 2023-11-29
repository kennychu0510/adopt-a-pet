import { FORM_ERRORS } from '@/constants';
import supabase from '../src/utils/supabase';
import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { ROOT_URL, resetDB } from '../playwright.config';

test.beforeEach(async ({ page }) => {
  await resetDB();
  console.log('reset DB Done');
});

test('post adoption form working properly', async ({ page }) => {
  await page.goto(ROOT_URL + '/post/adoption');
  await page.waitForLoadState('networkidle');
  await page.getByText('Submit').click();
  await expect(page.getByText('Please check your form!')).toBeVisible();

  expect(page.getByText(FORM_ERRORS.NAME)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.CONTACT)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.PET_TYPE)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.PET_NAME)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.DESCRIPTION)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.IMAGE)).toBeVisible();

  await page.locator('input[type=file]').setInputFiles('tests/photos/cat1.jpg');
  expect(page.getByText(FORM_ERRORS.IMAGE)).not.toBeVisible();

  await page.fill('#name', 'John');
  expect(page.getByText(FORM_ERRORS.NAME)).not.toBeVisible();

  await page.fill('#contact', 'johnchan@gmail.com');
  expect(page.getByText(FORM_ERRORS.CONTACT)).not.toBeVisible();

  await page.locator('[itemid="animal-type-select"]').click();
  await page.locator('[itemid="animal-type-cat"]').click();
  expect(page.getByText(FORM_ERRORS.PET_TYPE)).not.toBeVisible();

  await page.fill('#petName', 'Mew');
  expect(page.getByText(FORM_ERRORS.PET_NAME)).not.toBeVisible();

  await page.fill('#description', 'Adopt me!');
  expect(page.getByText(FORM_ERRORS.DESCRIPTION)).not.toBeVisible();

  await page.getByText('Submit').click();
  await expect(page.getByText('Form posted successfully!')).toBeVisible();
  await expect(page).toHaveURL(ROOT_URL);
  await page.waitForLoadState('networkidle');

  expect(page.getByText('Mew')).toBeVisible();

  await page.locator('#hor-sec-link-all').click();
  await expect(page).toHaveURL(ROOT_URL + '/adoptType/all');
  await page.waitForLoadState('networkidle');

  expect(page.getByText('Adopt a pet')).toBeVisible();
  expect(page.getByText('Mew')).toBeVisible();

  await page.goto(ROOT_URL + '/post/adoption');
  await page.waitForLoadState('networkidle');

  await page.locator('input[type=file]').setInputFiles('tests/photos/dog1.jpeg');
  await page.fill('#name', 'David');
  await page.fill('#contact', 'davidchan@gmail.com');
  await page.locator('[itemid="animal-type-select"]').click();
  await page.locator('[itemid="animal-type-dog"]').click();
  await page.fill('#petName', 'Jack');
  await page.fill('#description', "Jacky Chan's best friend!");
  await page.getByText('Submit').click();
  await expect(page.getByText('Form posted successfully!')).toBeVisible();
  await expect(page).toHaveURL(ROOT_URL);
  await page.waitForLoadState('networkidle');

  expect(page.getByText('Mew')).toBeVisible();
  expect(page.getByText('Jack')).toBeVisible();

  await page.locator('#hor-sec-link-all').click();
  await expect(page).toHaveURL(ROOT_URL + '/adoptType/all');
  await page.waitForLoadState('networkidle');
  expect(page.getByText('Adopt a pet')).toBeVisible();
  expect(page.getByText('Mew')).toBeVisible();
  expect(page.getByText('Jack')).toBeVisible();

});

test('click all', async ({ page }) => {
  await page.goto(ROOT_URL);
  await page.locator('#hor-sec-link-all').click();
  await expect(page).toHaveURL(ROOT_URL + '/adoptType/all');
});
