# Reasoning
> Maybe extract that to an ADR

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