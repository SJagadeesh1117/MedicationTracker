from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"^ws/guardian/(?P<guardian_id>[A-Za-z0-9_-]+)/$", consumers.GuardianConsumer.as_asgi()),
]
