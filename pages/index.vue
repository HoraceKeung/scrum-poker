<template>
	<section class="flex flex-col min-h-screen container overflow-hidden shadow">
		<app-drawer id="drawer" class="z-50" swipe-open>
			<div class="h-screen flex flex-col">
				<div class="my-auto text-center">
					<p class="text-xl font-bold">Scrum Poker</p>
					<div><img class="block w-full" draggable="false" src="~/assets/img/qr-code.png" alt="https://horacekeung.github.io/scrum-poker/"></div>
					<p v-if="canNavigatorShare" class="mx-auto w-24 text-xl cursor-pointer no-highlight bg-black text-white py-2 px-4 rounded" @click="share">Share</p>
				</div>
				<div class="flex justify-between p-2">
					<img class="w-10 h-10" draggable="false" alt="HK" src="~/assets/img/hk.svg">
					<p class="text-sm mt-auto">Version 0.5.0</p>
				</div>
				<button v-show="deferredPrompt" type="button" class="h-12 w-full border-t-2 border-black no-highlight font-bold" @click="a2hs">Add to home screen</button>
			</div>
		</app-drawer>
		<div class="flex-1 flex flex-wrap -mx-2">
			<div v-for="c in currentGroupCards" :key="c" class="w-1/3 px-2 relative flex">
				<div :class="'transition m-auto cursor-pointer no-highlight'+(expanded?(expanded===c?' expanded':' opacity-5'):'')" @click="expanded=expanded===c?null:c">
					<div class="m-auto">
						<img class="h-24 shadow-md block" draggable="false" src="~/assets/img/card.png" :alt="c">
						<div class="relative">
							<div v-if="c==='coffee'" class="absolute h-24 w-full pin-b p-3 flex flex-col justify-between">
								<div class="mx-auto"><img class="h-6 w-6 block" draggable="false" src="~/assets/img/coffee.svg" alt="coffee"></div>
								<div class="mx-auto"><img class="h-3 w-3 block" draggable="false" src="~/assets/img/coffee.svg" alt="coffee"></div>
								<div class="mx-auto rotate"><img class="h-6 w-6 block" draggable="false" src="~/assets/img/coffee.svg" alt="coffee"></div>
							</div>
							<div v-else class="absolute h-24 w-full text-center pin-b p-3 flex flex-col justify-between">
								<p class="text-2xl font-bold" v-html="c"/>
								<p class="text-xs font-light text-grey-darker mt-px" v-html="c"/>
								<p class="text-2xl font-bold rotate" v-html="c"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w-1/3 px-2 flex"><div :class="'m-auto cursor-pointer no-highlight'+(expanded?' opacity-5':'')" @click="openDrawer">
				<img class="h-24 shadow-md block" draggable="false" src="~/assets/img/card-back.png" alt="card">
			</div></div>
		</div>
		<div :class="'flex'+(expanded?' opacity-5':'')">
			<div v-for="g in cardGroups" :key="g.name" class="w-1/3">
				<div v-show="g.name===currentGroupName" class="relative">
					<div class="absolute rainbow w-full h-2px pin-b"></div>
				</div>
				<button type="button" :class="`btn-${g.name===currentGroupName?'':'in'}active`" @click="currentGroupName=g.name">{{g.name}}</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	created () {
		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault()
			// Stash the event so it can be triggered later.
			this.deferredPrompt = e
		})
		this.canNavigatorShare = !!window.navigator.share
		this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
	},
	methods: {
		openDrawer () {
			document.getElementById('drawer').setAttribute('opened', true)
		},
		share () {
			window.navigator.share({
				title: 'Scrum Poker',
				text: 'I am using Scrum Poker, get yours here',
				url: 'https://horacekeung.github.io/scrum-poker/',
			})
		},
		a2hs () {
			// Show the prompt
			this.deferredPrompt.prompt()
			// Wait for the user to respond to the prompt
			this.deferredPrompt.userChoice.then(choiceResult => {
				if (choiceResult.outcome === 'accepted') { this.deferredPrompt = null }
			})
		}
	},
	computed: {
		currentGroupCards () { return this.cardGroups.find(g => g.name === this.currentGroupName).cards.concat(this.others) }
	},
	data: () => ({
		canNavigatorShare: false,
		isStandalone: false,
		currentGroupName: 'Standard',
		cardGroups: [
			{
				name: 'Standard',
				cards: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'coffee']
			},
			{
				name: 'Fibonacci',
				cards: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144']
			},
			{
				name: 'T-Shirts',
				cards: ['0', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL']
			}
		],
		others: ['?', `&infin;`],
		expanded: null,
		deferredPrompt: null
	})
}
</script>
