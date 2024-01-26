import google.generativeai as palm
from django.conf import settings
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(settings.BASE_DIR, "bard-ai-390007-ab320546d370.json")

palm.configure(api_key=settings.PAML_API_KEY)

def get_response(prompt):
    response = palm.chat(messages=prompt)
    print(response)
    return response.last