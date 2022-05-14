'use strict';


import focusVisible from './libs/focus-visible.min.js';
import inert from './libs/inert.min.js';
import lazyLoading from './plugins/_lazyloading.js';

window.addEventListener('DOMContentLoaded', () => {
	const scrollDown = document.querySelector('#scroll-down');
	const firstScreen = document.querySelector('.hero');
	const scrollTop = document.querySelector('#scroll-top');
	const burgerMenu = document.querySelector('.burger-menu');
	const isMobileWidth = window.innerWidth < 769;
	const isTabletWidth = window.innerWidth < 993;


	const prefersReduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
	const header = document.querySelector('.header');

	const showPreloader = () => {
		const preloader = gsap.timeline({
			defaults: {
				duration: 0.7,
				ease: 'power2.Out',
				transformOrigin: 'center',
				force3D: true,
			},
		});

		preloader
			.to('.preloader__item', {
				stagger: function () {
					return gsap.utils.random(0, 0.5);
				},
				scale: 0,
				z: 0,
			})
			.to('.preloader', {
				zIndex: -1,
			}, '>');
	}


	function setInitialEffects() {
		gsap.set(
			'.header',
			{
				x: 0,
				y: isMobileWidth ? -45 : -76,
				z: 0,
			});
		gsap.set(
			[
				'.hero__content',
				'.about__content',
				'.services__title',
				'.description__title',
				'.catalog__title',
				'.products__title',
			],
			{
				x: isMobileWidth ? -50 : -100,
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.services__subtitle-text',
				'.description__subtitle-text',
				'.description__row',
				'.catalog__subtitle-text',
				'.products__subtitle-text',
			],
			{
				x: isMobileWidth ? 50 : 100,
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.hero__scroll-down',
				'.video__btn',
			],
			{
				autoAlpha: 0,
			});
		gsap.set(
			[
				'.services-row__item',
				'.catalog__slider',
				'.products-row__item',
				'.footer__item',
			],
			{
				y: isMobileWidth ? 50 : 100,
				autoAlpha: 0,
			});

		if (!isTabletWidth) {
			gsap.set(
				[
					'.about',
				],
				{
					backgroundPositionX: '150%',
				});
			gsap.set(
				[
					'.description',
				],
				{
					backgroundPositionX: '-65%',
				});
		}
	}
	function clearAnimationClass() {
		const animationSection = document.querySelector(this.vars.scrollTrigger.trigger);
		animationSection.classList.remove("_animation");
	}

	function setAnimations() {
		const heroTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.hero',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const aboutTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.about',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const videoTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.video',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const servicesTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.services',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const descriptionTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.description',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const catalogTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.catalog',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const productsTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.products',
				start: isMobileWidth ? 'top+=50 center' : 'top+=200 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});
		const footerTl = gsap.timeline({
			defaults: {
				duration: 0.6,
				ease: Power2.easeOut,
				x: 0,
				y: 0,
				z: 0,
				force3D: true,
				autoAlpha: 1,
				clearProps: true,
			},
			scrollTrigger: {
				trigger: '.footer',
				start: isMobileWidth ? 'top-=100 center' : 'top-=300 center',
				once: true,
			},
			onComplete: clearAnimationClass,
		});

		heroTl
			.to(
				'.header',
				{},
				'>',
			).to(
				'.hero__content',
				{},
				'>'
			).to(
				'.hero__scroll-down',
				{},
				'>'
			);

		aboutTl
			.to(
				'.about',
				isTabletWidth ? {} : { backgroundPosition: '115% center', },
				'>'
			).to(
				'.about__content',
				{},
				'<'
			);

		videoTl
			.to(
				'.video',
				{},
			)
			.to(
				'.video__btn',
				{},
				'>'
			);
		servicesTl
			.to(
				'.services__title',
				{},
				'>'
			)
			.to(
				'.services__subtitle-text',
				{},
				'<'
			)
			.to(
				'.services-row__item',
				{ stagger: 0.2 },
				'>-=0.2'
			);
		descriptionTl
			.to(
				'.description__title',
				{},
				'>'
			)
			.to(
				'.description__subtitle-text',
				{},
				'<'
			)
			.to(
				'.description',
				isTabletWidth ? {} : { backgroundPositionX: '-20%', },
				'>'
			)
			.to(
				'.description-row',
				{},
				'<'
			);
		catalogTl
			.to(
				'.catalog__title',
				{},
				'>'
			)
			.to(
				'.catalog__subtitle-text',
				{},
				'<'
			)
			.to(
				'.catalog__slider',
				{},
				'>'
			);
		productsTl
			.to(
				'.products__title',
				{},
				'>'
			)
			.to(
				'.products__subtitle-text',
				{},
				'<'
			)
			.to(
				'.products-row__item',
				{ stagger: 0.2 },
				'>-=0.2'
			);
		footerTl
			.to(
				'.footer__item',
				{ stagger: 0.2 },
				'>-=0.2'
			);
	}

	if (!prefersReduceMotion.matches) {
		playAnimations();
	}

	function playAnimations() {
		setInitialEffects();
		showPreloader();
		setTimeout(setAnimations, 700);
	}

	function toggleNavMenu() {
		const nav = document.querySelector('.nav');

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

	document.addEventListener('click', (e) => {
		if (e.target === scrollDown) {
			console.log(e);
			window.scrollTo({
				top: firstScreen.offsetHeight,
				behavior: 'smooth',
			})
		}
		if (e.target === scrollTop) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	});

	document.addEventListener('scroll', (e) => {
		if (window.scrollY > firstScreen.offsetHeight) {
			scrollTop.classList.add('_active');
			header.classList.add('_fixed');
			return;
		}

		scrollTop.classList.remove('_active');
		header.classList.remove('_fixed');

	});

	new Swiper('.catalog-slider__inner', {
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

		slidesPerView: 1,
		spaceBetween: 30,
		slidesPerGroup: 1,
		centeredSlides: true,
		loop: true,
		speed: 500,

		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},

		breakpoints: {
			320: { slidesPerView: 1, },
			769: { slidesPerView: 2, spaceBetween: 60, },
			993: { slidesPerView: 2, spaceBetween: 100, },
		},

		a11y: {
			enabled: true,
		},

		preloadImages: false,
		lazy: true,

	});
});