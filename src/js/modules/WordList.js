import axios from "axios";
import globalEmitter from "./Emitter";
import { EVENTS } from "../constants";

export default class WordList {
	constructor() {
		this._list = [];
		this._getList();
	}

	async _getList() {
		await axios( 'attendees' ).then( ( results ) => {
			this._list = results.data.map( ( attendee ) => {
				let name = attendee[ "Name" ];
				if ( name.indexOf(' ') === -1 && name !== "" ){
					return name;
				} else if ( name !== "" ) {
					return `${name.substring( 0, name.indexOf( ' ' ) + 2 )}.`
				}
			} ).filter( ( attendee ) => !!attendee );
		} );

		globalEmitter.invoke( EVENTS.WORD_LIST_UPDATED, this._list );
	}
}