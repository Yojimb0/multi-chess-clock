import Vue from 'vue';
import Router from 'vue-router';
import Timer from '@/components/Timer';
import CreateRoom from '@/components/CreateRoom';
import JoinRoom from '@/components/JoinRoom';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: '/',
	routes: [
		{ path: '/', component: CreateRoom },
		{ path: '/create', component: CreateRoom },
		{ path: '/join/:roomId/:duration', component: JoinRoom, props: true },
		{ path: '/timer/:roomId/:playerPositionStr', component: Timer, props: true }
	]
});
