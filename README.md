# FrontCamp

https://marinovich.github.io/FrontCamp/


<details><summary><strong>MongoDB. Home Task 1</strong></summary><p>
  
 # Querying Restaurants Collection:
  ### 1. How many "Chinese" (cuisine restaurants are in"Queen" (borough)?
  ```javascript
    db.restaurants
     .find({ 
      borough: "Queens", 
      cuisine: "Chinese"
     })
     .count()
  ```
<details><summary>Answer</summary><p>728</p></details><br/>
  
  ### 2. What is the _id of the restaurant which has the grade with the highest ever score?
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
	
  ### 3. Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough).
```javascript
  db.restaurants.updateMany(
    { borough: "Manhattan" }, 
    { $push: { grades: { grade: "A", score: 7, date: ISODate() } } }
  )
```
<br/>
	
  ### 4. What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id.
  ```javascript
  db.restaurants.find({ "grades.8.score": { $lt: 7 } }, {_id:0, name:1}) 
```
<details><summary>Answer</summary><p>

```javascript
  { "name" : "Silver Krust West Indian Restaurant" }
  { "name" : "Pure Food" }
```
</p></details><br/>
	
  ### 5. What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

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
  ### 1. Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the indexis indeed used by the winning plan: 

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
	
  ### 2. Drop index from task

```javascript
db.restaurants.drop({ key: { name: 1 } })
```
<br/>

  ### 3. Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered: 
  
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
	
  ### 4. Create a partial index on cuisine field which will be used only when filtering on borough equal to“Staten Island": 
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
	
  ### 5. Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered
	
  #### Index creation:
  
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

</p></details><br/>

<details><summary><strong>MongoDB. Home Task 2</strong></summary><p>
  
# Aggregating Airlines Collection:
  
### 1. How many records does each airline class have? Use $project to show result as 
```{ class: "Z", total: 999 }```
```javascript
  db.airlines.aggregate([
    { $group: { _id:"$class", total:{ $sum:1 } } }, 
    { $project:{ _id:0, class:"$_id", total:"$total" } }
  ])
```
<details><summary>Answer</summary><p>
  
```javascript
{ "class" : "F", "total" : 140343 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "G", "total" : 17499 }
```
</p></details><br/>

### 2. What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as
```{ "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" } ```
```javascript
  db.airlines.aggregate([
    { $match: { "destCountry" : { $ne:"United States" } } }, 
    { $group: { _id: "$destCity", avg: { $avg: "$passengers" } } },
    { $sort: { avg: -1 } }, 
    { $project: { _id: 0, avgPassengers: "$avg", city: "$_id"} }, 
    { $limit: 3 }
  ])
```
<details><summary>Answer</summary><p>
  
```javascript
{ "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }
```
</p></details><br/>

### 3. Which carriers provide flights to Latvia (destCountry)? Show result as one document
```{ "_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }```
```javascript
  db.airlines.aggregate([
    { $match: { "destCountry": "Latvia" } }, 
    { $group: { _id: "$destCountry", carriers: { $addToSet: "$carrier" } } }
  ])
```
<details><summary>Answer</summary><p>
  
```javascript
{ 
  "_id" : "Latvia", 
  "carriers" : [ 
    "Blue Jet SP Z o o", 
    "Uzbekistan Airways", 
    "JetClub AG" 
  ] 
}
```
</p></details><br/>

### 4.  What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the first 3). Show result as 
```{ "_id" : "<carrier>", "total" : 999}```
```javascript
  db.airlines.aggregate([
    { $match: {
      "originCountry": "United States", 
      "destCountry": { $in: ["Spain","Italy","Greece"] } }
    }, 
    { $group: { _id: "$carrier", total: { $sum: 1 } } }, 
    { $sort: { total: -1 } }, 
    { $limit: 10 }, 
    { $skip: 3 }
  ])
```
<details><summary>Answer</summary><p>
  
```javascript
{ "_id" : "Iberia Air Lines Of Spain", "total" : 41 }
{ "_id" : "VistaJet Limited", "total" : 38 }
{ "_id" : "Compagnia Aerea Italiana", "total" : 33 }
{ "_id" : "Cargolux Airlines International S.A", "total" : 21 }
{ "_id" : "Air Europa", "total" : 20 }
{ "_id" : "TAG Aviation Espana S.L.", "total" : 18 }
{ "_id" : "Atlas Air Inc.", "total" : 13 }
```
</p></details><br/>

### 5. Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as 
```{ "totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz" } }```
```javascript
db.airlines.aggregate([
  { $match: { "originCountry": "United States" } }, 
  { $group: { _id: { state: "$originState", city: "$originCity" }, passengers: { $sum: "$passengers" } } }, 
  { $sort: { "passengers": -1 } },
  { $group: { _id: "$_id.state", other: { $push: { passengers: "$passengers", city: "$_id.city" } } } }, 
  { $project: { _id: "$_id", other: { $arrayElemAt: [ "$other", 0 ] } } },
  { $project: { totalPassengers: "$other.passengers", location: {state: "$_id", city: "$other.city" }, _id: 0 } }, 
  { $sort: { "location.state": 1 } }, 
  { $limit: 5 }
])
```
<details><summary>Answer</summary><p>
  
```javascript
{ "totalPassengers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
{ "totalPassengers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
{ "totalPassengers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
{ "totalPassengers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
{ "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }
```
</p></details><br/>

# Aggregate Enron Collection:
  
### Which pair of people have the greatest number of messages in the dataset?

```javascript
  db.enron.aggregate([
    { $unwind: "$headers.To" }, 
    { $group: { _id: { from: "$headers.From", to: "$headers.To" }, sum: { $sum:1 } } }, 
    { $sort: { "sum": -1 } }, 
    { $limit: 1 }
  ])
```
<details><summary>Answer</summary><p>
  
```javascript
{ "_id" : { "from" : "veronica.espinoza@enron.com", "to" : "recipients@enron.com" }, "sum" : 2181 }
```
</p></details><br/>
  
</p></details><br/>
