<template>
	<div class="create">
		<label for="duration" class="duration">
			<span>Turn duration {{duration}}s</span>
			<input type="range" min="5" max="100" step="5" v-model="duration">
		</label>
		<button class="create-button button-text" v-if="!qrTimerUrl" @click="createRoom">Create</button>
		<qr-code v-if="qrTimerUrl" :text="qrTimerUrl" :size=200 class="qrcode"></qr-code>
		<a class="temp-link" :href="qrTimerUrl" v-if="qrTimerUrl">{{qrTimerUrl}}</a>
		<div v-if="qrTimerUrl && playerCount === 1" class="players">You're the only one there ..</div>
		<div v-if="qrTimerUrl && playerCount > 1" class="players">{{ playerCount - 1 }} other player(s) have joined</div>
		<button class="start-button button-text" v-if="qrTimerUrl" @click="startGame">Start the game</button>
	</div>

</template>

<style scoped>
	.create{padding: 50px 10px 0}
	.create .duration{display: block;border: 1px solid #0002;border-radius: 5px;padding: 3px 8px 10px;margin: 0 auto 30px;max-width:300px;}
	.create .duration span{display: block;color: #0009;margin-bottom: 10px;}
	.create .duration input{display: block;width: 100%;border-color:red;}
	.create .create-button{display: block;margin: 0 auto 30px;}
	.create .qrcode{margin: 0 auto 30px;width: 200px;}
	.create .players{text-align: center;margin-bottom: 30px;}
	.create .start-button{display: block;margin: 0 auto 30px;}

	.create .temp-link{display: block;margin: 0 auto 30px;text-align: center;}

	input[type="range"]::-webkit-slider-thumb {
    border: 1px solid silver;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>

<script>

	import VueQRCodeComponent from 'vue-qrcode-component';
	import firebase from '../../firebase.config';


	export default {
		name: 'create',
		data() {
			return {
				qrTimerUrl: null,
				playerCount: 0,
				db: firebase.database().ref('rooms'),
				currentRoomData: null,
				roomId: null,
				duration: 15
			};
		},
		components: {
			'qr-code': VueQRCodeComponent
		},
		methods: {
			randomBetweenInts(a, b) {
				return Math.floor(Math.random() * b) + a;
			},
			async createRoom() {
				// Update duration
				this.$emit('updateDuration', `${this.duration}s`);

				// Create room in Firebase
				const ref = await this.db.push({ gameStarted: false });
				this.roomId = ref.key;
				this.currentRoomData = this.db.child(ref.key);

				await this.currentRoomData.child('players').push({ exists: true });
				console.log('[Create.vue] Pushed first player');

				// Create URLS
				this.qrTimerUrl = `${window.location.origin}/join/${ref.key}/${this.duration}s`;
				console.log('[Create.vue] Created qrTimerUrl', this.qrTimerUrl);

				// Emit toast to parent
				console.log('[Create.vue] Emit toast');
				this.$emit('openToast', 'Room created, get your friends to join by reading the QR-Code');

				// Listening to DB updates
				this.currentRoomData.child('players').orderByKey().on('value', data => {
					console.log('[Create.vue] Received new player', data.numChildren());
					this.playerCount = data.numChildren();
				});
			},
			async startGame() {
				// Set the game as started in DB
				this.currentRoomData.child('gameStarted').set(true);

				// Adding first log (random start)
				console.log('[Create.vue] Adding first log');
				await this.currentRoomData.child('log').push({
					emitter: 0,
					recipient: this.randomBetweenInts(1, this.playerCount)
				});

				// Routing to game
				console.log('[Create.vue] Routing to ', `/timer/${this.roomId}/1`);
				this.$router.push({ path: `/timer/${this.roomId}/1` });
			}
		},
		props: {
			someProp: { type: String, default: '' }
		}
	};
</script>
vue
