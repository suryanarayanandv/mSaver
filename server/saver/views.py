from http import HTTPStatus
import json
from django.http import HttpResponse
from django.shortcuts import render
from scrap import generateMappingFile, findMatches
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def configure(request):
    if (request.method == "POST"):
        # GET the letter from the request body
        body = request.read().decode("utf-8")
        letters = json.loads(body)['letters']
        
        # Generating word-config/mappings.json
        status = generateMappingFile(letters)
        
        # Checking if the file was generated successfully
        if not status:
            return HttpResponse(status=HTTPStatus.INTERNAL_SERVER_ERROR)
        
        return HttpResponse(status=HTTPStatus.OK)

@csrf_exempt
def search(request):    
    body = request.read().decode("utf-8")
    word = json.loads(body)['word']
    payload = findMatches(word)

    if (payload == False):
        return HttpResponse(status=HTTPStatus.INTERNAL_SERVER_ERROR)

    return HttpResponse(payload)