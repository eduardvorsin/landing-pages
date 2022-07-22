'use strict';

import focusVisible from './libs/focus-visible.min.js';
import inert from './libs/inert.min.js';
import lazyLoading from './plugins/_lazyloading.js';

document.addEventListener('DOMContentLoaded', () => {
	CustomEase.create('ease', '0.5, 0.5, 0.3, 1');

	const isMobileWidth = window.innerWidth < 769;
	const prefersReduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

	function showPreloader() {
		const preloader = gsap.timeline({
			defaults: {
				duration: isMobileWidth ? 0.5 : 0.7,
				ease: 'ease',
				transformOrigin: 'left',
				force3D: true,
				x: 0,
				y: 0,
			},
		});

		preloader
			.to('.preloader__item', {
				stagger: 0.05,
				scaleX: 0,
				z: 0,
			})
			.to('.preloader', {
				zIndex: -1,
			}, '>');

		return new Promise(resolve => {
			setTimeout(resolve, isMobileWidth ? 1100 : 1300);
		});
	}

	function setInitialAnimations() {
		gsap.set(
			'.header',
			{
				y: isMobileWidth ? -72 : -92,
				autoAlpha: 0
			});
		gsap.set(
			[
				'.hero__content',
				'.title--section>span',
				'.subtitle>span',
				'.man-collection__slider',
				'.woman-collection__slider',
				'.footer__copyright',
			],
			{
				x: 0,
				y: isMobileWidth ? 50 : 100,
				z: 0,
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.category-gallery__item:nth-child(4n+2)',
				'.avone-gallery__item:nth-child(even)',
				'.footer__subscribe',
			],
			{
				x: isMobileWidth ? 50 : 100,
				y: 0,
				z: 0,
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.category-gallery__item:nth-child(4n+1)',
				'.category-gallery__item:nth-child(4n+3)',
				'.category-gallery__item:nth-child(4n+4)',
				'.avone-gallery__item:nth-child(odd)',
				'.footer__about',
			],
			{
				x: isMobileWidth ? -50 : -100,
				y: 0,
				z: 0,
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.promo__content',
			],
			{
				x: 0,
				y: isMobileWidth ? -50 : -100,
				z: 0,
				autoAlpha: 0,
			});
	}

	function playAnimations() {

		const heroTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.hero',
				start: 'top center',
				once: true,
			},
		});

		heroTl.to(
			'.header',
			{},
			'>'
		).to(
			'.hero__content',
			{},
			'<'
		);

		const categoryTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.category',
				start: isMobileWidth ? 'top center' : 'top+=150 center',
				once: true,
			},
		});

		categoryTl.to(
			'.category-gallery__item',
			{},
		);

		const avoneTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.avone',
				start: isMobileWidth ? 'top center' : 'top+=150 center',
				once: true,
			},
		});

		avoneTl.to(
			'.avone-gallery__item',
			{},
			'>'
		).to(
			'.avone__title>span',
			{},
			'<'
		).to(
			'.avone__subtitle>span',
			{},
			'<'
		);

		const manCollectionTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.man-collection',
				start: isMobileWidth ? 'top center' : 'top+=75 center',
				once: true,

			},
		});

		manCollectionTl.to(
			'.man-collection__slider',
			{},
			'>'
		).to(
			'.man-collection__title>span',
			{},
			'<'
		).to(
			'.man-collection__subtitle>span',
			{},
			'<'
		);

		const womanCollectionTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.woman-collection',
				start: isMobileWidth ? 'top center' : 'top+=75 center',
				once: true,

			},
		});

		womanCollectionTl.to(
			'.woman-collection__slider',
			{},
			'>'
		).to(
			'.woman-collection__title>span',
			{},
			'<'
		).to(
			'.woman-collection__subtitle>span',
			{},
			'<'
		);

		const promo = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.promo',
				start: isMobileWidth ? 'top-=50 center' : 'top+=150 center',
				once: true,

			},
		});

		promo.to(
			'.promo__content',
			{},
		);

		const footer = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: 'ease',
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.footer',
				start: isMobileWidth ? 'top center' : 'top-=100 center',
				once: true,
			},
		});

		footer
			.to(
				'.footer__about',
				{},
				'>'
			).to(
				'.footer__subscribe',
				{},
				'<'
			).to(
				'.footer__copyright',
				{},
				'<'
			);
	}

	if (!prefersReduceMotion.matches) {
		setInitialAnimations();
		showPreloader().then(playAnimations);
	}

	const burgerMenu = document.querySelector('.burger-menu');

	function toggleNavMenu() {
		const nav = document.querySelector('.nav');
		const header = document.querySelector('.header');

		if (!burgerMenu.classList.contains('_active')) {
			burgerMenu.setAttribute('aria-expanded', true);
			nav.setAttribute('aria-hidden', false);
		}

		else {
			burgerMenu.setAttribute('aria-expanded', false);
			nav.setAttribute('aria-hidden', true);
		}

		burgerMenu.classList.toggle('_active');
		header.classList.toggle('_active');
		nav.classList.toggle('_active');
		document.body.classList.toggle('_body-lock');
	}

	burgerMenu.addEventListener('click', toggleNavMenu);

	new Swiper('.man-collection-slider__inner', {
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

		grabCursor: true,

		slidesPerView: 1,
		spaceBetween: 20,
		slidesPerGroup: 1,
		loop: true,

		autoplay: {
			delay: 2000,
			stopOnLastSlide: false,
			disableOnInteraction: true,
			pauseOnMouseEnter: true,
		},

		speed: 500,

		breakpoints: {
			426: { slidesPerView: 2 },
			568: { slidesPerView: 2 },
			769: { slidesPerView: 3, spaceBetween: 30, },
			993: { slidesPerView: 4, },
		},
		a11y: {
			enabled: true,
		},
		preloadImages: false,
		lazy: true,
	});

	new Swiper('.woman-collection-slider__inner', {
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

		grabCursor: true,

		slidesPerView: 1,
		spaceBetween: 20,
		slidesPerGroup: 1,
		loop: true,

		autoplay: {
			delay: 2000,
			stopOnLastSlide: false,
			disableOnInteraction: true,
			pauseOnMouseEnter: true,
		},

		speed: 500,

		breakpoints: {
			426: { slidesPerView: 2 },
			568: { slidesPerView: 2 },
			769: { slidesPerView: 3, spaceBetween: 30, },
			993: { slidesPerView: 4, },
		},
		a11y: {
			enabled: true,
		},
		preloadImages: false,
		lazy: true,
	});
})

