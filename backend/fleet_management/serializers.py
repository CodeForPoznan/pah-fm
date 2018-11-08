from rest_framework import serializers

from .models import User, Project


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'project_title',
            'project_description',
            'routes',
        )
