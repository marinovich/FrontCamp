# FrontCamp

https://marinovich.github.io/FrontCamp/



 # Querying Restaurants Collection:
  ### How many "Chinese" (cuisine restaurants are in"Queen" (borough)?
  ```javascript
    db.restaurants
     .find({ 
      borough: "Queens", 
      cuisine: "Chinese"
     })
     .count()
  ```
<details><summary>Answer</summary><p>728</p></details><br/>
  
  ### What is the _id of the restaurant which has the grade with the highest ever score?
  ```javascript
  db.restaurants
    .find({}, { _id: 1 })
    .sort({ "grades.score": -1 })
    .limit(1)
  ```
<details><summary>Answer</summary><p>
  
```javascript
{ "_id" : ObjectId("5c0ec1b54e7d8bc111518eeb") }
```
</p></details><br/>
	
  ### Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough).
```javascript
  db.restaurants.updateMany(
    { borough: "Manhattan" }, 
    { $push: { grades: { grade: "A", score: 7, date: ISODate() } } }
  )
```
<br/>
	
  ### What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id.
  ```javascript
  db.restaurants.find({ "grades.8.score": { $lt: 7 } }, {_id:0, name:1}) 
```
<details><summary>Answer</summary><p>

```javascript
  { "name" : "Silver Krust West Indian Restaurant" }
  { "name" : "Pure Food" }
```
</p></details><br/>
	
  ### What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

```javascript
db.restaurants.find(
  { 
    "cuisine": "Seafood", 
    "grades": { $elemMatch: { 
      "grade": "B",
      "date": { 
        $gte: ISODate("2014-02-01T00:00:00Z"), 
        $lte: ISODate("2014-03-01T00:00:00Z") 
      } 
    } } 
  }, 
  { borough: 1 }
)
```
<details><summary>Answer</summary><p>

```javascript
{ 
  "_id" : ObjectId("5c0ec1b54e7d8bc11151c0fc"), 
  "borough" : "Bronx" 
}
{ 
  "_id" : ObjectId("5c0ec1b54e7d8bc11151c36c"), 
  "borough" : "Manhattan" 
}
{ 
  "_id" : ObjectId("5c100b9ce25cff1f948b18aa"), 
  "borough" : "Bronx" 
}
{
  "_id" : ObjectId("5c100b9ce25cff1f948b1b24"), 
  "borough" : "Manhattan" 
}
{
  "_id" : ObjectId("5c100cc7b26d71de0bb6a5ab"), 
  "borough" : "Bronx" 
}
{ 
  "_id" : ObjectId("5c100cc7b26d71de0bb6a823"),
  "borough" : "Manhattan" 
}
```
</p></details><br/>
	
  # Indexing Restaurants Collection
  ### Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the indexis indeed used by the winning plan: 

```javascript
db.restaurants.find({ name: "Glorious Food" }) 
```
  #### Index creation:

```javascript
db.restaurants.createIndex({ name: 1 })
```
<details><summary>Before index creation</summary><p>
  
```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"name" : {
				"$eq" : "Glorious Food"
			}
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"name" : {
					"$eq" : "Glorious Food"
				}
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
<details><summary>After index creation</summary><p>

```json
{ 
  "queryPlanner" : {
    "plannerVersion" : 1,
    "namespace" : "frontcamp.restaurants",
    "indexFilterSet" : false,
    "parsedQuery" : {
      "name" : {
        "$eq" : "Glorious Food"
      }
    },
    "winningPlan" : {
      "stage" : "FETCH",
      "inputStage" : {
        "stage" : "IXSCAN",
        "keyPattern" : {
          "name" : 1
        },
        "indexName" : "name_1",
        "isMultiKey" : false,
        "multiKeyPaths" : {
          "name" : [ ]
        },
        "isUnique" : false,
        "isSparse" : false,
        "isPartial" : false,
        "indexVersion" : 2,
        "direction" : "forward",
        "indexBounds" : {
          "name" : [
            "[\"Glorious Food\", \"Glorious Food\"]"
          ]
        }
      }
    },
    "rejectedPlans" : [ ]
  },
  "serverInfo" : {
    "host" : "mbp-alex",
    "port" : 27017,
    "version" : "4.0.4",
    "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
  },
  "ok" : 1
}
```
</p></details><br/>
	
  ### Drop index from task

```javascript
db.restaurants.drop({ key: { name: 1 } })
```
<br/>

  ### Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered: 
  
```javascript
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })
```

  #### Index creation:

```javascript
db.restaurants.createIndex({ restaurant_id: 1, borough: 1 })
```
<details><summary>Before index creation</summary><p>

```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"restaurant_id" : {
				"$eq" : "41098650"
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION",
			"transformBy" : {
				"_id" : 0,
				"borough" : 1
			},
			"inputStage" : {
				"stage" : "COLLSCAN",
				"filter" : {
					"restaurant_id" : {
						"$eq" : "41098650"
					}
				},
				"direction" : "forward"
			}
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
<details><summary>After index creation</summary><p>

```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"restaurant_id" : {
				"$eq" : "41098650"
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION",
			"transformBy" : {
				"_id" : 0,
				"borough" : 1
			},
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"restaurant_id" : 1,
					"borough" : 1
				},
				"indexName" : "restaurant_id_1_borough_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"restaurant_id" : [ ],
					"borough" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"restaurant_id" : [
						"[\"41098650\", \"41098650\"]"
					],
					"borough" : [
						"[MinKey, MaxKey]"
					]
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
  ### Create a partial index on cuisine field which will be used only when filtering on borough equal to“Staten Island": 
  #### Uses index: 

```javascript
db.restaurants.find({ borough: "Staten Island", cuisine: "American" })
```
  #### Does not use index: 

```javascript
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" })
```
  #### Does not use index: 

```javascript
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" })
```

  #### Index creation:
  
```javascript
db.restaurants.createIndex(
  { cuisine: 1 }, 
  { partialFilterExpression: { borough: "Staten Island" } }
)
```
<details><summary>db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain()</summary><p>

```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"borough" : {
						"$eq" : "Staten Island"
					}
				},
				{
					"cuisine" : {
						"$eq" : "American"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "FETCH",
			"filter" : {
				"borough" : {
					"$eq" : "Staten Island"
				}
			},
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"cuisine" : 1
				},
				"indexName" : "cuisine_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"cuisine" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : true,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"cuisine" : [
						"[\"American\", \"American\"]"
					]
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
<details><summary>db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain()</summary><p>

