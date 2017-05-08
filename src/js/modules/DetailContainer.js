import { EVENTS } from "../constants";
import * as CONFIG from "../config";
import globalEmitter from "./Emitter";

const WORD_DETAIL_MAP = CONFIG.wordDetailMap;

export default class DetailContainer {
	constructor() {
		this._nameContainer = document.getElementById( 'name-container' );
		this._body = document.getElementsByTagName( "body" )[ 0 ];
		this._button = document.getElementById( 'detail-button' );
		this._attendeesList = [];

		globalEmitter.subscribe( EVENTS.RESOLUTION_WINNER, ( e, textId ) => this.showContainer( textId ) );
		globalEmitter.subscribe( EVENTS.ATTENDEES_LIST_UPDATED, ( e, attendeesList ) => this._attendeesList = attendeesList );
		this._button.addEventListener( 'click', this._onButtonClick.bind( this ) );
	}

	showContainer( textId ) {
		this._currentDetail = this._attendeesList[ textId ];

		this._nameContainer.innerText = this._currentDetail[ 'Name' ];
		this._nameContainer.setAttribute( 'href', this._currentDetail[ "URL of Member Profile" ] );

		this._slideInContainer();
	}

	async _onButtonClick( e ) {
		e.preventDefault();
		await this._slideOutContainer();

		globalEmitter.invoke( EVENTS.PLAY_WORD_SLIDER );
	}

	_insertText() {

	}

	_slideOutContainer() {
		return new Promise( ( resolve ) => {
			this._body.className = '';
			this._body.className = 'slide-out';
			setTimeout( resolve, 1000 );
		} );
	}

	_slideInContainer() {
		return new Promise( ( resolve ) => {
			this._body.className = '';
			this._body.className = 'slide-in';
			setTimeout( resolve, 1000 );
		} );
	}
}