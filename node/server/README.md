safeomaha-server
=========

Overview
--------

Safe omaha node server

##Install

```
    npm install
```

##Import Data

```
  ./bin/import ../parser/data/post_process/dataset.json
```

## Start Server

```
  ./bin/start-server host? port?
```

To change default host, port, or mongodb url edit config.json.


##Server Routes

```
    #All items
    /safeomaha

    #All items of a particular type
    /safeomaha/{type}
    (e.g /safeomaha/ACCIDENT)

    #All items of a particular type and category
    /safeomaha/{type}/{category}
    (e.g /safeomaha/ACCIDENT/Bicycle Accident)

     #All types that are avaiable to query
    /safeomaha/types

    #All categories of a type of item
    /safeomaha/{type}/categories
    (e.g. /safeomaha/ACCIDENT/categories)


    ###
    #Query Parameters
    # x&y - limit to a geographic point
    # meta[default=false] - include meta data about each item
    # radius[default=0.5] - if x&y is included then this search radius (in KM) will be used.
    ###

    #EXAMPLES

    #All items that occur with .1KM of [96.00216, 41.295230000000004] and include meta
    /safeomaha?x=-96.00216&y=41.295230000000004&radius=.1&meta=true

    #All crime that occur with 7KM of [96.00216, 41.295230000000004] and include meta
    /safeomaha/CRIME?x=-96.00216&y=41.295230000000004&radius=7&meta=true

    #All CHILD ABUSE/NEGLECT that occur with 7KM of [-96.0030496, 41.29579]
    /safeomaha/CRIME/CHILD%20ABUSE%2FNEGLECT?x=-96.0030496&y=41.295799&radius=7
```