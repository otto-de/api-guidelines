# Hypermedia

In a system with many distributed resources connected by HTTP links, it is important to provide the client with the current state of the application from the resources of our REST interface.
What's more, we transmit all possible state transitions to the client in the form of links.In addition to the need of resource links we establish a consistent JSON response format with the goal of increasing productivity and efficiency.
Instead of spending valuable time developing different own formats we will adopt conventions from an existing format and extend where required.