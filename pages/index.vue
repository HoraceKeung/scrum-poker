<template>
	<section class="flex flex-col min-h-screen container overflow-hidden shadow">
		<div class="relative">
			<div :class="'menu '+(showMenu?'w-2/3':'w-0')">
				<p class="mt-auto mx-auto text-xl font-bold">Scrum Poker</p>
				<div><img class="block w-full" src="~/assets/img/qr-code.png" alt="https://horacekeung.github.io/scrum-poker/"></div>
				<p class="mx-auto mb-auto text-xl cursor-pointer no-highlight bg-black text-white py-2 px-4 rounded" @click="share">Share</p>
				<div><img class="w-10 h-10 m-2" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMCAwIDEwIDEwIDEwIDkwIDAgMTAwIFoiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlPSIjMjQyOTJlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgogIDxwYXRoIGQ9Ik0xMDAgMCwgMTAwIDEwLCA5MCAxNiwgOTAgNDUsIDQwIDQ1LCA0MCA1NSwgOTAgNTUsIDkwIDg0LCAxMDAgOTAsIDEwMCAxMDAsIDE1IDUwIFoiIGZpbGw9IiMyNDI5MmUiLz4KICA8cGF0aCBkPSJNMTAwIDIwIFYgODAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlPSIjMjQyOTJlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4K"></div>
			</div>
		</div>
		<div class="flex-1 flex flex-wrap -mx-2">
			<div v-for="c in currentGroupCards" :key="c" class="w-1/3 px-2 relative flex">
				<div :class="'transition m-auto cursor-pointer no-highlight'+(expanded?(expanded===c?' expanded':' blur'):'')+(showMenu?' blur':'')" @click="showMenu?null:(expanded=expanded===c?null:c)">
					<div class="m-auto">
						<img class="h-24 shadow-md block" src="~/assets/img/card.png" :alt="c">
						<div class="relative">
							<div class="absolute h-24 w-full text-center pin-b p-3 flex flex-col justify-between">
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
		share () {
			const text = 'I am using Scrum Poker, get yours here'
			if ('share' in navigator) {
				navigator.share({
					title: document.title,
					text: text,
					url: location.href,
				})
			} else {
				// Here we use the WhatsApp API as fallback; remember to encode your text for URI
				location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
			}
		}
	},
	computed: {
		currentGroupCards () { return this.cardGroups.find(g => g.name === this.currentGroupName).cards.concat(this.others) }
	},
	data: () => ({
		currentGroupName: 'Standard',
		cardGroups: [
			{
				name: 'Standard',
				cards: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '90', '100']
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
