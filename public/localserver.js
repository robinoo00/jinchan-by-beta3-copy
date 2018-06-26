// "use strict"
// var toastName = 'toast',loadingName = 'window_loading',maskName = 'window_mask';
// var body = document.getElementsByTagName('body')[0];
// function toast(text,duration) {
//     hideAll();
//     if(typeof duration === 'undefined'){
//         duration = 1000;
//     }
//     var has = document.getElementById(toastName);
//     if(has === null){
//         var wrap = document.createElement('div');
//         wrap.innerHTML = '<div class="window_toast" id='+toastName+'></div>';
//         body.appendChild(wrap);
//     }
//     var item  = document.getElementById(toastName);
//     item.innerText = text;
//     item.style.display = 'block';
//     setTimeout(function () {
//         hideAll()
//     }, duration)
// }
// function loading(text,duration,mask){
//     hideAll();
//     if(typeof duration === 'undefined'){
//         duration = 1000;
//     }
//     if(typeof mask === 'undefined'){
//         mask = true;
//     }
//     var has = document.getElementById(loadingName);
//     if(has === null){
//         var wrap = document.createElement('div');
//         wrap.innerHTML = '<div class="window_toast" id='+loadingName+'>\n' +
//             '    <img src="./loading.png" alt="" class="window_loading">\n' +
//             '    <p>'+text+'</p>\n' +
//             '</div>';
//         body.appendChild(wrap);
//     }
//     if(mask){
//         addMask()
//     }
//     var item  = document.getElementById(loadingName);
//     item.style.display = 'block';
//     if(duration != 0){
//         setTimeout(function () {
//             hideAll()
//         }, duration)
//     }
// }
// function hideAll(){
//     alert('222');
//     if(document.getElementById(toastName) != null)document.getElementById(toastName).style = 'none';
//     if(document.getElementById(loadingName) != null)document.getElementById(loadingName).style = 'none';
//     if(document.getElementById(maskName) != null)document.getElementById(maskName).style = 'none';
// }
// function addMask() {
//     var has = document.getElementById(maskName);
//     if(has === null){
//         var wrap = document.createElement('div');
//         wrap.innerHTML = '<div class="window_mask" id="window_mask"></div>';
//         body.appendChild(wrap);
//     }
//     var maskItem  = document.getElementById(maskName);
//     maskItem.style.display = 'block';
// }
