from django.contrib import admin
from import_export import resources # Import export
from .models import * # Importa todos los modelos 
from import_export.admin import ImportExportModelAdmin
# Register your models here.
from django.contrib.gis.admin import OSMGeoAdmin # Importa OSMGEOadmin


#exportar

class PropiedadResourse(resources.ModelResource):
    class Meta: 
        model = Propiedad
        fields = ('id_prop','dormitorio','bano','estacionamiento','comuna','area_total','area_construida','longitude','latitude','condicion','resultado')


class AreaResource(resources.ModelResource):
    class Meta:
        model = Area
        fields = ('id','nombre','area','ubicacion')


# Interfaz para crear areas desde el usuario admin , utilizando OSMGEOADMIN para marcar en el mapa
@admin.register(Area)
class AreaAdmin(ImportExportModelAdmin,OSMGeoAdmin):

    default_lat = -3900984.09901
    default_lon = -7945309.20784
    default_zoom = 12
    list_display =('nombre', 'ubicacion')
    search_fields = ["nombre"]
    list_per_page = 30
    resource_class = AreaResource


@admin.register(Propiedad)
class PropiedadAdmin(ImportExportModelAdmin,OSMGeoAdmin):

    default_lat = -3900984.09901
    default_lon = -7945309.20784
    default_zoom = 12
    list_display = ('id_prop', 'comuna', 'latitude','longitude')
    search_fields = ["id"]
    list_per_page = 30
    resource_class = PropiedadResourse




#admin.site.register(Propiedad)
#admin.site.register(Area)

admin.site.site_header = 'Administrador App CPVAL'
admin.site.site_title = 'Administración APP CPVAL'
