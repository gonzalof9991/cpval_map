""" from django.shortcuts import render

from core.models import Propiedad

# Create your views here.


def index(request):

    props = Propiedad.objects.all()
    return render(request,"core/base.html",{'props':props})  """




import json
from django.conf import settings
from django.core.serializers import serialize
from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.shortcuts import redirect
#from .filters import MarkerFiltro


from .models import Area , Propiedad 





class AreaMapView(TemplateView):
    # Area map view.

    template_name = "core/index.html"

    def get_context_data(self, **kwargs):

        propiedades = Propiedad.objects.all()
        # Return the view context data
        context = super().get_context_data(**kwargs)
        context["areas"] = json.loads(serialize("geojson", Area.objects.all()))
        return context 


