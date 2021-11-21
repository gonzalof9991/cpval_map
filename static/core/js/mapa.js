let map = L.map('map').setView([-33.03954315, -71.5554657], 15);
let geocoder = L.Control.geocoder({
    defaultMarkGeocode: true
}).addTo(map);


L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    //maxZoom: 5
}).addTo(map);

// Trae los datos desde el html y luego creamos una variable const areas donde estan los datos de la bd
const areas = JSON.parse(document.getElementById('areas-data').textContent);


// Color de zonas
var myStyle = {
    /* "color": "#565452",
    "stroke": "true",
    "fill": "true",
    "fillColor": "green",
    "fillOpacity": 0.1, */
    "weight": 2,
    "opacity": 0.5
};
console.log(areas);
// Recorre cada feature y en cada uno agrega un bindPopup (Mensaje de ventana)
let feature = L.geoJSON(areas, { style: myStyle }).bindPopup(function(layer) { return `
    <h5><b>Informacion Zona</b></h5>
    
    <div class="field-item" title="Nombre">
                <i class="fa fa-map-marker" aria-hidden="true"> <b> ${layer.feature.properties.nombre}</b></i>
    </div>    
       
        
    <div class="field-item" title="Ubicacion">
                 <i class="fa fa-globe" aria-hidden="true"> <b> ${layer.feature.properties.ubicacion}</b></i>
    </div>  
       
   
   


` }).addTo(map);



//                                     Traer con un GET datos desde BD


// Api base de datos
const getPropiedad = async() => {
    var token = 'Token e408801235a469cef840684af3e3b5cab7b599bd';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    try {
        let response = await fetch('http://127.0.0.1:8000/api/lista_propiedades', requestOptions)

        let responseJSON = await response.json();
        console.log('responseJSON');
        return responseJSON;

    } catch (error) {
        console.log(error);
        return false;
    }
};

// Trae todos los datos de la BD desde la api rest creada
const traerDatos = async() => {
    const data = await getPropiedad();

    //console.log(usuarios);
    marcarMapa(data);

}



// Marcar mapa con propiedades

function marcarMapa(p) {

    let prop = p // Trae la data de la api y la guarda en la variable prop
    let latitud = prop.map(x => { // Convierte la propiedad latitud (string) en Numero 
        let lt = Number(x.latitude)
        return lt;
    });
    let longitud = prop.map(x => { // Convierte la propiedad longitud (string) en Numero 
        let lng = Number(x.longitude)
        return lng;
    });

    for (i = 0; i < prop.length; i++) {


        // Declaracion de variables para ventana emergente
        let dorm = prop[i].dormitorio;
        let banos = prop[i].bano;
        let estac = prop[i].estacionamiento;
        let comuna = prop[i].comuna;
        let areaT = prop[i].area_total;
        let areaC = prop[i].area_construida;
        // let tipoP = prop[i].tipo_propiedad;
        let condicion = prop[i].condicion;
        let precioT = prop[i].resultado;
        precioT = precioT.split('[')[1];
        precioT = precioT.split(']')[0];
        Number(precioT);
        let precioCLP = 0;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        })

        precioCLP = 30565 * Math.round(precioT);
        formatter.format(precioCLP);


        // Condicion para saber el tipo de propiedad 
        /* let tipoIcon = '';
        if (prop[i].tipo_propiedad == 0) {
            tipoPropiedad = 'Casa';
            tipoIcon = 'https://cdn-icons-png.flaticon.com/128/619/619034.png'
        } else {
            tipoPropiedad = 'Departamento';
            tipoIcon = 'https://cdn-icons-png.flaticon.com/128/1570/1570970.png'

        } */

        // Condicion para saber la comuna de la propiedad
        switch (prop[i].comuna) {
            case 0:
                comuna = 'Concón';
                break;
            case 1:
                comuna = 'Limache';
                break;
            case 2:
                comuna = 'Quillota';
                break;
            case 3:
                comuna = 'Quilpué';
                break;
            case 4:
                comuna = 'Valparaíso';
                break;
            case 5:
                comuna = 'Villa Alemana';
                break;
            case 6:
                comuna = 'Viña del Mar';
                break;

        }
        // Condicion para saber el estado de la propiedad
        switch (prop[i].condicion) {
            case 0:
                condicion = 'Nueva';
                break;
            case 1:
                condicion = 'Usada';
                break;
            case 2:
                condicion = 'Remodelada';
                break;
        }


        let iconM = L.icon({
            iconUrl: 'https://cdn.iconscout.com/icon/free/png-64/map-pin-1452950-1227762.png',
            iconSize: [20, 20],
            iconAnchor: [15, -10] // la posicion donde se mostrara la ventana emergente
        })


        const marker = L.marker([latitud[i], longitud[i]], { icon: iconM })
            .addTo(map)
            .on('click', function() {
                this.bounce(1) // cantidad de veces que saltara
                    .on('bounceend', function() {

                    });
            });
        marker.bindPopup(
            `
            <h5><b>Informacion Propiedad</b> </h5>
            <div class = "row row-vent">
                <div class ="col">
                    <div class="field-item" title="Dormitorios">
                        <i class="fa fa-bed" aria-hidden="true"> <b class = "b"> ${dorm} </b></i>
                    </div>
                </div>
                <div class ="col">
                    <div class="field-item" title="Baños">
                        <i class="fa fa-bath" aria-hidden="true"> <b class = "b"> ${banos} </b></i>
                    </div>
                </div>
                <div class ="col">
                    <div class="field-item" title="Estacionamientos">
                        <i class="fa fa-car" aria-hidden="true"> <b class = "b" > ${estac}</b></i>
                    </div>
                </div>

            </div>
            <div class = "row row-vent" >
                <div class = "col" >
                        <div class="field-item" title="Superficie construida m2">
                            <i class="fa fa-area-chart" aria-hidden="true"> <b class = "b"> ${areaC}</b></i>
                        </div>
                </div>

                <div class = "col" >
                        <div class="field-item" title="Superficie total m2">
                            <i class="fa fa-area-chart" aria-hidden="true"> <b class = "b">${areaT}</b></i>
                        </div>
                </div>

                <div class = "col" >
                        <div class="field-item" title="Condicion">
                            <i class="fa fa-info" aria-hidden="true"> <b> ${condicion}</b></i>
                        </div>
                </div>
            
            </div>


            <div class = "row row-vent" >
                <div class = "col" >
                    <div class="field-item" title="Comuna">
                        <i class="fa fa-map-marker" aria-hidden="true"><b class = "b" >${comuna}</b></i>
                    </div>
                </div>

                <div class = "col" >
                    <div class="field-item" title="Tasacion UF">
                         <i class="fa fa-bar-chart" aria-hidden="true"><b class = "b">${precioT} UF</b></i>
                     </div>
                </div>            
            </div>

            
           

            
            
           
           `



        ).openPopup();



    }

}

traerDatos();