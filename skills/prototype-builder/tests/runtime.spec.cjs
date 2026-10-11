/* Optional maintainer test dependency: Playwright + Chromium. No runtime deps. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const url = pathToFileURL(path.resolve(__dirname, '../examples/service-requests.html')).href;
const key = 'prototype-builder:citizen-service-demo:database';
(async()=>{
  const browser=await chromium.launch({headless:true, ...(process.env.PB_CHROMIUM_PATH ? {executablePath:process.env.PB_CHROMIUM_PATH, args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
  const context=await browser.newContext({viewport:{width:1360,height:1000},acceptDownloads:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const db=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
  const data=async()=>{await page.locator('#data-open').click();};
  const close=()=>page.locator('#panel-close').click();
  await page.goto(url);await page.locator('[name=subject]').fill('פנייה לבדיקת שמירה');
  await page.reload();assert.equal(await page.locator('[name=subject]').inputValue(),'פנייה לבדיקת שמירה');
  await page.locator('[name=details]').fill('תיאור פיקטיבי');await page.locator('[data-anchor=submit-request]').click();
  assert.equal((await db()).app.records.length,3);
  await page.locator('#view').selectOption('clerk');await page.locator('[data-anchor^=advance-]').first().click();
  assert.equal((await db()).app.records[0].status,'working');
  // Ctrl-click must open an editor without advancing the underlying workflow.
  await page.locator('[data-anchor^=advance-]').first().click({modifiers:['Control']});
  await page.getByLabel('שם הסוקר',{exact:true}).fill('סוקר לדוגמה');await page.getByLabel('שאלה או הערה',{exact:true}).fill('מה זמן הטיפול?');await page.getByRole('button',{name:'שמירת הערה',exact:true}).click();
  assert.equal((await db()).app.records[0].status,'working');
  await page.reload();await page.locator('.marker').waitFor();assert.equal((await db()).comments.length,1);
  await page.locator('#spec-toggle').click();await page.getByRole('button',{name:'אפיון: זמני שירות והסלמה'}).click();assert.match(await page.locator('#panel-body').innerText(),/שאלה פתוחה/);await close();
  if(process.env.PB_SCREENSHOT_DIR){fs.mkdirSync(process.env.PB_SCREENSHOT_DIR,{recursive:true});await page.screenshot({path:path.join(process.env.PB_SCREENSHOT_DIR,'desktop.png'),fullPage:true});}
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.locator('.marker').click();assert.match(await page.locator('#panel-body').innerText(),/עריכה ומחיקה/);await close();
  if(process.env.PB_SCREENSHOT_DIR)await page.screenshot({path:path.join(process.env.PB_SCREENSHOT_DIR,'mobile.png'),fullPage:true});
  await page.locator('#view').selectOption('citizen');assert.equal(await page.locator('.marker').count(),0);await page.locator('#view').selectOption('clerk');await page.locator('.marker').waitFor();
  await data();const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'ייצוא JSON לקובץ',exact:true}).click();const downloaded=await downloadPromise;const exported=JSON.parse(fs.readFileSync(await downloaded.path(),'utf8'));assert.equal(exported.comments.length,1);await close();
  // Fresh browser context: file import, replacement confirmation, reload, re-export.
  const secondContext=await browser.newContext({acceptDownloads:true});const second=await secondContext.newPage();await second.goto(url);await second.locator('#data-open').click();
  await second.locator('input[type=file]').setInputFiles({name:'review.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await second.getByRole('button',{name:'אישור',exact:true}).click();await second.reload();
  const restored=await second.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);assert.deepEqual(restored.app,exported.app);assert.deepEqual(restored.comments,exported.comments);assert.deepEqual(restored.settings,exported.settings);
  await second.locator('#data-open').click();const reDownload=second.waitForEvent('download');await second.getByRole('button',{name:'ייצוא JSON לקובץ',exact:true}).click();const reExport=JSON.parse(fs.readFileSync(await (await reDownload).path(),'utf8'));assert.deepEqual(reExport.comments,exported.comments);await secondContext.close();
  // Paste validation: malformed, identity, schema, domain, anchors and injection.
  await data();const before=await db();
  for(const text of ['{',JSON.stringify({...exported,prototypeId:'other'}),JSON.stringify({...exported,schemaVersion:9}),JSON.stringify({...exported,app:{}}),JSON.stringify({...exported,comments:[{...exported.comments[0],x:3}]})]){
    await page.getByLabel('או הדביקו JSON',{exact:true}).fill(text);await page.getByRole('button',{name:'בדיקת הנתונים לייבוא',exact:true}).click();assert.match(await page.locator('#toast').innerText(),/נכשל/);assert.deepEqual(await db(),before);
  }
  await page.getByLabel('או הדביקו JSON',{exact:true}).fill(JSON.stringify(exported));await page.getByRole('button',{name:'בדיקת הנתונים לייבוא',exact:true}).click();await page.getByRole('button',{name:'ביטול',exact:true}).click();assert.deepEqual(await db(),before);
  await data();await page.getByRole('button',{name:'איפוס נתוני ההדגמה',exact:true}).click();await page.getByRole('button',{name:'ביטול',exact:true}).click();assert.deepEqual(await db(),before);
  await data();await page.getByRole('button',{name:'איפוס נתוני ההדגמה',exact:true}).click();await page.getByRole('button',{name:'אישור',exact:true}).click();assert.equal((await db()).comments.length,0);assert.equal((await db()).app.records.length,2);
  const malicious=structuredClone(exported);malicious.comments[0].target='removed-target';malicious.comments[0].text='<img src=x onerror="window.injected=true">';
  await data();await page.getByLabel('או הדביקו JSON',{exact:true}).fill(JSON.stringify(malicious));await page.getByRole('button',{name:'בדיקת הנתונים לייבוא',exact:true}).click();await page.getByRole('button',{name:'אישור',exact:true}).click();await page.locator('#review-open').click();assert.match(await page.locator('#panel-body').innerText(),/היעד אינו מוצג/);assert.equal(await page.evaluate(()=>window.injected),undefined);await close();
  // Keyboard target picker and touch-equivalent annotation selection.
  await page.locator('#review-open').click();await page.getByLabel('אזור להערה באמצעות מקלדת').selectOption('status-filter');await page.getByRole('button',{name:'הוספת הערה לאזור שנבחר',exact:true}).click();await page.getByLabel('שאלה או הערה',{exact:true}).fill('הערת מקלדת');await page.getByRole('button',{name:'שמירת הערה',exact:true}).click();
  await page.locator('#review-open').click();await page.getByRole('button',{name:'בחירת אזור להערה',exact:true}).click();await page.locator('[data-anchor=requests-list]').click({position:{x:10,y:10}});await page.getByLabel('שאלה או הערה',{exact:true}).fill('הערת מגע');await page.getByRole('button',{name:'שמירת הערה',exact:true}).click();assert.equal((await db()).comments.length,3);
  // Clipboard fallback.
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('blocked');}}}));await data();await page.getByRole('button',{name:'העתקת JSON',exact:true}).click();assert.equal(JSON.parse(await page.getByLabel('נתוני JSON להעתקה').inputValue()).comments.length,3);await close();
  // Corrupt saved data is preserved, not overwritten by initialization or input.
  await page.evaluate(key=>localStorage.setItem(key,'broken-json'),key);await page.reload();assert.match(await page.locator('#storage-status').innerText(),/ללא דריסת/);await page.locator('[name=subject]').fill('טיוטה זמנית');assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),'broken-json');
  // Storage unavailable: functional in-memory mode plus visible warning.
  const blockedContext=await browser.newContext();await blockedContext.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('blocked');};Storage.prototype.setItem=()=>{throw Error('quota');};});const blocked=await blockedContext.newPage();await blocked.goto(url);await blocked.locator('[name=subject]').fill('ללא אחסון');await blocked.locator('[data-anchor=submit-request]').click();assert.equal(await blocked.locator('.request').count(),3);assert.match(await blocked.locator('#storage-status').innerText(),/לא ניתן/);await blockedContext.close();
  assert.deepEqual(errors,[]);await browser.close();console.log('PASS: workflow, persistence, anchors, spec, responsive layout, JSON round-trip, validation, reset, keyboard/touch selection, injection, blocked storage and clipboard fallback');
})().catch(e=>{console.error(e);process.exit(1);});
