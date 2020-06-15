# Relative vs Absolute URIs

There are many good reasons to use HATEOAS in order to establish links between resources and prevent the client from being forced to construct URIs themselves. A Key questions when using Hypermedia is what the links should look like.

## Relative URIs

At first glance, relative URIs seem like the better solution as they obviously reduce the payload. But the client has to figure out what the relative link is actually relative to - the Base URI.

One could now agree that the URI of the requested resource is always used as Base URI. Since the same resource may be reachable under several URIs (different representations), the client would have to remember where it requested the representation. A big disadvantage of relative URIs is, that they prohibit the API from targeting different host names.

This leads to lot of overhead for the client for the prize of a slightly smaller payload. And we actually wanted to reduce the overhead for the client with HATEOAS, right?

## Absolute URIs

Absolute URIs prohibit clientside complexity as the client can simply extract the URI out of the payload into his workflow. What seems very handy from the client perspective can lead to a problem, when the client operates through a proxy.

After the initial request, the client still wants to operate through the proxy and not call the API directly. For this reason the Team responsible for the API should never hardcode the hostname:port part of their URI. In fact they should provide an ability to replace the hostname of their given URIs. This should be done by supporting the X-FORWARDED-HOST header which identifies the original host requested by the client. Spring HATEOAS supports the X-FORWARDED-Headers by default. We must follow this pattern.

## Shopoffice point of view

To illustrate the advantages and disadvantages of relative and absolute URIs, we will now deal with a real world example that is in production today in the Shopoffice application:

We are calling the mc-API of team Nav to retrieve the NavigationItem for a specific Dreson-rule:

`https://mc.develop.nav.cloud.otto.de/v1/page/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(~.(v.1)))/child/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.anzuege).(~.(v.1)))/live/1`

The response contains a link to another resource on another host (Firefly) from another team (Find):

```json
{
  "links": [
    {
      "rel": "children",
      "link": "https://firefly.develop.find.cloud.otto.de/selections/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.sakkos.anzugsakkos).(~.(v.1)))/dynamic-paths/"
    }
  ]
}
```

Imagine the link with a relative URI:

```json
{
  "links": [
    {
      "rel": "children",
      "link": "/selections/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.sakkos.anzugsakkos).(~.(v.1)))/dynamic-paths/"
    }
  ]
}
```

How should the client be able to know that this relative URI belongs to the Firefly-API? There are solutions that include either implementing some logic on the client side with out-of-bond-Information. But actually we wanted to reduce the logic on the client side by providing HATEOAS, so this seems paradox.

We could also provide the different Base URIs somewhere in the payload, but why not use absolute URIs in the first place then? Also this would need some construction logic of URIs on the client side.

But even when the URIs are both absolute, as it is the case in this example, we are still running into problems. Shopoffice-Frontend-Services call the different Team-APIs via a proxy (the TRUDE-Proxy). This is necessary as the OTTO API just supports functional users, but the Shopoffice Users are OCN-Users. As the API-Teams do not want to validate two tokens (Otto API and Shopoffice Token), we needed to introduce some kind of proxy that handles the authorization of Shopoffice-Users.

Therefore we can not use the absolute URIs that are part of the response. Right now we extract the technical id, that is part of the response and construct the different URIs client sided. This should not be the preferred way.

A good solution would be, that the Teams providing an API supports the X-FORWARDED-HOST Header, so that the absolute URIs are rewritten and contain our proxy as hostname. If this shouldn't be possible for whatever reason, we need at least a technical id field in the payload, so that we are able to construct the URIs on the client side. We absolutely do not want to parse the IDs out of the links.

So when sending the X-Forwarded-Host-Header, the request will look like this:

```http
GET https://mc.develop.nav.cloud.otto.de/v1/page/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(~.(v.1)))/child/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.anzuege).(~.(v.1)))/live/1 HTTP/1.1
X-Forwarded-Host: trude.develop.shopoffice.cloud.otto.de
```

Matching the response:

```json
{
  "links": [
    {
      "rel": "children",
      "link": "https://trude.develop.shopoffice.cloud.otto.de/selections/(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.sakkos.anzugsakkos).(~.(v.1)))/dynamic-paths/"
    }
  ]
}
```

Another thing that Team Nav isn't aware of is, that we use the dreson provided in their payload to retrieve the configured entrypage of this NavigationItem from another API of FT3:

`https://config.develop.promo.cloud.otto.de/promo-config/timelineentries?dreson=(und.(ist.sortiment.bekleidung).(ist.zielgruppe.herren).(sind.kategorien.sakkos.anzugsakkos)&page=1&pageSize=1`

The intention of using relative/absolute URIs in HAL links is that the HAL response defines how the resource can be processed by others. More clearly, the API provider needs to have knowdledge about all workflows and processes of their clients regarding the request resource.

As shown in the example, it is very hard to consider every use case of the requested resource. Dreson is one example, but you could also think about Products. Some resources are so wildly spreaded in the EC-Infrastructure that you don't want to send every possible operation in your payload. Imagine how bloated the links section would get for APIs that work with Dreson or Products.

For this reason, the technical ID must be provided as a separate field, so that the client is able to reuse it without parsing the links.

## Conclusion

Absolute URIs are compatible to more use cases and relieve the client of the need to construct URIs. The should be preferred over relative URIs. But we have to keep in mind the edge cases of having a proxy between client and API and reusing the technical IDs.

Therefore the following two recommendations must be included in the documentation:

### **[MUST]** use absolute URLs for hyperlinks

### **[MUST]** support X-FORWARDED-HOST Header to support proxies in front of your origin server

### **[MUST]** contain an ID-field in the payload so that the client is able to construct the URI on it's own
