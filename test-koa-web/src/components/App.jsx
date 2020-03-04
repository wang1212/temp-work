/**
 * App root component
 */

// @flow
import React, { useEffect } from 'react'
import { App, Page, PageContent, Toolbar, Link, Views, View, Tabs, Tab, Block, Navbar, Swiper, SwiperSlide } from 'framework7-react'
// import routes from './routes.js'
import HomePage from './home/index'

const f7params = {
	// Array with app routes
	routes: [
		{
			path: '/',
			component: HomePage
		}
	],
	// App Name
	name: 'My App',
	// App id
	id: 'com.myapp.test'
	// ...
}

/* Component */
const AppRoot = () => {
	//
	useEffect(function() {
		console.log(this)
	}, [])

	// prettier-ignore
	return (
		// Main Framework7 App component where we pass Framework7 params
		<App params={f7params}>
			<View>
				<Page pageContent={false}>
					<Navbar title="Swipeable Tabs" backLink="Back"></Navbar>
					<Toolbar tabbar bottom>
						<Link tabLink="#tab-1" tabLinkActive>
						Tab 1
						</Link>
						<Link tabLink="#tab-2">Tab 2</Link>
						<Link tabLink="#tab-3">Tab 3</Link>
					</Toolbar>
					<Tabs swipeable className="swiper-init">
						<Tab id="tab-1" className="page-content" tabActive>
							<Swiper>
								<SwiperSlide>Slide 1</SwiperSlide>
								<SwiperSlide>Slide 2</SwiperSlide>
								<SwiperSlide>Slide 3</SwiperSlide>
							</Swiper>
						</Tab>
						<Tab id="tab-2" className="page-content">
							<Block>
								<p>Tab 2 content</p>
								...
							</Block>
						</Tab>
						<Tab id="tab-3" className="page-content">
							<Block>
								<p>Tab 3 content</p>
								...
							</Block>
						</Tab>
					</Tabs>
				</Page>
			</View>
		</App>
	)
}

export default AppRoot

// <Page pageContent={false}>
// 	<Toolbar bottom tabbar labels>
// 		<Link tabLink="#tab-1" text="主页" iconIos="f7:email_fill" iconAurora="f7:email_fill" iconMd="material:email" iconOnly tabLinkActive />
// 		<Link tabLink="#tab-2" text="主页" iconIos="f7:today_fill" iconAurora="f7:today_fill" iconMd="material:today" iconOnly />
// 		<Link tabLink="#tab-3" text="我" iconIos="f7:cloud_fill" iconAurora="f7:cloud_fill" iconMd="material:file_upload" iconOnly />
// 	</Toolbar>
// 	<PageContent>
// 		<Tabs /* tabs */ swipeable>
// 			<Tab id="tab-1" className="page-content" /* tab */ tabActive>
// 				<PageContent>111</PageContent>
// 			</Tab>
// 			<Tab id="tab-2" className="page-content" /* tab */>
// 				222
// 			</Tab>
// 			<Tab id="tab-3" className="page-content" /* tab */>
// 				333
// 			</Tab>
// 		</Tabs>
// 	</PageContent>
// </Page>
