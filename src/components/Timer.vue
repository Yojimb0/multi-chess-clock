<template>
	<div class="timer" :class="{'currently-playing': currentlyPlaying}">
		<p class="state-waitingturn" v-if="!currentlyPlaying">Your turn is over<br><br>Waiting for your next turn ...</p>
		<p class="state-yourturn" v-if="currentlyPlaying">It's your turn</p>

		<button class="next-button button-text" @click="nextPlayer" v-show="currentlyPlaying">
			<transition name="scale" @after-enter="afterEnter">
				<span class="next-button_bg" v-show="currentlyPlaying"></span>
			</transition>
			<span class="label">Next player</span>
		</button>

	</div>

</template>

<style scoped>
	.timer{padding-top: 30vh;display: flex;flex-flow: column nowrap}
	.timer.currently-playing{background: #4caf50;}
	.timer p{text-align: center;}
	.timer .state-waitingstart{color: #9e9e9e;}
	.timer .state-waitingturn{color: #9e9e9e;}
	.timer .state-yourturn{color: #fff;}
	.timer .label{position: relative;z-index: 1;}
	.timer .next-button{font-size: 32px;padding: 16px 32px;position: relative;overflow: hidden;display: block;margin: auto auto 10vh;}
	.timer .next-button_bg{content:'';display: block;position: absolute;top:0;bottom: 0;right:0;left:0;z-index: 0;
		transform-origin: center left; transition: all 5s linear;}

	.scale-enter{transform:scaleX(0);background: #4caf50;}
	.scale-enter-active{}
	.scale-enter-to{transform:scaleX(1);background: #f44336;}

</style>

<script>

	import firebase from '../../firebase.config';

	export default {
		name: 'timer',
		data() {
			return {
				currentRoomData: firebase.database().ref('rooms').child(this.roomId),
				playerCount: null,
				currentlyPlaying: false,
				playerPosition: parseInt(this.playerPositionStr, 10)
			};
		},
		async mounted() {
			this.$el.querySelector('.next-button_bg').style.transitionDuration = this.duration;
			// Getting playerCount
			this.currentRoomData.child('players').on('value', data => {
				this.playerCount = data.numChildren();
				console.log('[Timer.vue] players', this.playerCount);
			});

			// Listening to log
			this.currentRoomData.child('log').on('child_added', data => {
				console.log('[Timer.vue] Log added', data.val());
				if(data.val().recipient === this.playerPosition) {
					this.currentlyPlaying = true;
				}else{
					this.currentlyPlaying = false;
				}
			});
		},
		methods: {
			afterEnter() {
				console.log('[Timer.vue] afterEnter() - nextPlayer()');
				this.nextPlayer();
			},
			nextPlayer() {
				console.log('[Timer.vue] nextPlayer() - emitter', this.playerPosition);
				console.log('[Timer.vue] nextPlayer() - recipient', this.getNextPlayerPosition(this.playerPosition));
				this.currentRoomData.child('log').push({
					emitter: this.playerPosition,
					recipient: this.getNextPlayerPosition(this.playerPosition)
				});
			},
			getNextPlayerPosition(currentPosition) {
				console.log('[Timer.vue] getNextPlayerPosition() - currentPosition', this.playerPosition);
				console.log('[Timer.vue] getNextPlayerPosition() - this.playerCount', this.playerCount);
				console.log('[Timer.vue] getNextPlayerPosition() - return', (currentPosition === this.playerCount) ? 1 : currentPosition + 1);
				return (currentPosition === this.playerCount) ? 1 : currentPosition + 1;
			}
		},
		computed: {

		},
		props: {
			currentPlayer: { type: String, default: '' },
			roomId: { type: String, required: true },
			playerPositionStr: { type: String, required: true },
			duration: { type: String, required: true }
		}
	};
</script>
