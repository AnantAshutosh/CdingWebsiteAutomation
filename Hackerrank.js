const puppeteer = require('puppeteer');
const codeObj = require('./code')

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'ashutoshislive@gmail.com';
const password = 'Ashu@123';

let page;


let browserOpen = puppeteer.launch({
    headless:false, // for visible the browser
    arg :['--start-maximized'],  //it helps in opening browser full screen
    defaultViewport: null         //for not perticular view port
})

browserOpen.then(function(browserObj){
    let BrowserOpenPromise = browserObj.newPage() //for opening new tab
    return BrowserOpenPromise;  //basically it is a promise so return 
}).then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1",email,{delay:50})
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay : 50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]',{delay : 50})
    return loginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return clickOnAlgoPromise;
}).then(function(){
    let getTOWarmUp =    waitAndClick( "input[value='warmup']"  ,page)
    return getTOWarmUp
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' , {delay:50})
    return allChallengesPromise;

}).then(function(questionArr){
    console.log('no of question ', questionArr.length);
    let questionWillBeSolved = questionSolver(page,questionArr[0],codeObj.answer[0])
    return questionWillBeSolved

})


















function waitAndClick(selector , cPage){
    return new Promise(function(resolve , reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel;
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })

}




function questionSolver(page,question,answer){

    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            let EditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocus
        }).then(function(){
            return waitAndClick('.checkbox-input' ,page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
           return page.type('textarea.custominput',answer,{delay:10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
            
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay :10})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X',{delay :10})
            return XisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            let MainEditor = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return MainEditor
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control')
            return ctrlPressed
            
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay :10})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V',{delay :10})
            return VisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:20})
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })

}