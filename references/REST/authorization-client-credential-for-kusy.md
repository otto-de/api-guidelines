# Authorization - Client credentials for kusy

This page contains the protocol of a meeting regarding the possibility to create customer specific JWT-Tokens for Kusy.
The protocol contains information about the reasons why Kusy needs to use a customer unspecific JWT-Token (aka client credentials flow).

The meeting was held in german, therefore the protocol is also in german:

## Thema

Kusy verwendet im Moment den client_credentials flow, um einen JWT-Token zum Zugriff auf die APIs zu bekommen. Dieser JWT-Token ist nicht an einen bestimmten Kunden gebunden, sondern berechtigt für den Zugriff auf alle Kunden. In diesem Termin sollte geklärt werden, ob es möglich ist einen JWT-Token für Kusy auszustellen, welcher die Kundenindentifizierung (EC-UUID oder customerId) enthält.

### Teilnehmer

- Jens Fischer (FT1)
- Lucas Körner (Kusy)
- Stefan Katscher (Kusy)
- Sven Rudorff (Kusy)
- Marcus Münch (Identity)
- Aljoscha Dembowsky (ShoEn)
- Birgit Bader (API Crew)
- Thorsten Hake (API Crew)

### Datum

03.11.2022

## Randbedingungen

Aktuell gibt es keine technische Überprüfung in Kusy oder irgendeinem anderen System, ob ein RC-Mitarbeiter im Namen eines Kunden agieren darf. Dies wird über eine Arbeitsanweisung für die RC-Mitarbeiter geregelt.

## Diskutierte Lösungsvorschläge

### "on-behalf" auth flow

ShoEn implementiert einen eigenen nicht standartisierten "on-behalt" auth flow. Dieser würde es dem client erlauben die Identität eines Kundens anzunehmen, sodass die Kundenidentifizierung auch im JWT-Token kodiert wird.

Abgelehnt weil:

- Fehlender zentrale Identity Provider der regelt, ob ein RC Mitarbeiter die Identität eines Kundens annehmen darf.
- Unstandartisierter Flow. Mögliche Sicherheitsimplikationen sind nicht einfach abzusehen.

### Kundenconsent anhand von Identifikationsmerkmalen/Secrets

ShoEn implementiert einen speziellen consent mechanismus für Kusy. Hierbei muss der RC Mitarbeiter eine Reihe von Identifikationsmerkmalen/Secrets vom Kunden erfragen und diese in KUSY eintippen. Diese werden von Identity verifiziert und ShoEn interpretiert dies als "consent" wie im authorization code flow. Ein JWT-Token mit Kundenidentifizierung kann ausgestellt werden.

Abgelehnt weil:

- Abfrage von Identifikationsmerkmalen/Secrets ist fehleranfällig und verlängert die Kundenbearbeitung
- Keine Möglichkeit von Nachbearbeitungen im Auftrag des Kundens (ohne Kunden am Telefon)

## Ergebnis

Kusy wird weiterhin JWT-Token ohne Kundenbezug verwenden.

API Provider müssen anhand des JWT-Tokens erkennen, ob es sich um ein client credentials flow ("darf alles") oder einen authorization code flow ("darf nur das, was der hinterlegte Kunde darf") handelt. Ist der "client_id" claim in JWT-Token mit dem "sub" claim identisch, handelt es sich um einen JWT-Token der für einen client credentials flow ausgestellt wurde. Ansonsten handelt es sich um einen JWT-Token der mit einem authorization code flow ausgestellt wurde und der "sub"-claim enthält die Kundenidentifizierung (aktuell ec-uuid).
