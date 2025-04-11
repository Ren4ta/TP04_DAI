import axios from "axios";
const APIKEY = "568b3ac0";  
const RESULT_PER_PAGE = 10; 
const OMDBSearchByPage = async (searchText, page = 1) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };


    try {
      const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
      const apiResponse = await axios.get(requestString);
  
      if (apiResponse.data.Response === "True") {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = apiResponse.data.totalResults;
        returnObject.datos = apiResponse.data.Search;
      } else {
        returnObject.respuesta = false;
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }

    return returnObject;

};


const OMDBSearchComplete = async (searchText) => {
  let returnObject = {}; 
  let currentPage = 1, maxPages, countResults;  
  let returnPageTemp; 
  
  returnPageTemp = await OMDBSearchByPage(searchText, currentPage); 
  countResults = returnPageTemp.cantidadTotal;  
  
  if(returnPageTemp.cantidadTotal <= RESULT_PER_PAGE) {
    returnObject = returnPageTemp; 
  } else {
    returnObject = returnPageTemp; 
  } 

  maxPages = Math.ceil(countResults / RESULT_PER_PAGE);  

  for (let currentPage = 2; currentPage <= maxPages; currentPage++) {
    returnPageTemp = await OMDBSearchByPage(searchText, currentPage);  
    returnObject.datos = returnObject.datos.concat(returnPageTemp.datos);  
  }

  return returnObject; 
};



const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : {}

    };


    try {
      const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
      const apiResponse = await axios.get(requestString);
  
      if (apiResponse.data.Response === "True") {
        returnObject.respuesta = true;
        returnObject.datos = apiResponse.data;
      } else {
        returnObject.respuesta = false;
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
    return returnObject;

};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};