/* Generic offline review runtime. All domain rendering belongs to PrototypeApp. */
(() => {
  'use strict';
  const app = window.PrototypeApp;
  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  const uid = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);
  const key = `prototype-builder:${app.id}:database`;
  const schemaVersion = 1;
  let state, saveBlocked = false, annotationMode = false, pendingImport, focusReturn;
  let toastTimer;
  const el = (tag, text, className) => {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = text;
    if (className) n.className = className;
    return n;
  };
  const button = (text, action, cls) => {
    const b = el('button', text, cls); b.type = 'button'; b.addEventListener('click', action); return b;
  };
  const toast = text => { $('toast').textContent = text; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, 5000); };
  const warning = text => { $('storage-status').textContent = text; $('storage-status').className = 'status warning'; };
  const fresh = () => ({ format:'prototype-builder', schemaVersion, prototypeId:app.id, appVersion:app.version, updatedAt:new Date().toISOString(), app:app.initial(), settings:{view:app.views[0].id,spec:false,reviewer:''}, comments:[] });
  const isString = (v, max=10000) => typeof v === 'string' && v.length <= max;
  const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
  function validate(value) {
    if (!isObject(value) || value.format !== 'prototype-builder') throw Error('זה אינו קובץ נתוני פרוטוטייפ.');
    if (value.prototypeId !== app.id) throw Error('הקובץ שייך לפרוטוטייפ אחר.');
    if (value.schemaVersion !== schemaVersion || value.appVersion !== app.version) throw Error('גרסת הנתונים אינה תואמת. השתמשו בגרסת HTML המתאימה; הנתונים הקיימים נשמרו.');
    if (!isObject(value.settings) || !app.views.some(v=>v.id===value.settings.view) || typeof value.settings.spec !== 'boolean' || !isString(value.settings.reviewer,100)) throw Error('הגדרות הקובץ אינן תקינות.');
    if (!isString(value.updatedAt,100) || !Number.isFinite(Date.parse(value.updatedAt))) throw Error('תאריך העדכון אינו תקין.');
    if (!Array.isArray(value.comments) || value.comments.length>1000) throw Error('רשימת ההערות אינה תקינה או גדולה מדי.');
    const ids = new Set();
    for (const c of value.comments) {
      if (!isObject(c) || !isString(c.id,100) || !c.id || ids.has(c.id) || !isString(c.author,100) || !c.author.trim() || !isString(c.text,5000) || !c.text.trim() || !isString(c.view,100) || !isString(c.target,200) || !isString(c.createdAt,100) || !Number.isFinite(Date.parse(c.createdAt)) || !isString(c.updatedAt,100) || !Number.isFinite(Date.parse(c.updatedAt)) || !Number.isFinite(c.x) || !Number.isFinite(c.y) || c.x<0 || c.x>1 || c.y<0 || c.y>1) throw Error('אחת ההערות אינה תקינה.');
      ids.add(c.id);
    }
    if (app.validate(value.app) !== true) throw Error('נתוני היישום אינם תואמים למבנה הנדרש.');
    return clone(value);
  }
  function save() {
    state.updatedAt = new Date().toISOString();
    if (saveBlocked) return false;
    try {
      localStorage.setItem(key, JSON.stringify(state));
      $('storage-status').textContent = 'נשמר מקומית · ייצוא JSON מאפשר גיבוי ושיתוף';
      $('storage-status').className='status';
      return true;
    } catch (_) { warning('השמירה בדפדפן אינה זמינה או שהאחסון מלא. העבודה נשמרת בזיכרון רק כעת — ייצאו JSON לפני סגירה.'); return false; }
  }
  try {
    const raw = localStorage.getItem(key);
    state = raw === null ? fresh() : validate(JSON.parse(raw));
    save();
  } catch (_) {
    state = fresh(); saveBlocked = true;
    warning('לא ניתן לטעון נתונים מקומיים. מוצגת דוגמה זמנית ללא דריסת הנתונים הקודמים. אפשר לייצא, לייבא גיבוי או לאפס במפורש.');
  }
  const body = $('panel-body');
  function openPanel(title) {
    if (!$('panel').open) focusReturn = document.activeElement;
    $('panel-title').textContent=title; body.replaceChildren();
    if (!$('panel').open) $('panel').showModal();
  }
  function closePanel() { $('panel').close(); focusReturn?.focus?.(); }
  $('panel-close').onclick = closePanel;
  $('panel').addEventListener('close',()=>focusReturn?.focus?.());
  function confirmAction(title, description, action) {
    openPanel(title); body.append(el('p',description));
    const row=el('div',undefined,'toolbar'); row.append(button('ביטול',closePanel),button('אישור',()=>{closePanel();action();},'primary'));body.append(row);
  }
  const anchors = () => [...$('app').querySelectorAll('[data-anchor]'),$('app')];
  const targetFor = id => anchors().find(n=>n.dataset.anchor===id);
  function drawMarkers() {
    $('markers').replaceChildren();
    state.comments.filter(c=>c.view===state.settings.view).forEach(c=>{
      const target = targetFor(c.target); if (!target || !target.getClientRects().length) return;
      const r=target.getBoundingClientRect();
      const b=button('●',()=>editComment(c),'marker');
      b.setAttribute('aria-label',`הערה של ${c.author}: ${c.text.slice(0,60)}`);
      b.title=`${c.author}: ${c.text.slice(0,100)}`;
      b.style.left=`${Math.max(0,Math.min(document.documentElement.clientWidth-34,r.left+r.width*c.x-16))+scrollX}px`;
      b.style.top=`${r.top+scrollY+r.height*c.y-16}px`;
      $('markers').append(b);
    });
    $('comment-count').textContent=state.comments.length;
  }
  function render() {
    document.body.classList.toggle('spec-on',state.settings.spec);
    document.body.classList.toggle('annotation-on',annotationMode);
    $('spec-toggle').setAttribute('aria-pressed',String(state.settings.spec));
    $('spec-toggle').textContent=state.settings.spec?'מצב הדגמה':'מצב אפיון';
    $('view').value=state.settings.view;
    $('markers').replaceChildren();
    $('app').replaceChildren();
    app.render($('app'), {
      data:state.app, view:state.settings.view, el, button, uid,
      update: fn=>{fn(state.app);save();render();},
      persist: fn=>{fn(state.app);save();},
      toast,
      spec:(target,kind,title,text)=>{
        const names={requirement:'דרישה',assumption:'הנחה',question:'שאלה פתוחה'};
        const b=button('ⓘ '+names[kind],()=>{
          openPanel(title);body.append(el('span',names[kind],`spec-tag ${kind}`),el('p',text));
        },'spec'); b.setAttribute('aria-label',`אפיון: ${title}`);target.append(b);
      }
    });
    requestAnimationFrame(drawMarkers);
  }
  function editComment(existing, anchor) {
    if (!existing && state.comments.length >= 1000) { toast('ההדגמה מוגבלת ל־1000 הערות. ייצאו גיבוי לפני הסרת הערות.'); return; }
    openPanel(existing?'הערת סוקר':'הוספת הערה');
    const form=el('form');form.className='stack';
    const nameLabel=el('label','שם הסוקר');const name=el('input');name.required=true;name.maxLength=100;name.value=existing?.author || state.settings.reviewer;nameLabel.append(name);
    const textLabel=el('label','שאלה או הערה');const text=el('textarea');text.required=true;text.maxLength=5000;text.value=existing?.text || '';textLabel.append(text);
    form.append(nameLabel,textLabel);
    const hint=el('p',existing?'עריכה ומחיקה משנות את העותק המקומי בלבד. שמות סוקרים הם תוויות, ללא אימות זהות.':'ההערה תוצמד לאזור שבחרתם ותישמר בעותק המקומי.','muted');form.append(hint);
    const actions=el('div',undefined,'toolbar');const submit=el('button','שמירת הערה','primary');submit.type='submit';actions.append(submit,button('ביטול',closePanel));
    if(existing) actions.append(button('מחיקת הערה',()=>confirmAction('מחיקת הערה','למחוק את ההערה מהעותק המקומי?',()=>{state.comments=state.comments.filter(c=>c.id!==existing.id);save();render();}),'danger'));
    form.append(actions);body.append(form);
    form.onsubmit=e=>{e.preventDefault();if(!name.value.trim() || !text.value.trim())return;
      const now=new Date().toISOString();
      const c=existing || {id:uid(),createdAt:now,...anchor};
      Object.assign(c,{author:name.value.trim(),text:text.value.trim(),updatedAt:now});
      state.settings.reviewer=c.author;if(!existing)state.comments.push(c);
      save();closePanel();annotationMode=false;render();toast('ההערה נוספה לעותק המקומי');
    };
    name.focus();
  }
  $('app').addEventListener('click',e=>{
    if(!e.ctrlKey && !annotationMode)return;
    e.preventDefault();e.stopImmediatePropagation();
    const target=e.target.closest('[data-anchor]') || $('app');const r=target.getBoundingClientRect();
    editComment(null,{view:state.settings.view,target:target.dataset.anchor,x:r.width?Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)):.5,y:r.height?Math.max(0,Math.min(1,(e.clientY-r.top)/r.height)):.5});
  },true);
  function reviews() {
    openPanel('סקירה והערות');
    body.append(el('p','Ctrl ולחיצה על אזור במסך מוסיפים הערה. במגע: הפעילו בחירה ולחצו על אזור. במקלדת: בחרו אזור מהרשימה.'));
    body.append(button(annotationMode?'ביטול מצב בחירה':'בחירת אזור להערה',()=>{annotationMode=!annotationMode;closePanel();render();if(annotationMode)toast('בחרו אזור להערה. Esc מבטל.');}));
    const label=el('label','אזור להערה באמצעות מקלדת');const select=el('select');
    anchors().forEach(n=>{const option=el('option',n.dataset.label || n.dataset.anchor);option.value=n.dataset.anchor;select.append(option);});label.append(select);body.append(label,button('הוספת הערה לאזור שנבחר',()=>editComment(null,{view:state.settings.view,target:select.value,x:.95,y:.1})));
    if(!state.comments.length)body.append(el('p','אין עדיין הערות. הוסיפו שאלה או הצעה לשיפור.','empty'));
    state.comments.forEach(c=>{
      const row=el('div',undefined,'comment-row');
      const view=app.views.find(v=>v.id===c.view);
      const found=c.view===state.settings.view && !!targetFor(c.target);
      row.append(el('strong',c.author),el('p',c.text),el('small',`${view?.label || c.view} · ${new Date(c.createdAt).toLocaleString()}${found?'':' · היעד אינו מוצג כעת; ההערה נשמרה'}`));
      row.append(button('פתיחה / עריכה',()=>editComment(c)));
      if(view)row.append(button('מעבר לתצוגה',()=>{state.settings.view=c.view;save();closePanel();render();}));
      body.append(row);
    });
  }
  function snapshot(){ return JSON.stringify(state,null,2); }
  function download(text, filename) {
    const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
    const a=el('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function copy() {
    const text=snapshot();
    try { await navigator.clipboard.writeText(text);toast('הנתונים הועתקו'); }
    catch (_) {
      openPanel('העתקה ידנית');body.append(el('p','הדפדפן לא מאפשר העתקה אוטומטית. סמנו והעתיקו את הטקסט, או השתמשו בייצוא לקובץ.'));
      const area=el('textarea');area.className='code';area.value=text;area.readOnly=true;area.setAttribute('aria-label','נתוני JSON להעתקה');body.append(area);area.focus();area.select();
    }
  }
  function prepareImport(text) {
    try {
      if(text.length>2_000_000)throw Error('הקובץ גדול מדי. המגבלה היא כ־2MB.');
      pendingImport=validate(JSON.parse(text));
      confirmAction('החלפת הנתונים המקומיים',`הקובץ כולל ${pendingImport.comments.length} הערות, בתצוגה ${app.views.find(v=>v.id===pendingImport.settings.view).label}. כל נתוני היישום, ההערות וההגדרות יוחלפו; אין מיזוג. מומלץ לייצא גיבוי לפני האישור.`,()=>{state=pendingImport;pendingImport=null;saveBlocked=false;const saved=save();render();toast(saved?'הנתונים יובאו ונשמרו':'הנתונים יובאו לזיכרון בלבד — ייצאו גיבוי');});
    } catch(error) { toast('הייבוא נכשל: '+(error instanceof SyntaxError?'JSON אינו תקין.':error.message)); }
  }
  function dataPanel() {
    openPanel('נתונים · ייצוא וייבוא');
    body.append(el('p','ה־JSON כולל את נתוני היישום, ההערות וההגדרות. שתפו אותו עם אותו קובץ HTML. זהו מידע מקומי, ללא שרת או סנכרון; אין להזין סודות. פתיחה כקובץ מקומי עשויה להגביל שמירה בחלק מהדפדפנים.'));
    body.append(button('ייצוא JSON לקובץ',()=>download(snapshot(),`${app.id}-review.json`)),button('העתקת JSON',copy));
    const label=el('label','ייבוא מקובץ JSON');const file=el('input');file.type='file';file.accept='.json,application/json';
    file.onchange=async()=>{const f=file.files[0];if(!f)return;if(f.size>2_000_000){toast('הקובץ גדול מדי.');return;}try{prepareImport(await f.text());}catch(_){toast('לא ניתן לקרוא את הקובץ.');}};label.append(file);body.append(label);
    const pasteLabel=el('label','או הדביקו JSON');const paste=el('textarea');paste.className='code';pasteLabel.append(paste);body.append(pasteLabel,button('בדיקת הנתונים לייבוא',()=>prepareImport(paste.value)));
    body.append(button('איפוס נתוני ההדגמה',()=>confirmAction('איפוס ההדגמה','כל השינויים וההערות המקומיים יימחקו ויוחזרו נתוני הדוגמה. הפעולה אינה ניתנת לביטול ללא גיבוי. להמשיך?',()=>{state=fresh();saveBlocked=false;save();render();toast('נתוני ההדגמה אופסו');}),'danger'));
  }
  $('title').textContent=app.title;document.title=app.title;$('version').textContent=app.version;
  for(const v of app.views){const option=el('option',v.label);option.value=v.id;$('view').append(option);}
  $('view').onchange=()=>{state.settings.view=$('view').value;save();render();};
  $('spec-toggle').onclick=()=>{state.settings.spec=!state.settings.spec;save();render();};
  $('review-open').onclick=reviews;$('data-open').onclick=dataPanel;
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && annotationMode){annotationMode=false;render();}});
  window.addEventListener('resize',drawMarkers);window.addEventListener('scroll',drawMarkers,true);
  window.addEventListener('storage',e=>{if(e.key===key){saveBlocked=true;warning('הנתונים השתנו בחלון אחר. שמירה נעצרה כדי למנוע דריסה. ייצאו את עבודתכם ואז רעננו או ייבאו במפורש.');}});
  new ResizeObserver(drawMarkers).observe($('app'));
  render();
})();
