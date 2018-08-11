const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
	static extract (content) {
		return content.match(/[A-Za-z0-9-_:\/]+/g) || []
	}
}

module.exports = {
	mode: 'spa',
	head: {
		script: process.env.DEPLOY_ENV === 'GH_PAGES' ? [{src: '/scrum-poker/gh-spa.js'}] : []
	},
	loading: false,
	manifest: {
		name: 'Scrum Poker',
		short_name: 'Scrum Poker',
		theme_color: '#24292e',
		orientation: 'portrait'
	},
	modules: ['@nuxtjs/pwa'],
	build: {
		extractCSS: true,
		// Run ESLint on save
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Cleanup CSS with PurgeCSS
			if (!isDev) {
				config.plugins.push(
					new PurgecssPlugin({
						paths: glob.sync([
							path.join(__dirname, './pages/**/*.vue'),
							path.join(__dirname, './layouts/**/*.vue'),
							path.join(__dirname, './components/**/*.vue')
						]),
						extractors: [{
							extractor: TailwindExtractor,
							extensions: ['vue']
						}],
						whitelist: ['html', 'body', 'transition', 'expanded', 'blur', 'menu'],
						whitelistPatterns: [/^btn/]
					})
				)
			}
		}
	},
	css: ['@/assets/css/global.css'],
	router: {
		base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/scrum-poker/' : ''
	}
}
