const fetch = require('node-fetch');

async function getBulbs() {
 
	const getData = await fetch("https://api.lifx.com/v1/lights/all", {headers: {Authorization: `Bearer ${process.env.LIFX_TOKEN}`}})
        .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(response => {
        const bulbs = []
      console.log(response);
	 response.forEach((bulb) => {
  	   bulbs.push(bulb.label);
	});
	 return(`${bulbs}`)

    })
    .catch(error => {
      console.log(error);
    });
	return getData;
	console.log(getData);
}


module.exports = {
	getBulbs
}
