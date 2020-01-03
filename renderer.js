// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const electron = require('electron');

// electron.screen.on('display-metrics-changed', (e, display, metricsChanged) => {
//   console.log(metricsChanged)
// })














// export const forceElement = async (page: Page, selector: string): Promise<ElementHandle> => {
//   await waitFor(
//     () => isElementFound(page, selector),
//     `Element with selector: "${selector}" was not found`
//   );
//   await waitFor(
//     () => isElementVisible(page, selector),
//     `Element with selector: "${selector}" was not visible, but found`
//   );
//   return await page.$(selector);
// };

// const isElementFound = async (page: Page, selector: string): Promise<boolean> => {
//   const element = await page.$(selector);
//   return element !== null;
// };

// const isElementVisible = async (page: Page, selector: string): Promise<boolean> => {
//   const element = await page.$(selector);
//   const style = await page.evaluate((node) => window.getComputedStyle(node as unknown as Element), element);
//   const hasVisible = await hasVisibleBoundingBox(element);
//   return style && style.visibility !== 'hidden' && hasVisible;
// };

// const hasVisibleBoundingBox = async (element: ElementHandle): Promise<boolean> => {
//   const rect = await element.boundingBox();
//   return rect !== null;
// };

// export const click = async (
//   page: Page, selector: string, delay: number = clickDelay
// ): Promise<void> => {
//   const element = await forceElement(page, selector);
//   await element.click({ delay });
// };

