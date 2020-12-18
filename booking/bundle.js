(()=>{"use strict";window.util={isEnterEvent:(e,t)=>{"Enter"===e.key&&t()},isEscEvent:(e,t)=>{"Escape"===e.key&&t()},sliceArr:(e,t)=>e.length>t?e.slice(0,t):e},function(){let e=document.querySelector("main"),t=document.querySelector("#address"),n=document.querySelector("#type"),o=document.querySelector("#price"),i=document.querySelector("#room_number"),d=document.querySelector("#capacity");window.addForm=document.querySelector(".ad-form"),window.formResetButton=document.querySelector(".ad-form__reset");let r=document.querySelector("#timein"),a=document.querySelector("#timeout");window.returnDefaultPage=()=>{window.map.disableMap(),window.form.disableForm(window.fieldsets),window.form.disableForm(window.selects),window.pins.removePins(),window.addForm.reset(),window.mainPinResetPosition(),window.mainPin.addEventListener("mousedown",window.activatePage)};let l=()=>{let t=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);e.appendChild(t);let n=document.querySelector(".error__button"),o=document.querySelector(".error"),i=()=>{e.removeChild(o)};n.addEventListener("click",(()=>{i()})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&i()})),document.addEventListener("click",(()=>{i()}))},w=()=>{window.returnDefaultPage();let t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0);e.appendChild(t);let n=e.querySelector(".success"),o=()=>{e.contains(n)&&e.removeChild(n)};document.addEventListener("click",(()=>{o()})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&o()}))};window.addForm.addEventListener("submit",(e=>{e.preventDefault(),window.upload(new FormData(window.addForm),w,l)})),window.addForm.addEventListener("change",(()=>{var e,t;"flat"===n.value?(o.min=1e3,o.placeholder=1e3):"bungalow"===n.value?(o.min=0,o.placeholder=0):"house"===n.value?(o.min=5e3,o.placeholder=5e3):"palace"===n.value&&(o.min=1e4,o.placeholder=1e4),t=a,"12:00"===(e=r).value?t.value="12:00":"13:00"===e.value?t.value="13:00":"14:00"===e.value&&(t.value="14:00")})),window.form={validateGuestForm:()=>{1===Number(i.value)&&1!==Number(d.value)?i.setCustomValidity("1 комната только для одного гостя"):2===Number(i.value)&&Number(d.value)>2?i.setCustomValidity("2 комната только для одного или 2 гостей"):2===Number(i.value)&&0===Number(d.value)?i.setCustomValidity("2 комнаты только для одного или двух гостей"):3===Number(i.value)&&Number(d.value)<1?i.setCustomValidity("3 комнаты только для одного , двух или трех гостей"):100===Number(i.value)&&0!==Number(d.value)?i.setCustomValidity("100 комнат не для гостей"):i.setCustomValidity("")},fillAddressFieldDisabled:()=>{t.value=Math.round(window.mainPin.offsetTop+window.mainPin.offsetHeight/2)+","+Math.round(window.mainPin.offsetLeft+window.mainPin.offsetWidth/2)},disableForm:e=>{for(let t=0;t<=e.length-1;t++)e[t].disabled=!0},activateForm:e=>{for(let t=0;t<=e.length-1;t++)e[t].disabled=!1},fillAddressFieldActive:()=>{let e=Math.round(window.mainPin.offsetTop+window.mainPinStartY),n=Math.round(window.mainPin.offsetLeft+window.mainPinStartX);t.value=e+","+n}}}(),window.upload=(e,t,n)=>{let o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{200===o.status?t():n()})),o.addEventListener("error",(()=>{n()})),o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)},window.load=(e,t)=>{let n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status?e(n.response):t("Статус ответа: "+n.status+" "+n.statusText)})),n.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+n.timeout+" мс")})),n.timeout=1e4,n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},function(){window.mainPin=document.querySelector(".map__pin--main"),window.serverData=[];let e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins");window.mainPinStartY=Math.round(window.mainPin.offsetHeight+22),window.mainPinStartX=Math.round(window.mainPin.offsetWidth/2),window.mainPinResetPosition=()=>{window.mainPin.style.left="570px",window.mainPin.style.top="375px"},window.pins={removePins:()=>{let e=document.querySelectorAll(".map__pin");for(let n=e.length-1;n>=1;n--)t.removeChild(e[n])}},window.drawPins=n=>{let o=(e=>e.length>5?e.slice(0,5):e)(n);for(let n=0;n<o.length;n++){let i=e.cloneNode(!0);i.querySelector("img").src=o[n].author.avatar,i.querySelector("img").alt=o[n].author.title,i.style.left=o[n].location.x+"px",i.style.top=o[n].location.y+"px",t.appendChild(i)}},window.successHandler=e=>{window.serverData=e,window.drawPins(e),window.filtredData=window.serverData,window.filtredPins=window.filtredData},window.errorHandler=e=>{let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},t.addEventListener("click",(e=>{let t=document.querySelectorAll(".map__pin"),n=document.querySelectorAll(".map__pin img");for(let o=1;o<=t.length;o++)t[o]!==e.target&&n[o]!==e.target||window.drawCard(window.filtredPins[o-1])}))}(),function(){let e=document.querySelector(".map__filters"),t=document.querySelector("#housing-type"),n=document.querySelector("#housing-price"),o=document.querySelector("#housing-rooms"),i=document.querySelector("#housing-guests"),d=document.querySelectorAll("#housing-features input"),r=()=>{let e=document.querySelector(".popup");window.mainMap.contains(e)&&window.pinCards.closePinCard(),window.pins.removePins(),window.filtredPins=window.serverData,(e=>{if("any"!==t.value){let n=e.filter((e=>e.offer.type===t.value));window.filtredPins=n}})(window.filtredPins),(e=>{if("any"!==n.value){let t=e.filter((e=>{let t;return e.offer.price<1e4?t="low":e.offer.price>1e4&&e.offer.price<5e4?t="middle":e.offer.price>=5e4&&(t="high"),t===n.value}));window.filtredPins=t}})(window.filtredPins),(e=>{if("any"!==o.value){let t=e.filter((e=>e.offer.rooms+""===o.value));window.filtredPins=t}})(window.filtredPins),(e=>{if("any"!==i.value){let t=e.filter((e=>e.offer.guests+""===i.value));window.filtredPins=t}})(window.filtredPins),(()=>{for(let e=0;e<d.length;e++)if(d[e].checked){let t=window.filtredPins.filter((t=>t.offer.features[e]===d[e].value));window.filtredPins=t}})(window.filtredPins),window.drawPins(window.filtredPins)};e.addEventListener("change",(()=>{window.debounce(r)}))}(),function(){let e;window.debounce=t=>{e&&window.clearTimeout(e),e=setTimeout(t,300)}}(),function(){let e=document.querySelector(".map__filters-container");window.mainMap=document.querySelector(".map");let t=document.querySelector("#card").content.querySelector(".map__card");window.drawCard=o=>{let i=document.createDocumentFragment();i.appendChild((e=>{let n=t.cloneNode(!0);return n.querySelector(".popup__title").textContent=e.offer.title,n.querySelector(".popup__text--address").textContent=e.offer.address,n.querySelector(".popup__text--price").textContent=e.offer.price+" / ночь",n.querySelector(".popup__type").textContent=e.offer.type,n.querySelector(".popup__text--capacity").textContent=e.offer.rooms+" комнат для "+e.offer.guests+" гостей",n.querySelector(".popup__text--time").textContent="Заезд после "+e.offer.checkin+", выезд до "+e.offer.checkout,(()=>{n.querySelector(".popup__features").innerHTML="";for(let t=0;t<=e.offer.features.length-1;t++){let o=document.createElement("li");o.classList.add("popup__feature"),o.classList.add("popup__feature--"+e.offer.features[t]),n.querySelector(".popup__features").appendChild(o)}})(),n.querySelector(".popup__description").textContent=e.offer.description,(()=>{n.querySelector(".popup__photo").src=e.offer.photos[0];for(let t=1;t<e.offer.photos.length;t++){let o=n.querySelector(".popup__photo").cloneNode(!0);o.src=e.offer.photos[t],n.querySelector(".popup__photos").appendChild(o)}})(),n.querySelector(".popup__avatar").src=e.author.avatar,n})(o)),window.pinCard=document.querySelector(".popup"),window.mainMap.contains(window.pinCard)?(window.mainMap.removeChild(window.pinCard),window.mainMap.insertBefore(i,e)):window.mainMap.insertBefore(i,e),document.querySelector(".popup__close").addEventListener("click",(()=>{n()})),window.addEventListener("keydown",(e=>{"Escape"===e.key&&n()}))};let n=()=>{let e=document.querySelector(".popup");window.mainMap.contains(e)&&(window.mainMap.removeChild(e),document.removeEventListener("keydown",o))},o=e=>{"Escape"===e.key&&n()};window.pinCards={closePinCard:n}}(),function(){window.mainMap=document.querySelector(".map"),window.mainPin=document.querySelector(".map__pin--main");let e=document.querySelector(".ad-form"),t=e=>{window.util.isEnterEvent(e,window.map.activateMap)};window.map={activateMap:()=>{window.mainMap.classList.remove("map--faded"),e.classList.remove("ad-form--disabled"),window.mainPin.removeEventListener("keydown",t)},disableMap:()=>{window.mainMap.classList.add("map--faded"),e.classList.add("ad-form--disabled")}}}(),(()=>{let e=document.querySelector(".ad-form");window.fieldsets=document.querySelectorAll("fieldset"),window.selects=document.querySelectorAll("select"),window.form.fillAddressFieldDisabled(),window.form.disableForm(window.fieldsets),window.form.disableForm(window.selects),e.addEventListener("input",(()=>{window.form.validateGuestForm()})),window.activatePage=e=>{1===e.which&&(window.map.activateMap(),window.form.activateForm(window.fieldsets),window.form.activateForm(window.selects),window.form.fillAddressFieldActive(),window.load(window.successHandler,window.errorHandler),window.formResetButton.addEventListener("click",(()=>{window.pinCards.closePinCard(),window.returnDefaultPage(),window.mainPin.addEventListener("mousedown",window.activatePage)})),window.mainPin.removeEventListener("mousedown",window.activatePage))},window.mainPin.addEventListener("mousedown",window.activatePage)})(),function(){let e=0-window.mainPinStartX,t=window.mainMap.offsetWidth-window.mainPinStartX;window.mainPin.addEventListener("keydown",(e=>{window.util.isEnterEvent(e,(()=>{window.load(window.successHandler,window.errorHandler),window.map.activateMap()}))})),window.mainPin.addEventListener("mousedown",(n=>{n.preventDefault();var o={x:n.clientX,y:n.clientY},i=n=>{var i=o.x-n.clientX,d=o.y-n.clientY;o={x:n.clientX,y:n.clientY},window.mainPin.style.top=window.mainPin.offsetTop-d+"px",window.mainPin.style.left=window.mainPin.offsetLeft-i+"px",window.mainPin.offsetLeft<e?window.mainPin.style.left=window.mainPin.offsetLeft+i+"px":window.mainPin.offsetLeft>=t&&(window.mainPin.style.left=window.mainMap.offsetWidth-window.mainPin.offsetWidth/2-i+"px"),(window.mainPin.offsetTop<=130||window.mainPin.offsetTop>630)&&(window.mainPin.style.top=window.mainPin.offsetTop+d+"px"),window.form.fillAddressFieldActive()},d=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",d)}))}(),function(){const e=["jpg","jpeg","png","gif"];let t=document.querySelector("#avatar"),n=document.querySelector(".ad-form-header__preview img"),o=document.querySelector("#images"),i=document.querySelector(".ad-form__photo img"),d=(t,n)=>{t.addEventListener("change",(()=>{let o=t.files[0],i=o.name.toLowerCase();if(e.some((e=>i.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{n.src=e.result})),e.readAsDataURL(o)}}))};d(t,n),d(o,i)}()})();