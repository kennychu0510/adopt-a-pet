import { FORM_ERRORS } from '../src/constants';
import supabase from '../src/utils/supabase';
import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { ROOT_URL, resetDB } from '../playwright.config';
import dayjs from 'dayjs';

test.beforeEach(async ({ page }) => {
  await resetDB();
  console.log('reset DB Done');
});

test('post missing form working properly', async ({ page }) => {
  const wishPath = '/post/wish'
  await page.goto(ROOT_URL + wishPath);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', {name: 'Submit'}).click();
  await expect(page.getByText('Please check your form!')).toBeVisible();

  expect(page.getByText(FORM_ERRORS.NAME)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.CONTACT)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.PET_TYPE)).toBeVisible();
  expect(page.getByText(FORM_ERRORS.DESCRIPTION)).toBeVisible();

  await page.fill('#name', 'John');
  expect(page.getByText(FORM_ERRORS.NAME)).not.toBeVisible();

  await page.fill('#contact', 'johnchan@gmail.com');
  expect(page.getByText(FORM_ERRORS.CONTACT)).not.toBeVisible();

  await page.locator('[itemid="animal-type-select"]').click();
  await page.locator('[itemid="animal-type-parrot"]').click();
  expect(page.getByText(FORM_ERRORS.PET_TYPE)).not.toBeVisible();

  await page.fill('#description', 'I like parrots!');
  expect(page.getByText(FORM_ERRORS.DESCRIPTION)).not.toBeVisible();

  await page.getByRole('button', {name: 'Submit'}).click();
  await expect(page.getByText('Form posted successfully!')).toBeVisible();

  await expect(page).toHaveURL(ROOT_URL);
  await page.waitForLoadState('networkidle');

  expect(page.locator('[itemid="wish"]').getByText('Parrot')).toBeVisible();

  await page.locator('[itemid="nav-Wish List"]').click();
  await expect(page).toHaveURL(ROOT_URL + '/wish');
  await page.waitForLoadState('networkidle');

  expect(page.getByText('Pets the community want to adopt', {exact: true})).toBeVisible();
  expect(page.getByText('Parrot')).toBeVisible();

  await page.goto(ROOT_URL + wishPath);
  await page.waitForLoadState('networkidle');

  await page.fill('#name', 'Justin');
  await page.fill('#contact', '99998888');
  await page.locator('[itemid="animal-type-select"]').click();
  await page.locator('[itemid="animal-type-turtle"]').click();
  await page.fill('#description', 'I like turtles!');
  await page.getByRole('button', {name: 'Submit'}).click();
  await expect(page.getByText('Form posted successfully!')).toBeVisible();

  await expect(page).toHaveURL(ROOT_URL);
  await page.waitForLoadState('networkidle');
  expect(page.locator('[itemid="wish"]').getByText('Parrot')).toBeVisible();
  expect(page.locator('[itemid="wish"]').getByText('Turtle')).toBeVisible();

  await page.locator('[itemid="nav-Wish List"]').click();
  await expect(page).toHaveURL(ROOT_URL + '/wish');
  await page.waitForLoadState('networkidle');

  expect(page.getByText('Pets the community want to adopt', {exact: true})).toBeVisible();
  expect(page.getByText('Parrot')).toBeVisible();
  expect(page.getByText('Turtle')).toBeVisible();

  await page.locator('a').filter({has: page.getByText('Parrot')}).click()
  
  await page.waitForLoadState('networkidle');
  expect(page.getByText('John wants to adopt a parrot!')).toBeVisible()
  expect(page.getByText('johnchan@gmail.com')).toBeVisible()
  expect(page.locator('a[href="mailto:johnchan@gmail.com"] > button')).toBeVisible()

});

