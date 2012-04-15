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

##META Schemas

###Accident

```javascript
Accident meta
```javascript
{
    "objectid": "30376",
    "vehicles": "2",
    "yearOfRe": "2008",
    "accidentD": "03/10/2008 07:00 AM +0000",
    "accident1": "2",
    "accidentH": "16",
    "leg": "IN",
    "houseNumb": null,
    "rbNumber": "v09435",
    "driver1Ag": "0",
    "driver2Ag": "32",
    "driver1Se": "M",
    "driver2Se": "M",
    "vehicle1T": "PA",
    "vehicle2T": "BI",
    "numInjuri": "0",
    "injuryF": "0",
    "injuryPi1": "0",
    "injuryPi2": "0",
    "injuryPi3": "0",
    "direction1": "N",
    "direction2": "W",
    "vehicle1C": "0",
    "vehicle2C": "0",
    "circumstan": "0",
    "circumst1": "0",
    "dangerUns": "0",
    "dangerU1": "0",
    "driver1Co": "N",
    "driver2Co": "N",
    "pedAge": "0",
    "pedSex": null,
    "pedCondit": null,
    "pedAction": null,
    "roadCondi": "D",
    "weather": "C",
    "problemEl": "NS",
    "accidentT": "21",
    "enterDate": "06/25/2008 07:00 AM +0000",
    "editor": "Martinez",
    "status": "1",
    "location1": "Pacific and Bob Boozer Drive\nOmaha, NE 68104\n(41.24848659131902, -96.16663345521903)",    
  }
```

###Building Codes

``` Javascripts
{
    "pin": "PIN",
    "declaredunfit": "NOTDECLUNF",
    "demolition": "DEMO",
    "inspectionstatus": "INSPSTATUS",
    "location1": "Address\nCity, State\n",
}

```

###Campaign Contributors

```javascript

{
    "committeename": "CITIZENS FOR NORTH PLATTE'S FUTURE",
    "committeeid": "99BQC00037",
    "datereceived": "01/05/2000",
    "typeofcontributor": "C",
    "contributorid": "99CON00035",
    "contributiondate": "10/15/1999",
    "cashcontribution": "16000",
    "in-kindcontribution": "0",
    "unpaidpledges": "0",
    "contributorlastname": null,
    "contributorfirstname": null,
    "contributormiddleinitial": " ",
    "contributororganizationname": "FIRST COMMERCE BANCSHARES, INC",
    "contributoraddress": "P O BOX 82408",
    "contributorcity": "LINCOLN",
    "contributorstate": "NE",
    "contributorzipcode": "68508"
}

```

###Crime

```

 {
    "crimeOffenseWithXy": [
      {
        "reportId": "Z49638",
        "vicseq": "1",
        "offseq": "1",
        "prosecuteFlag": "Y",
        "rptdate": "11/24/2011 12:00 AM",
        "rpttime": null,
        "victype": "BUSINESS",
        "occurdate": "11/24/2011 12:00 AM",
        "occurtime": null,
        "occuradd": "3739 N 44 AV",
        "occurhalf": null,
        "occurapt": null,
        "occurcity": "OMAHA",
        "occurstate": "NE",
        "occurzip": "68111.0",
        "occurdistr": "27.0",
        "reportadd": "3739 N 44 AV",
        "reportcity": "OMAHA",
        "reportstat": "NE",
        "reportzip": "68111.0",
        "reportdist": "27.0",
        "vicalcohol": "N",
        "vicdrugs": "N",
        "offensedes": "CRIMINAL MISCHIEF UNDER $200",
        "completeat": "COMPLETED",
        "actdesc1": "OPERATING/PROMOTING/ASSISTING",
        "actdesc2": null,
        "actdesc3": null,
        "hatedesc": "UNKNOWN MOTIVATION",
        "offalcohol": "N",
        "offdrugs": "N",
        "offcompute": "N",
        "locationde": "RESIDENCE/HOME",
        "weapon1": null,
        "weapon1typ": null,
        "weapon2": null,
        "weapon2typ": null,
        "xcoord": "-95.979273",
        "ycoord": "41.292712"
      }
    ],
    "crimeAdmin": [
      {
        "city": "OMAHA",
        "state": "NE",
        "zip": "68111",
        "district": "27",
        "rbNumber": "Z49638",
        "dateGenerated": "11/24/2011 12:00 AM",
        "caseNature": "DOP MV",
        "officerBadge1": "2130",
        "officerBadge2": null,
        "initialAddress": "3739 N 44 AV",
        "initialHalfadd": null,
        "inititalRoom": null
      }
    ],
    "loc": [
      "-95.979273",
      "41.292712"
    ],
    "reportNumber": "Z49638"
  },

```

###Food Inspections

```

  {
    "restaurantname": "11 WORTH CAFÉ",
    "rating": "STANDARD",
    "inspectiondate": "06/06/2011 12:00 AM",
    "location1": "2419 LEAVENWORTH ST\nOmaha, NE\n(41.25241662858707, -95.94798129023536)",
    "loc": [
      "-95.94798129023536",
      "41.25241662858707"
    ]
  }

```

###Liquor License

```

{
    "class": "A     ",
    "descriptionofclass": "Beer on sale",
    "businessname": "ELMWOOD GOLF COURSE                 ",
    "location2": "6232 PACIFIC STREET\nOMAHA, NE\n(41.24875638792781, -96.00775922552293)",
    "loc": [
      "-96.00775922552293",
      "41.24875638792781"
    ]
  }

```

###parkingMeters

```

{
    "objectid": "1",
    "meterId": "20R27",
    "meterStyl": "VIP",
    "type": "Mechanical",
    "subBase": "Dirt",
    "maxHours": "10 hours",
    "ratePerH": ".25 per 75 min",
    "ratePerD": "5",
    "hoursOper": "8:30 - 5:00",
    "signType": null,
    "notes": null,
    "duplex": null,
    "legacyid": "6",
    "location": "20-R",
    "facilityid": "20R27",
    "rotation": "270",
    "globalid": "{3E0085C3-6ABB-45F7-B531-AED51D9E1FE2}",
    "loc": [
      "-95.942838",
      "41.263689"
    ]
  }

```


####School Census
```
{
    "rtake": "94",
    "rmet": "76",
    "rpct": "0.8085",
    "mtake": "94",
    "mmet": "77",
    "mpct": "0.8191",
    "wtake": "45",
    "wmet": "43",
    "wpct": "0.9556",
    "stake": "0",
    "smet": "0",
    "spct": "0",
    "gradrate": "0",
    "grads": "0",
    "possgrads": "0",
    "act": "0",
    "index": "88",
    "noindex": "\\N",
    "name": "SADDLEBROOK ELEMENTARY SCHOOL",
    "phone": "4029333915",
    "county": "DOUGLAS",
    "fax": null,
    "pk": "29",
    "k": "84",
    "g01": "68",
    "g02": "53",
    "g03": "50",
    "g04": "46",
    "g05": "0",
    "g06": "0",
    "g07": "0",
    "g08": "0",
    "g09": "0",
    "g10": "0",
    "g11": "0",
    "g12": "0",
    "total": "330",
    "white": "238",
    "black": "28",
    "hispanic": "26",
    "asian": "14",
    "indian": "0",
    "schoolcodeId": "280001168",
    "location1": "14850 Laurel Ave.\nOmaha 68116\n(41.31027811015181, -96.14687465338014)",
    "loc": [
      "-96.14687465338014",
      "41.31027811015181"
    ]
  },
```