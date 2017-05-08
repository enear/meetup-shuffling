import axios from "axios";
import globalEmitter from "./Emitter";
import { EVENTS } from "../constants";

export default class AttendeesList {
	constructor() {
		this._list = [];
		this._getList();
	}

	async _getList() {
		await axios( 'attendees' ).then( ( results ) => {
			this._list = results.data;
			return results.data;
		} );

		globalEmitter.invoke( EVENTS.ATTENDEES_LIST_UPDATED, this._list );
	}
}