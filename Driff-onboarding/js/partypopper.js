var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /**
* Creates a Mo.js party popper animation.
*
* @property {string}  selector - DOM selector to attach the animation to
* @property {boolean} [debug]  - If enabled, add a debug timeline
*/
function partyPopper(selector, debug) {
	var colors = [
	'#bea4ff',
	'#feb535',
	'#ff6e83',
	'#58cafe'];


	var flight = {
		isSwirl: true,
		swirlSize: 'rand(10, 20)',
		swirlFrequency: 'rand(1, 3)',
		direction: [-1, 1],
		degreeShift: 'rand(-15, 15)',
		duration: 1200,
		easing: 'cubic.out',
		pathScale: 'stagger(.2)'


		// Confetti shapes
	};var torsade = _extends({
		shape: 'zigzag',
		points: 'rand(4, 6)',
		radius: 40,
		radiusY: 30,
		strokeLinecap: 'round',
		strokeWidth: 8,
		fill: 'none',
		stroke: colors,
		angle: { 0: 'rand(-720, 720)' } },
	flight);


	var bent = _extends({
		shape: 'curve',
		radius: 'rand(25, 35)',
		radiusY: 15,
		strokeLinecap: 'round',
		strokeWidth: 8,
		fill: 'none',
		stroke: colors,
		angle: { 0: 'rand(-720, 720)' } },
	flight);


	var flake = _extends({
		shape: 'circle',
		radius: 'rand(5, 10)',
		fill: colors },
	flight);


	// Bursts
	var burst = {
		parent: selector,
		radius: { 0: 'rand(50, 100)' },
		count: 'rand(18, 22)',
		degree: 30 };


	var torsadeBurst = new mojs.Burst(_extends({},
	burst, {
		children: _extends({},
		torsade) }));



	var bentBurst = new mojs.Burst(_extends({},
	burst, {
		children: _extends({},
		bent) }));



	var flakeBurst = new mojs.Burst(_extends({},
	burst, {
		children: _extends({},
		flake) }));



	// Timeline (debug only)
	if (debug != null) {
		var timeline = new mojs.Timeline();

		timeline.add(
		torsadeBurst,
		bentBurst,
		flakeBurst);


		new MojsPlayer({
			add: timeline,
			isPlaying: true,
			isRepeat: false });

	} else {
		torsadeBurst.play();
		bentBurst.play();
		flakeBurst.play();
	}
};