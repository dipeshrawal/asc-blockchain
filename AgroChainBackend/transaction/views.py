from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer


class CustomerTransactionAPIView(APIView):
    """
    APIView for handling CRUD operations for Transaction.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all transactions or a single transaction by ID.
        """
        user = request.user

        
        if pk:
            try:
                transaction = Transaction.objects.get(pk=pk)
                # Ensure user has access
                if user.user_type == 'customer' and transaction.buyer != user:
                    return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
               
                serializer = TransactionSerializer(transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Transaction.DoesNotExist:
                return Response({"detail": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Filter transactions based on user type
            if user.user_type == 'customer':
                transactions = Transaction.objects.filter(buyer=user)
            else:
                transactions = Transaction.objects.filter(initiator=user)
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create a new transaction.
        """
        
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(initiator=request.user)  # Assuming `initiator` is the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


class DistributorTransactionAPIView(APIView):
    """
    APIView for handling CRUD operations for Transaction.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all transactions or a single transaction by ID.
        """
        
        if pk:
            try:
                transaction = Transaction.objects.get(pk=pk)
                # Ensure user has access
                
                serializer = TransactionSerializer(transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Transaction.DoesNotExist:
                return Response({"detail": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            
            transactions = Transaction.objects.filter.all()
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    

class RetailerTransactionAPIView(APIView):
    """
    APIView for handling CRUD operations for Transaction.
    """

    def get(self, request, pk=None, *args, **kwargs):
        """
        Retrieve all transactions or a single transaction by ID.
        """
        
        if pk:
            try:
                transaction = Transaction.objects.get(pk=pk)
                # Ensure user has access
                
                serializer = TransactionSerializer(transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Transaction.DoesNotExist:
                return Response({"detail": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            
            transactions = Transaction.objects.filter.all()
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    


class FarmerTransactionAPIView(APIView):
    """
    APIView for handling CRUD operations for Transaction.
    """
    def get(self, request, pk=None, *args, **kwargs):
            """
            Retrieve all transactions or a single transaction by ID.
            """
            
            if pk:
                try:
                    transaction = Transaction.objects.get(pk=pk)
                    # Ensure user has access
                    
                    serializer = TransactionSerializer(transaction)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except Transaction.DoesNotExist:
                    return Response({"detail": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)
            else:
                
                transactions = Transaction.objects.filter.all()
                serializer = TransactionSerializer(transactions, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)