var express = require( 'express' );
var router = express.Router();
var node_xj = require( 'xls-to-json' );
var path = require( 'path' );

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index' );
} );

router.get( '/attendees', function ( req, res, next ) {

	node_xj( {
		input: path.join( __dirname, '../nodeschool_international_day_2.xls' ), // input xls
		output: path.join( __dirname, '../nodeschool_international_day.json' ),
		sheetname: 'Sheet 1'// output json
	}, function ( err, result ) {
		if ( err ) {
			res.json( err );
		} else {
			res.json( result );
		}
	} );

} );

module.exports = router;
