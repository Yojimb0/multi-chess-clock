<template>
	<div id ="app">
		<header class="header">
			<div class="title">Multi Chess Clock</div>
			<button class="help-button" @click="openToast(helpMessage)">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0z"/>
					<path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
				</svg>
			</button>
		</header>
		<router-view @openToast="openToast" @updateDuration="updateDuration" class="view" :duration="duration"></router-view>
		<aside class="toast" v-show="isToastOpen">
			<div class="content" v-html="toastMessage"></div>
			<div class="close" @click="closeToast">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</div>
		</aside>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				helpMessage: `<ul>
					<li>First player creates a room</li>
					<li>Other scan the QR-code to join the game, preferably in seating order</li>
					<li>When all players are connected, hit "start the game" button. A random player will be picked to start</li>
					<li>When a player finishes his turn, hit "Next player" button to start the next player's timer</li>
				</ul>`,
				toastMessage: '',
				toastTimeout: null,
				isToastOpen: false,
				duration: '15s'
			};
		},
		methods: {
			updateDuration(duration) {
				this.duration = duration;
			},
			openToast(message) {
				this.isToastOpen = true;
				this.toastMessage = message;
				this.toastTimeout = setTimeout(this.closeToast, 5000);
			},
			closeToast() {
				clearTimeout(this.toastTimeout);
				this.toastMessage = '';
				this.isToastOpen = false;
			}
		}
	};
</script>

<style>
	/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}
	/*! box-sizing https://css-tricks.com/box-sizing/*/ html {box-sizing: border-box;}*, *:before, *:after {box-sizing: inherit;}

	svg{fill:currentColor;display: block;}
	#app{position: relative;font-family: 'Quicksand', sans-serif;font-size: 16px;}
	.header{display: flex;flex-flow: row nowrap;align-items: center;
		box-shadow: 0 1px 5px #0002;padding: 0 20px;height: 50px;}
	.header .title{flex:1;}
	.header .help-button{background: none;border: none;}

	.view{height: calc(100vh - 50px);overflow: hidden;}

	.toast{position: fixed;bottom:5px;left:5px;right:5px;
		display: flex;flex-flow: row nowrap;background: rgba(0,0,0,.7);border-radius: 3px;padding:10px;}
	.toast .content{flex:1;color:white;opacity: .8;border-right:#FFFA 1px solid;margin-right: 10px;padding-right: 10px;}
	.toast .content ul{margin: 0;padding: 0 0 0 20px;font-size: 14px;}
	.toast .content li{margin-bottom: 5px;}
	.toast .close{color:#FFF;}

	.button-text{padding:8px 16px;border:1px solid;border:#0002 1px solid;border-radius:50px;background: #FFF;font-family: inherit;}
</style>
