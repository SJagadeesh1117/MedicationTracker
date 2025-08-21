import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GuardianConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print(f"🔔 Incoming WebSocket: {self.scope['path']} with kwargs {self.scope['url_route']['kwargs']}")
            self.guardian_id = self.scope['url_route']['kwargs']['guardian_id']
            self.group_name = f"guardian_{self.guardian_id}"

            await self.channel_layer.group_add(self.group_name, self.channel_name)
            print(f"✅ Added to group {self.group_name}")
            await self.accept()
        except Exception as e:
            print(f"❌ Error in connect: {e}")
            await self.close()

    async def disconnect(self, close_code):
        # Leave group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive messages from group
    async def send_update(self, event):
        print("🔔 Received update in GuardianConsumer:", event["content"])
        await self.send(text_data=json.dumps(event["content"]))




