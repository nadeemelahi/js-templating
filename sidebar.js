/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 *
 */

"use strict";

new function(){

	var rootPath = "./" , 
		pathLen ;

	// url
	new function(){

		var idx,
			currPath = [],
			currPath = (location.pathname).split("/") ;

		pathLen = currPath.length;

		if ( pathLen == 2 ) {

			rootPath = "./";

		} else {
			rootPath = "";

			for ( idx = 3 ; idx <= pathLen ; idx++ ){

				rootPath += "../";
			}
		}

		// check currPath to see if sRootPath = "/" or "/pg" path
		//if( pathLen == 2 ) rootPath = "./"; // "./";
		//else if( pathLen == 3 ) rootPath = "../"; // "../";
		//else if( pathLen == 4 ) rootPath = "../../"; // "../../"


	};

	// document.head
	new function(){

		var linkStyle = document.createElement("link") ,
			linkFav = document.createElement("link") ;

		linkStyle.rel = "stylesheet";
		linkStyle.href = rootPath + "sidebar.css";

		linkFav.rel = "icon";
		linkFav.type = "image/x-icon";
		linkFav.href = rootPath + "favicon.ico";

		document.head.appendChild(linkStyle);
		document.head.appendChild(linkFav);

	};

	// load sidebar.js

	loadSidebar( 
		(location.pathname.slice(1)) 
		, rootPath 
		, pathLen 
	);
};


function loadSidebar( currPath , relPath , pathLen ){

	var sidebarHTML = document.createElement("iframe");
	sidebarHTML.style.display = "none";
	document.body.appendChild(sidebarHTML);

	var idx, jdx, kdx,
		idoc, 
		sidebarWrap, 
		headerImg, 
		hrefs = [], 
		linksCnt; 
	
	sidebarHTML.onload = function ( ) {
		//console.log("sidebar iframe loaded");

		idoc = this.document 
			|| this.contentDocument
			|| this.contentWindow.document;
		
		sidebarWrap = idoc.getElementById("sidebarWrap");

		hrefs = idoc.querySelectorAll("a");
		linksCnt = hrefs.length;
	
		
		headerImg = idoc.querySelector("#sidebarHeader > img");

		var rootPath, 
			hrefSplit = [], hrefLen , 
			updatedHref;

		currPath = relPath + currPath;

		// skip email: and tel: last 2 hrefs
		for ( idx = 0 ; idx < (linksCnt - 2) ; idx++ ) {


			hrefSplit = ( hrefs[ idx ].href ).split("/");
			
			hrefLen = hrefSplit.length;
			
			updatedHref = relPath;

			for ( jdx = 3 ; jdx < (hrefLen - 1) ; jdx ++ ){

				updatedHref += hrefSplit[ jdx ] + "/";

			}

			updatedHref += hrefSplit[ jdx ] ;

			//console.log(currPath , updatedHref);

			hrefs[ idx ].href = updatedHref;

			if ( currPath == updatedHref ) {

				hrefs[ idx ].id = "activeLinkSidebar";

			}

			// home page is set to panning lamp
			if ( updatedHref == "./blender/panning-lamp/index.html" ) {
				//console.log( hrefs[1] );
				hrefs[ idx ].id = "activeLinkSidebar";
			}



		}

		//console.log("----");


		//console.log(headerImg.src);
		var srcSplit = [], srcLen, updatedSrc;

		srcSplit = ( headerImg.src ).split("/");
		srcLen = srcSplit.length;

		updatedSrc = relPath;

		for ( jdx = 3 ; jdx < (srcLen - 1) ; jdx ++ ){

			updatedSrc += srcSplit[ jdx ] + "/";
		}

		updatedSrc += srcSplit[ jdx ] ;

		//console.log(updatedSrc);

		headerImg.src = updatedSrc;

		document.body.insertBefore( sidebarWrap, document.body.firstChild ) ;

		sidebarReady();
	};

	sidebarHTML.src = relPath + "sidebar.html";
};

function sidebarReady(){

	var sidebar_isInview = 0;

	var sidebarDiv = document.getElementById("sidebarDiv");

	document.body.addEventListener("click", cb, false);
	function cb ( evt ) {
		if ( ! evt ) var evt = window.event;
		//console.log( evt.target );
		if ( evt.target.id == "sidebarBtn" ) {

			sidebarDiv.style.left = "0px";
			sidebar_isInview = 1;

		} else if ( evt.target.id == "sidebarCloseBtn" ) {

			sidebarDiv.style.left = "-225px";
			sidebar_isInview = 1;
			
		} else if ( evt.target.id == "sidebarDiv"
			|| evt.target.parentNode.id == "sidebarDiv" 
			|| evt.target.parentNode.parentNode.id == "sidebarDiv" 
			|| evt.target.parentNode.parentNode.parentNode.id == "sidebarDiv" ){

			//console.log("sidebar link click");
			
		} else if ( sidebar_isInview ) {

			sidebarDiv.style.left = "-300px";
			sidebar_isInview = 1;
		}

	}
};

