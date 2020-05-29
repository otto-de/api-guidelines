# Scope of OTTO API

The terms "private" and "public" do not describe the current focus of the API at OTTO. Unclear definitions frequently lead to differences and misunderstandings. This document is intended to strengthen the understanding of the scope of our API.

## Private API

Private APIs are usually developed to enable process automation and internal communication of different services. It is all about the integration capability of functionalities within a company. They probably form by far the largest group of APIs.

As the term suggests, the possible usage scenarios are limited to internal use.

## Public API

The main focus of a public API is business expansion through unpredictable partners.
The differentiation between open and commercial API is also important. An open API encourages anonymous users to experiment with the company's internal assets. However, this approach is not in OTTO's corporate focus. Our core business is trading goods and operating a trading platform.

Operating a public API imposes special operational requirements on monitoring, status pages, maintenance, stability, rate limiting, endpoint protection, KPIs and usage reports.

## Partner API

A partner API is an in-between solution of private and public API. The operational and organisational requirements such as guidelines, governance, documentation and stability are similar to those of a public API.
The scope, level of detail and content of the endpoints are not intended for public or anonymous use. Access to data and company assets is only granted to selected and predictable partners. This approach enables a targeted and managed development of API clients and products.

## Characteristics of an API

Basically APIs can be described with the following attributes:

<table>
    <tr>
        <td><b>public</b></td>
        <td>no network access restrictions, world-wide reachable</td>
    </tr>
    <tr>
        <td><b>private</b></td>
        <td>network access restrictions, e.g. firewall or egress SecurityGroups required</td>
    </tr>
    <tr>
        <td><b>open</b></td>
        <td>no authorization/authentication required, anonymous access</td>
    </tr>
    <tr>
        <td><b>closed</b></td>
        <td>auth required, different scopes for fine-grained permissions</td>
    </tr>
    <tr>
        <td><b>published</b></td>
        <td>SLAs apply, like versioning/changelog and docs processes established</td>
    </tr>
    <tr>
        <td><b>internal</b></td>
        <td>less strict SLAs, like no versioning/changelog or docs processes established</td>
    </tr>
</table>

## OTTO API

The term "OTTO API" largely corresponds to the definition of a partner API. It corresponds to the characteristics **public**, **closed** and **published**. In the OTTO context, however, the term "Partner API" has a different meaning.

For this reason, the term **"OTTO API "** will be used in official communication in the future.
