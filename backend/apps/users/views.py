from rest_framework import generics, status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone
import uuid

from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    ChangePasswordSerializer, PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
from .permissions import IsStudentOrAdmin, IsTeacherOrAdmin

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register/
    Register a new user account.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'message': 'Registration successful.',
        }, status=status.HTTP_201_CREATED)

class LoginView(views.APIView):
    """
    POST /api/v1/auth/login/
    Authenticate user and return JWT tokens.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user.last_seen = timezone.now()
        user.is_online = True
        user.save(update_fields=['last_seen', 'is_online'])
        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'message': 'Login successful.',
        })

class LogoutView(views.APIView):
    """
    POST /api/v1/auth/logout/
    Blacklist refresh token and set user offline.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            pass
        request.user.is_online = False
        request.user.save(update_fields=['is_online'])
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_205_RESET_CONTENT)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    GET/PUT/PATCH /api/v1/auth/profile/
    Retrieve or update the authenticated user's profile.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ChangePasswordView(views.APIView):
    """
    POST /api/v1/auth/change-password/
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'message': 'Password changed successfully.'})

class PasswordResetRequestView(views.APIView):
    """
    POST /api/v1/auth/password-reset/
    Request a password reset email.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
            token = str(uuid.uuid4())
            user.password_reset_token = token
            user.password_reset_token_expires = timezone.now() + timezone.timedelta(hours=1)
            user.save(update_fields=['password_reset_token', 'password_reset_token_expires'])
            # TODO: Send email with reset link
        except User.DoesNotExist:
            pass  # Security: don't reveal if user exists
        return Response({'message': 'If that email is registered, you will receive a reset link.'})

class PasswordResetConfirmView(views.APIView):
    """
    POST /api/v1/auth/password-reset/confirm/
    Confirm a password reset using a token.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        try:
            user = User.objects.get(password_reset_token=token)
            if user.password_reset_token_expires < timezone.now():
                return Response({'error': 'Reset token has expired.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.password_reset_token = None
            user.password_reset_token_expires = None
            user.save()
            return Response({'message': 'Password reset successfully.'})
        except User.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

class FirebaseLoginView(views.APIView):
    """
    POST /api/v1/auth/firebase-login/
    Exchange a Firebase ID token for a Django JWT access and refresh token.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        firebase_token = request.data.get('token')
        if not firebase_token:
            return Response({'error': 'Firebase token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        from .firebase_auth import verify_firebase_token
        decoded_token = verify_firebase_token(firebase_token)
        
        if not decoded_token:
            return Response({'error': 'Invalid or expired Firebase token.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Get user details from Firebase token
        email = decoded_token.get('email')
        uid = decoded_token.get('uid')
        name = decoded_token.get('name', '')
        
        if not email:
            return Response({'error': 'Email not found in Firebase token.'}, status=status.HTTP_400_BAD_REQUEST)

        # Find or create user
        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email.split('@')[0] + '_' + uid[:5],
            'first_name': name.split(' ')[0] if name else '',
            'last_name': ' '.join(name.split(' ')[1:]) if name else '',
            'is_email_verified': decoded_token.get('email_verified', False),
            'role': 'student', # Default role
        })

        if created:
            user.set_unusable_password()
            user.save()

        # Update last seen
        user.last_seen = timezone.now()
        user.is_online = True
        user.save(update_fields=['last_seen', 'is_online'])

        # Generate Django JWT tokens
        tokens = get_tokens_for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'message': 'Login successful.',
            'is_new_user': created
        })

class UserListView(generics.ListAPIView):
    """
    GET /api/v1/auth/users/
    List all users (admin only).
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        qs = super().get_queryset()
        role = self.request.query_params.get('role')
        if role:
            qs = qs.filter(role=role)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(username__icontains=search) | qs.filter(email__icontains=search)
        return qs
