//Fills a div with the class .write-ehader with the site header
document.querySelector(".write-header").innerHTML = `
    <header>
    <h1>Sundowner</h1>
    <nav>
      <ul>
        <li><a href="../index.html">About</a></li>
        <li><a href="gallery.html?page=1">Gallery</a></li>
        <li><a href="comic-index.html">Index</a></li>
        <li><a href="artist.html">Artist</a></li>
      </ul>
    </nav>
  </header>
`;

/**
 * Parse a given url for a page query term and associated value
 * @param {*} url 
 * @returns 
 */
export function pageFromURL(url){
  const page = findGetParameter(url, "page");
  if (!page){
      throw new Error ("Unable to parse parameter 'page' from url.");
  }

  const pageNum = Number(page)

  if(!pageNum || page <= 0 || page > pageData.length){
      throw new Error('Page ' + page + ' does not exist.');
  }
  return pageNum;
}

/**
 * General function for parsing a given query paramater and value from
 * a url
 * @param {*} url 
 * @param {*} parameterName 
 * @returns 
 */
export function findGetParameter(url, parameterName){
  let result = null;
  let item = url.search.substr(1);
  //let items = location.search.substr(1).split("&");
  let tmp = item.split("=");
  if (tmp[0] === parameterName) result = tmp[1]; //decodeURIcomponent(tmp[1])

  return result;
}