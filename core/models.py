from django.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.db import models

# Create your models here.

# Marcador: Propiedad cpval



class Propiedad(models.Model):
    id_prop = models.CharField(primary_key = True, verbose_name='id', max_length= 20000 ,default= '1')
    dormitorio = models.IntegerField(default=1, verbose_name= 'dormitorio')
    bano = models.IntegerField(default= 1 , verbose_name= 'baños')
    estacionamiento = models.IntegerField(default=1 ,verbose_name='Estacionamiento')
    comuna = models.IntegerField(default=1 ,verbose_name='Comuna')
    area_total = models.DecimalField(max_digits=8, decimal_places=2, verbose_name= 'Area total')
    area_construida = models.DecimalField(max_digits=8, decimal_places=2, verbose_name= 'Area construida')
    longitude = models.DecimalField(verbose_name="Longitude", max_digits=16, decimal_places=16)
    latitude = models.DecimalField(verbose_name="Latitude", max_digits=16, decimal_places=16)
    condicion = models.IntegerField(default= 1 , verbose_name= 'Condicion')
    resultado = models.CharField(default='3000',max_length= 3000 ,verbose_name='Precio tasado')
    

    class Meta:
        verbose_name = "Propiedad"
        verbose_name_plural = "Propiedades"

    def __str__(self):
        return "lat: {}, lng: {}".format(self.latitude, self.longitude)

    def __sub__(self, other_coordinates):
        return abs(other_coordinates.latitude - self.latitude) + abs(other_coordinates.longitude - self.longitude)

    def __eq__(self, other):
        return self.latitude == other.latitude and self.longitude == other.longitude

    def __ne__(self, other):
        return not self.__eq__(other)
 

    

    



# Modelo Sectorización
class Area (models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    area = models.GeometryField(verbose_name="Área", null=True)
    ubicacion = models.CharField(max_length=200, verbose_name="Ubicación", null= True)

    class Meta:
        verbose_name = "area"
        verbose_name_plural = "areas"

    def __str__(self):
        return self.nombre 
