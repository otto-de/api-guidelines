# [0002] New API guideline rule `otto:money` object

- Status: `proposed`
- Decided by: <jens.fischer@otto.de>, <max.edenharter@otto.de>
- Date: 2025-05-19


## Context

TODO: cleanup content fragments

The object format has been used in preference to eurocents because of the following reasons:

Although currently not needed, a clear separation of currency and money amount is possible.
Easier to use in OpenAPI and AsyncAPI definitions because one does not need to repeat the description of the money amount every time it is used in a property.
string has been chosen as a type for amount because number is deserialized to an IEEE 754 float representation (see https://floating-point-gui.de/). The representation as float can lead to rounding and calculation errors. This is especially true for currencies with many decimal places (e.g., bitcoin). Example in javascript:

```javascript
let a = 2.2
let b = 2.1
console.log(a+b) //logs 4.300000000000001
```

`currency` is by default "EUR" and thus can be absent for most of OTTOs APIs. This reduces the payload for the current use cases.


# Aus der CoP

* The seperator of euro and cent is a dot (.)
* The currency is usually euro if not otherwise specified.
* The proposal must be changed that the amount is a double (see our partner API)
* Amount need to be converted in a floating point compabile data structure in the corresponding programming language (Java->Bigdecimal)



* Währungssupport wird zukünftig als relevant eingeschätzt. Daher Object mit Currency. Und currency als default, weil meistens EUR
* Die PartnerAPI nutzt Preisobjekt mit double. Partnern wäre ein derartiger breaking Change nicht vermittelbar.
* Um Mappings innerhalb OTTOs zu vermeiden, würden wir ein Preisobjekt mit double nutzen.


* https://otto-eg.atlassian.net/wiki/spaces/P20/pages/123274149/Async+api+guidelines+community#:~:text=Guideline%20missing%20for%20%E2%80%9Cmoney%E2%80%9D%20or%20%E2%80%9Cprice%E2%80%9D%20format
* https://github.com/otto-de/api-guidelines/issues/29
* https://opensource.zalando.com/restful-api-guidelines/#173


<!-- What is the issue that we're seeing that is motivating this decision or change? -->

## Option(s) <!-- optional -->

<!-- Do we have multiple options for a decision or change? -->

### Option 1

### Option 2

## Decision

<!-- What is the change including or why do we choose option x that we're proposing and/or doing? -->

## Consequences

<!-- What becomes easier or more difficult to do because of this change? -->


