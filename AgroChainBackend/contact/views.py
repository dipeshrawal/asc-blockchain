from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAdminUser

class ContactAPIView(APIView):
    """
    APIView for handling contact submissions.
    """

    def get(self, request, *args, **kwargs):
        """
        Retrieve all contact inquiries. Typically, this is for admin purposes.
        """
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Handle the submission of a new contact form.
        Accessible to anyone.
        """
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

