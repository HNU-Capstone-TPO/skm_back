from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import User
from .serializer import UserSerializer


@api_view(['GET'])
def post_search(request):
    query = request.GET.get('name')
    if query:
        users = User.objects.filter(name__icontains=query)
    else:
        users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response({'results': serializer.data})


# react로 보낼때 테스트로 만들어본거
