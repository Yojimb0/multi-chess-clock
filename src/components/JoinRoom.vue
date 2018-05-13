<template>
	<div class="join">
		<p>Waiting for the game to start</p>
	</div>
</template>

<style scoped>
	.join{padding: 50px 10px 0}
	.join p{text-align: center;color: #9e9e9e;}
</style>

<script>

	import firebase from '../../firebase.config';

	export default {
		name: 'create',
		data() {
			return {
				currentRoomData: firebase.database().ref('rooms').child(this.roomId),
				playerCount: null,
				playerPosition: null
			};
		},
		async mounted() {
			// Update duration
			this.$emit('updateDuration', this.duration);

			// Add the player
			const refPlayer = await this.currentRoomData.child('players').push({ exists: true });

			// Getting playerCount & playerPosition
			this.currentRoomData.child('players').orderByKey().on('value', data => {
				this.playerCount = data.numChildren();
				this.playerPosition = Object.keys(data.val()).indexOf(refPlayer.key) + 1;
				console.log('[Join.vue] Got new player, currently', this.playerPosition, '/', this.playerCount);
			});

			// Listen to game-start
			this.currentRoomData.child('gameStarted').on('value', data => {
				console.log('[Join.vue] gameStarted ?', data.val());
				if(data.val()) {
					console.log('[Join.vue] Got "gameStarted" - Routing to', `/timer/${this.roomId}/${this.playerPosition}`);
					this.$router.push({ path: `/timer/${this.roomId}/${this.playerPosition}` });
				}
			});
		},
		props: {
			roomId: { type: String, required: true },
			duration: { type: String, required: true }
		}
	};
</script>
vue
