var mapForJoin = function() {                                                                                               

                     
  var foreign_document = db.foreign_collection.find( {foreign_document_id: this._id} );

  var values = {
    field_one: this.field_one,
    field_two: foreign_document[0].field_two,
    field_three: this.field_three
  };

  emit(this._id, values);
}

var reduce = function(key, values) {
    return values[0];
}

// remember indexes!!!
db.this_collection.mapReduce(
  mapForJoin,
        reduce,
        {
            out: { reduce: 'joined_collection' },
            query: { some_field: 'some value' }
        }
);

// see the resulting collection
db.joined_collection.find().pretty(); 

// export the resulting collection
mongoexport --csv --db dbname --collection joined_collection --fields value.field_one,value.field_two,value.field_three --out joined_collection.csv
