<template>
	<section class="flex flex-col min-h-screen container overflow-hidden">
		<div class="flex-1 flex flex-wrap -mx-2">
			<div v-for="c in currentGroupCards" :key="c" class="w-1/3 px-2 flex">
				<div class="m-auto">
					<p>{{c}}</p>
				</div>
			</div>
		</div>
		<div class="flex">
			<div v-for="g in cardGroups" :key="g.name" class="w-1/3">
				<div v-if="g.name===currentGroupName" class="relative">
					<div class="absolute rainbow w-full h-2px pin-b"></div>
				</div>
				<button type="button" :class="`btn-${g.name===currentGroupName?'':'in'}active`" @click="currentGroupName=g.name">{{g.name}}</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	computed: {
		currentGroupCards () { return this.cardGroups.find(g => g.name === this.currentGroupName).cards }
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
		]
	})
}
</script>
