from http import HTTPStatus
import json
from django.http import HttpResponse
from django.shortcuts import render
from scrap import findMatches, fetchWords
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def configure(request):
    if (request.method == "POST"):
        # GET the letter from the request body
        body = request.read().decode("utf-8")
        MAPPINGS = fetchWords(json.loads(body)['letter'])
        
        with open("mappings.json", "w") as f:
            json.dump(MAPPINGS, f)
        
        return HttpResponse(HTTPStatus.OK)

@csrf_exempt
def search(request):
    with open("mappings.json", "r") as f:
        MAPPINGS = json.load(f)
    
    body = request.read().decode("utf-8")
    payload = findMatches(json.loads(body)['word'], MAPPINGS)
    print(payload)
    return HttpResponse(payload)