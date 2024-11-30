from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SmartContract
from .serializers import SmartContractSerializer


class CustomerSmartContractAPIView(APIView):
    """
    APIView for handling CRUD operations for SmartContract.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all contracts or a single contract by ID.
        """
        if pk:
            try:
                contract = SmartContract.objects.get(pk=pk)
                serializer = SmartContractSerializer(contract)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SmartContract.DoesNotExist:
                return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)
        
        contracts = SmartContract.objects.all()
        serializer = SmartContractSerializer(contracts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class DistributorSmartContractAPIView(APIView):
    """
    APIView for handling CRUD operations for SmartContract.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all contracts or a single contract by ID.
        """
        if pk:
            try:
                contract = SmartContract.objects.get(pk=pk)
                serializer = SmartContractSerializer(contract)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SmartContract.DoesNotExist:
                return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Filter contracts involving the user
            
            contracts = SmartContract.objects.all()
            serializer = SmartContractSerializer(contracts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    


    def patch(self, request, pk=None, *args, **kwargs):
        """
        Partially update a contract by ID.
        """
        try:
            contract = SmartContract.objects.get(pk=pk)
        except SmartContract.DoesNotExist:
            return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)

        
        serializer = SmartContractSerializer(contract, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class RetailerSmartContractAPIView(APIView):
    """
    APIView for handling CRUD operations for SmartContract.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all contracts or a single contract by ID.
        """
        if pk:
            try:
                contract = SmartContract.objects.get(pk=pk)
                serializer = SmartContractSerializer(contract)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SmartContract.DoesNotExist:
                return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            
            contracts = SmartContract.objects.all()
            serializer = SmartContractSerializer(contracts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


    def patch(self, request, pk=None, *args, **kwargs):
        """
        Partially update a contract by ID.
        """
        try:
            contract = SmartContract.objects.get(pk=pk)
        except SmartContract.DoesNotExist:
            return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)

        
        serializer = SmartContractSerializer(contract, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


class FarmerSmartContractAPIView(APIView):
    """
    APIView for handling CRUD operations for SmartContract.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all contracts or a single contract by ID.
        """
        if pk:
            try:
                contract = SmartContract.objects.get(pk=pk)
                serializer = SmartContractSerializer(contract)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SmartContract.DoesNotExist:
                return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            contracts = SmartContract.objects.all()
            serializer = SmartContractSerializer(contracts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create a new contract.
        """
        serializer = SmartContractSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Assuming `initiator` is the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk=None, *args, **kwargs):
        """
        Partially update a contract by ID.
        """
        try:
            contract = SmartContract.objects.get(pk=pk)
        except SmartContract.DoesNotExist:
            return Response({"detail": "Contract not found."}, status=status.HTTP_404_NOT_FOUND)

        
        serializer = SmartContractSerializer(contract, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    