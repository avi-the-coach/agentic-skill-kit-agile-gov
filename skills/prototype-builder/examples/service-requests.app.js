/* Fictitious example adapter; stable anchors are part of the review contract. */
window.PrototypeApp = {
  id:'citizen-service-demo',version:'1.0.0',title:'קשר · שירות לתושב',
  views:[{id:'citizen',label:'אזרח / הגשת פנייה'},{id:'clerk',label:'עובד / טיפול בפניות'}],
  initial:()=>({draft:{subject:'',details:''},filter:'all',records:[
    {id:'demo-101',subject:'תאורת רחוב אינה פועלת',details:'התאורה ליד הגינה הציבורית אינה פועלת. נתוני דוגמה בלבד.',status:'new'},
    {id:'demo-102',subject:'בירור מועד פינוי גזם',details:'בקשה למידע על מועד הפינוי בשכונה לדוגמה.',status:'working'}]}),
  validate:d=>{
    if(!d || typeof d!=='object' || !d.draft || typeof d.draft.subject!=='string' || d.draft.subject.length>120 || typeof d.draft.details!=='string' || d.draft.details.length>2000 || !['all','new','working','done'].includes(d.filter) || !Array.isArray(d.records) || d.records.length>1000)return false;
    const ids=new Set();return d.records.every(r=>{if(!r || typeof r.id!=='string' || !/^[a-zA-Z0-9-]{1,100}$/.test(r.id) || ids.has(r.id) || typeof r.subject!=='string' || !r.subject.trim() || r.subject.length>120 || typeof r.details!=='string' || r.details.length>2000 || !['new','working','done'].includes(r.status))return false;ids.add(r.id);return true;});
  },
  render(root,ctx){
    const {el,button,data,view,spec,update,persist,toast,uid}=ctx;
    const anchor=(n,id,label)=>{n.dataset.anchor=id;n.dataset.label=label;return n;};
    const hero=el('section',undefined,'hero');const intro=el('div');intro.append(el('span','שירות קרוב. תהליך ברור.','eyebrow'),el('h2',view==='citizen'?'במה נוכל לעזור היום?':'כל פנייה מקבלת מענה.'),el('p',view==='citizen'?'פותחים פנייה, עוקבים אחרי ההתקדמות ורואים מה השתנה — במקום אחד.':'תמונת מצב מרוכזת של הפניות, מהקבלה ועד להשלמת הטיפול.'));
    const metric=el('div',undefined,'metric');metric.append(el('strong',String(data.records.filter(r=>r.status!=='done').length)),el('span','פניות פתוחות'));hero.append(intro,metric);root.append(hero);
    const grid=el('div',undefined,'grid');root.append(grid);
    const side=anchor(el('section',undefined,'card'),'request-form','פתיחת פנייה');grid.append(side);
    if(view==='citizen'){
      const heading=el('h3','פנייה חדשה');spec(heading,'assumption','שדות ופרטיות','הנחת הדגמה: אין הזדהות או פרטים אישיים. במוצר אמיתי נדרש להגדיר הזדהות והרשאות; החלפת התצוגה כאן מדומה.');side.append(heading);
      const form=el('form');form.className='stack';
      const subjectLabel=el('label','נושא הפנייה');const subject=anchor(el('input'),'subject-input','נושא הפנייה');subject.name='subject';subject.required=true;subject.maxLength=120;subject.placeholder='למשל: תאורה בגינה הציבורית';subject.value=data.draft.subject;subjectLabel.append(subject);spec(subjectLabel,'assumption','אימות נושא','הנחה: נושא חובה, עד 120 תווים. רווחים בלבד אינם נושא תקין. הטיוטה נשמרת בכל שינוי.');
      const detailsLabel=el('label','איך נוכל לעזור?');const details=anchor(el('textarea'),'details-input','תיאור הפנייה');details.name='details';details.maxLength=2000;details.placeholder='תיאור קצר יסייע לנו לטפל בפנייה';details.value=data.draft.details;detailsLabel.append(details);
      subject.oninput=()=>{subject.setCustomValidity('');persist(d=>d.draft.subject=subject.value);};details.oninput=()=>persist(d=>d.draft.details=details.value);
      const send=anchor(el('button','שליחת פנייה','primary'),'submit-request','שליחת פנייה');send.type='submit';
      form.append(subjectLabel,detailsLabel,send);side.append(form);spec(side,'requirement','שליחה מדומה','דרישת דוגמת הבדיקה: שליחה יוצרת רשומה מקומית במצב חדש ומנקה את הטיוטה. אין שליחת דוא״ל, הודעה או קריאה לשירות חיצוני.');
      form.onsubmit=e=>{e.preventDefault();if(!subject.value.trim()){subject.setCustomValidity('נא להזין נושא');subject.reportValidity();return;}if(data.records.length>=1000){toast('ההדגמה מוגבלת ל־1000 פניות.');return;}update(d=>{d.records.unshift({id:uid(),subject:subject.value.trim(),details:details.value.trim(),status:'new'});d.draft={subject:'',details:''};});toast('הפנייה נוצרה בהצלחה בהדגמה');};
    }else{
      side.append(el('h3','סביבת הטיפול'),el('p','בחרו פנייה ברשימה והתקדמו משלב הקבלה לטיפול ולסיום. השינוי יוצג גם בתצוגת האזרח.'));
      const label=el('label','סינון לפי מצב');const filter=anchor(el('select'),'status-filter','סינון פניות');[['all','כל הפניות'],['new','חדשות'],['working','בטיפול'],['done','הושלמו']].forEach(([value,text])=>{const o=el('option',text);o.value=value;filter.append(o);});filter.value=data.filter;filter.onchange=()=>update(d=>d.filter=filter.value);label.append(filter);side.append(label);spec(side,'question','זמני שירות והסלמה','שאלה פתוחה: מהו זמן הטיפול הרצוי, ומתי מעבירים פנייה לממונה? לא נקבע SLA ולא מופעלות הסלמות בדוגמה.');
    }
    const list=anchor(el('section',undefined,'card stack'),'requests-list','רשימת הפניות');grid.append(list);const heading=el('h3',view==='citizen'?'הפניות שלי':'תור הפניות');list.append(heading);spec(heading,'assumption','היקף הרשומות','כל הרשומות שייכות לאותו אזרח פיקטיבי. במערכת אמיתית נדרש סינון לפי הרשאות.');
    const statuses={new:'חדשה',working:'בטיפול',done:'הושלמה'};
    const records=data.records.filter(r=>view==='citizen' || data.filter==='all' || r.status===data.filter);
    if(!records.length)list.append(el('p','אין פניות בתצוגה זו. נסו לשנות את הסינון או ליצור פנייה.','empty'));
    records.forEach(r=>{
      const card=anchor(el('article',undefined,'request'),`request-${r.id}`,r.subject);const top=el('div',undefined,'row');top.append(el('strong',r.subject),el('span',statuses[r.status],`badge ${r.status==='done'?'good':r.status==='working'?'active':''}`));card.append(top,el('p',r.details || 'ללא פרטים נוספים'),el('small',`מזהה: ${r.id}`));
      if(view==='clerk' && r.status!=='done'){
        const action=anchor(button(r.status==='new'?'התחלת טיפול':'סיום טיפול',()=>update(d=>{d.records.find(item=>item.id===r.id).status=r.status==='new'?'working':'done';})),`advance-${r.id}`,`קידום הפנייה: ${r.subject}`);card.append(action);
        spec(card,'assumption','מעבר בין מצבים','הנחה: חדשה ← בטיפול ← הושלמה. אין חזרה לאחור או מחיקה בדוגמה. השלמה מוצגת גם לאזרח; חיבור למערכת תפעולית הוא עתידי ומדומה בלבד.');
      }
      list.append(card);
    });
  }
};