```json
	{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"borough" : {
						"$eq" : "Staten Island"
					}
				},
				{
					"name" : {
						"$eq" : "Bagel Land"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"$and" : [
					{
						"borough" : {
							"$eq" : "Staten Island"
						}
					},
					{
						"name" : {
							"$eq" : "Bagel Land"
						}
					}
				]
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
<details><summary>db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain()</summary><p>

```json
	{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"borough" : {
						"$eq" : "Queens"
					}
				},
				{
					"cuisine" : {
						"$eq" : "Pizza"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"$and" : [
					{
						"borough" : {
							"$eq" : "Queens"
						}
					},
					{
						"cuisine" : {
							"$eq" : "Pizza"
						}
					}
				]
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
  ### Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered
	
  Index creation:
  
```javascript
db.restaurants.createIndex(
  { "grades.8.score": 1, name: 1, _id: 1 }, 
  { partialFilterExpression: { "grades.8.score": { $lt: 7 } } }
)
```
<details><summary>Before index creation</summary><p>
  
```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"grades.8.score" : {
				"$lt" : 7
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION",
			"transformBy" : {
				"_id" : 0,
				"name" : 1
			},
			"inputStage" : {
				"stage" : "COLLSCAN",
				"filter" : {
					"grades.8.score" : {
						"$lt" : 7
					}
				},
				"direction" : "forward"
			}
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
	
<details><summary>After index creation</summary><p>

```json
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "frontcamp.restaurants",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"grades.8.score" : {
				"$lt" : 7
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION",
			"transformBy" : {
				"_id" : 0,
				"name" : 1
			},
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"grades.8.score" : 1,
					"name" : 1
				},
				"indexName" : "grades.8.score_1_name_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"grades.8.score" : [ ],
					"name" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : true,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"grades.8.score" : [
						"[-inf.0, 7.0)"
					],
					"name" : [
						"[MinKey, MaxKey]"
					]
				}
			}
		},
		"rejectedPlans" : [
			{
				"stage" : "PROJECTION",
				"transformBy" : {
					"_id" : 0,
					"name" : 1
				},
				"inputStage" : {
					"stage" : "FETCH",
					"inputStage" : {
						"stage" : "IXSCAN",
						"keyPattern" : {
							"grades.8.score" : 1
						},
						"indexName" : "grades.8.score_1",
						"isMultiKey" : false,
						"multiKeyPaths" : {
							"grades.8.score" : [ ]
						},
						"isUnique" : false,
						"isSparse" : false,
						"isPartial" : true,
						"indexVersion" : 2,
						"direction" : "forward",
						"indexBounds" : {
							"grades.8.score" : [
								"[-inf.0, 7.0)"
							]
						}
					}
				}
			},
			{
				"stage" : "PROJECTION",
				"transformBy" : {
					"_id" : 0,
					"name" : 1
				},
				"inputStage" : {
					"stage" : "IXSCAN",
					"keyPattern" : {
						"grades.8.score" : 1,
						"name" : 1,
						"_id" : 1
					},
					"indexName" : "grades.8.score_1_name_1__id_1",
					"isMultiKey" : false,
					"multiKeyPaths" : {
						"grades.8.score" : [ ],
						"name" : [ ],
						"_id" : [ ]
					},
					"isUnique" : false,
					"isSparse" : false,
					"isPartial" : true,
					"indexVersion" : 2,
					"direction" : "forward",
					"indexBounds" : {
						"grades.8.score" : [
							"[-inf.0, 7.0)"
						],
						"name" : [
							"[MinKey, MaxKey]"
						],
						"_id" : [
							"[MinKey, MaxKey]"
						]
					}
				}
			}
		]
	},
	"serverInfo" : {
		"host" : "mbp-alex",
		"port" : 27017,
		"version" : "4.0.4",
		"gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
	},
	"ok" : 1
}
```
</p></details><br/>
