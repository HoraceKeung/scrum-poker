<template>
	<section class="flex flex-col min-h-screen container overflow-hidden shadow">
		<div class="relative">
			<div v-touch:swipe.left="swipe" :class="'menu w-2/3'+(showMenu?' menu-open':'')">
				<div class="my-auto text-center">
					<p class="text-xl font-bold">Scrum Poker</p>
					<div><img class="block w-full" src="~/assets/img/qr-code.png" alt="https://horacekeung.github.io/scrum-poker/"></div>
					<p v-if="canNavigatorShare" class="mx-auto w-24 text-xl cursor-pointer no-highlight bg-black text-white py-2 px-4 rounded" @click="share">Share</p>
				</div>
				<div><img class="w-10 h-10 m-2" alt="HK" src="~/assets/img/hk.svg"></div>
			</div>
		</div>
		<div class="flex-1 flex flex-wrap -mx-2">
			<div v-for="c in currentGroupCards" :key="c" class="w-1/3 px-2 relative flex">
				<div :class="'transition m-auto cursor-pointer no-highlight'+(expanded?(expanded===c?' expanded':' blur'):'')+(showMenu?' blur':'')" @click="showMenu?null:(expanded=expanded===c?null:c)">
					<div class="m-auto">
						<img class="h-24 shadow-md block" src="~/assets/img/card.png" :alt="c">
						<div class="relative">
							<div v-if="c==='coffee'" class="absolute h-24 w-full pin-b p-3 flex flex-col justify-between">
								<div class="mx-auto"><img class="h-6 w-6 block" src="~/assets/img/coffee.svg" alt="coffee"></div>
								<div class="mx-auto"><img class="h-3 w-3 block" src="~/assets/img/coffee.svg" alt="coffee"></div>
								<div class="mx-auto rotate"><img class="h-6 w-6 block" src="~/assets/img/coffee.svg" alt="coffee"></div>
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
			<div class="w-1/3 px-2 flex"><div :class="'m-auto cursor-pointer no-highlight'+(expanded?' blur':'')" @click="showMenu=!showMenu">
				<img class="h-24 shadow-md block" src="~/assets/img/card-back.png" alt="card">
			</div></div>
		</div>
		<div :class="'flex'+(expanded||showMenu?' blur':'')">
			<div v-for="g in cardGroups" :key="g.name" class="w-1/3">
				<div v-if="g.name===currentGroupName" class="relative">
					<div class="absolute rainbow w-full h-2px pin-b"></div>
				</div>
				<button type="button" :class="`btn-${g.name===currentGroupName?'':'in'}active`" @click="showMenu?null:currentGroupName=g.name">{{g.name}}</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	methods: {
		swipe () { this.showMenu = false },
		share () {
			window.navigator.share({
				title: 'Scrum Poker',
				text: 'I am using Scrum Poker, get yours here',
				url: 'https://horacekeung.github.io/scrum-poker/',
			})
		}
	},
	computed: {
		currentGroupCards () { return this.cardGroups.find(g => g.name === this.currentGroupName).cards.concat(this.others) },
		canNavigatorShare () { return !!window.navigator.share }
	},
	data: () => ({
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
		showMenu: false
	})
}
</script>
