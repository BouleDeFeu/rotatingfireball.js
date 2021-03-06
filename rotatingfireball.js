/* jslint browser: true, indent: 8, maxlen: 80 */

/*
 * Copyright (c) 2014 Tristan Le Guern <tleguern@bouledef.eu>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var glrad = 0.0;

function $(id) {
	"use strict";
	return document.getElementById(id);
}

function rotatingFireballGetFavicon() {
	"use strict";
	var app, a;

	app = document.getElementsByTagName("link");
	for (a = 0; a < app.length; a = a + 1) {
		if (app[a].rel === "icon") { // :)
			return app[a];
		}
	}
	return null;
}

function rotatingFireballInit() {
	"use strict";
	var canvas, div, img;

	canvas = document.createElement('canvas');
	div = document.createElement('div');
	img = document.createElement('img');

	canvas.setAttribute("id", "render");
	canvas.setAttribute("width", "16px");
	canvas.setAttribute("height", "16px");
	div.style.visibility = "hidden";
	div.style.display = "none";
	img.setAttribute("id", "bouledefeu");
	img.setAttribute("src", "data:image/png;base64," +
	     "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAA" +
	     "QAABILAAASCwAAAAAAAAAAAACW0ZkAltGZAJbRmQCW0ZkAltGZAJbRmQAA" +
	     "AP//AAD//wAA//8AAP//ltGZAJbRmQCW0ZkAltGZAJbRmQCW0ZkAltGZAJ" +
	     "bRmQCW0ZkAltGZAJbRmQAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//" +
	     "ltGZAJbRmQCW0ZkAltGZAJbRmQCW0ZkAltGZAJbRmQAAAP//AAD//wAA//" +
	     "8AAP//AAD//wAA//8AAP//AAD//wAA//+W0ZkAltGZAJbRmQCW0ZkAltGZ" +
	     "AJbRmQAAAP//AAD//wAA//8AAP//AJH//wCR//8Akf//AAD//wAA//8AAP" +
	     "//AAD//5bRmQCW0ZkAltGZAJbRmQAAAP//AAD//wAA//8Amv//AJr//wCa" +
	     "//8Amv//AJr//wCR//8AAP//AAD//wAA//8AAP//ltGZAJbRmQAAAP//AA" +
	     "D//wAA//8AAP//AJr//////////////////wCa//8Akf//AAD//wAA//8A" +
	     "AP//AAD//5bRmQAAAP//AAD//wAA//8Amv//AJr///////////////////" +
	     "////8Amv//AJH//wAA//8AAP//AAD//wAA//+W0ZkAAAD//wAA//8AAP//" +
	     "AJr///////////////////////8Amv//AJr//wCa//8AAP//AAD//wAA//" +
	     "8AAP//AAD//wAA//8AAP//AJr///////////////////////8Amv//AAD/" +
	     "/wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wCa//////" +
	     "////////////8Amv//AJr//wAA//8AAP//AAD//5bRmQCW0ZkAAAD//wAA" +
	     "//8AAP//AAD//wAA//8Amv//////////////////AJr//wCa//8AAP//AA" +
	     "D//wAA//+W0ZkAltGZAAAA//8AAP//ltGZAAAA//8AAP//AJr/////////" +
	     "/////////wCa//8Amv//AAD//wAA//+W0ZkAltGZAAAA//8AAP//AAD//5" +
	     "bRmQAAAP//AAD//wAA//8Amv//AJr//wAA//8AAP//AAD//wAA//8AAP//" +
	     "ltGZAAAA//8AAP//AAD//5bRmQCW0ZkAAAD//wAA//8AAP//AJr//wCa//" +
	     "8AAP//AAD//wAA//8AAP//AAD//5bRmQAAAP//AAD//5bRmQCW0ZkAltGZ" +
	     "AJbRmQAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//5bRmQCW0Z" +
	     "kAltGZAAAA//8AAP//ltGZAJbRmQCW0ZkAltGZAAAA//8AAP//AAD//wAA" +
	     "//8AAP//AAD//5bRmQCW0ZkAltGZAJbRmQCW0ZkAAAD//wAA//+W0ZkA/D" +
	     "8AAPgPAADwBwAA4AMAAMABAACAAQAAAAEAAAAAAAAAAAAAABgAAAAZAAAA" +
	     "MQAAACMAAAAnAACAcwAAwPkAAA==");
	canvas.appendChild(img);
	div.appendChild(canvas);
	document.body.appendChild(div);
}

function rotatingFireballDrawImage(img, x, y, width, height, rad) {
	"use strict";
	var ctx, icon, newIcon;

	ctx = $('render').getContext('2d');
	icon = rotatingFireballGetFavicon();
	newIcon = icon.cloneNode(true);

	ctx.clearRect(0, 0, 16, 16);
	//Set the origin to the center of the image
	ctx.translate(x + width / 2, y + height / 2);
	//Rotate the canvas around the origin
	ctx.rotate(rad);
	//draw the image    
	ctx.drawImage(img, width / 2 * -1, height / 2 * -1, width, height);
	//reset the canvas  
	ctx.rotate(rad * -1);
	ctx.translate((x + width / 2) * -1, (y + height / 2) * -1);

	newIcon.setAttribute('href', ctx.canvas.toDataURL());
	icon.parentNode.replaceChild(newIcon, icon);
}

function rotatingFireballRotate() {
	"use strict";
	if (glrad !== 7.0) {
		glrad += 0.2;
	} else {
		glrad = 0.0;
	}
	rotatingFireballDrawImage($('bouledefeu'), 0, 0, 16, 16, glrad);
}

rotatingFireballInit();
setInterval(rotatingFireballRotate, 50);
