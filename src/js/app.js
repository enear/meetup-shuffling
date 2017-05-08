import AttendeesList from "./modules/AttendeesList";
import WordSlider from "./modules/WordSlider";
import DetailContainer from "./modules/DetailContainer";
import { PIXEL_RATIO, CANVAS_DIMENSIONS, EVENTS } from "./constants";
import globalEmitter from "./modules/Emitter";

(function () {
	class MainApp {
		constructor() {
			this._startTime = null;
			this._lastTick = 0;
			this._canvas = document.getElementById( 'word-slider' );
			this._canvas.width = CANVAS_DIMENSIONS.width * PIXEL_RATIO;
			this._canvas.height = CANVAS_DIMENSIONS.height * PIXEL_RATIO;
			this._canvas.style.width = CANVAS_DIMENSIONS.width + 'px';
			this._canvas.style.height = CANVAS_DIMENSIONS.height + 'px';
			this._ctx = this._canvas.getContext( '2d' );
			this._isActive = true;
			this._detailContainer = new DetailContainer();
			this._attendeesList = new AttendeesList();
			this._wordSlider = new WordSlider();

			globalEmitter.subscribe( EVENTS.ATTENDEES_LIST_UPDATED, ( e, attendeesList ) => {
				if ( attendeesList.length > 0 ) {
					this._start();
				}
			} );

		};

		_start() {
			globalEmitter.invoke( EVENTS.PLAY_WORD_SLIDER );
			this._tick( 0 );
		}

		_tick( timeDelta, timestamp ) {
			let req = window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame;

			this.update( timeDelta, timestamp );

			req( ( timestamp ) => {
				this._startTime = this._startTime || timestamp;
				this._tick( timestamp - this._lastTick, timestamp );
				this._lastTick = timestamp;
			} )
		};

		update( timeDelta, timestamp ) {
			this._wordSlider.update( timeDelta, timestamp );
			this._ctx.clearRect( 0, 0, this._canvas.width, this._canvas.height );
			this._wordSlider.draw( this._ctx );
		};
	}
	new MainApp();
})();
