OpenWire-API
========

The offical API of Openwire, a distributed newswire service. For more information, see [this post](https://medium.com/@PunkChameleon/introducing-openwire-in-pre-pre-alpha-e49dc1dc9d19).

All content generated from the service will be distributed freely and under [Creative Commons Attribution ShareAlike](http://creativecommons.org/licenses/by-sa/4.0/).

### Prerequites:
1. [Node](https://nodejs.org/en/).
2. A Twitter API key set.
3. A Parse API Key set.
2. The gusto of a thousands suns!

###

### To Run
1. Clone this repo
2. Place your respective keys into `lib/config.js` -- AKA [here](https://github.com/PunkChameleon/OpenWire-API/blob/master/lib/config.js). These are for getting localized twitter feeds and saving to a DB, respectively.
2. Run `npm install`
3. Run `node .`

This will run the service on port 5000.

### Pointing a UI
If you want to test this alongside a OpenWire UI instance, please visit that repo [here](https://github.com/PunkChameleon/OpenWire-UI), where it details how to do so. It utilizes the same prequisites as the API, and therefore should be very easy to get up and running (let us know if it isn't!)

### Feedback
Feedback is more than welcome! Please feel free to fork the repo and submit any PRs you believe improve the product. If you're not a coder, you can submit issues you find (either when running locally or on offical test site) as Github Issues, which are extremely helpful!

By the way, the first person who submits test wins +1000!

### License
Copyright (C) 2015 Nick Weingartner (http://www.github.com/PunkChameleon).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
