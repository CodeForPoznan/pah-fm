from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from fleet_management.constants import Groups
from fleet_management.factories import UserFactory, ProjectFactory


class ProjectsApiTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("projects")
        self.user = UserFactory.create(
            groups=[Group.objects.get(name=Groups.Driver.name)]
        )
        self.projects = ProjectFactory.create_batch(size=3, country=self.user.country)

    def test_401_for_unlogged_user(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_projects(self):
        self.client.force_login(self.user)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(self.projects), len(res.data))
        for idx, project in enumerate(sorted(res.data, key=lambda p: p["id"])):
            self.assertEqual(project["id"], self.projects[idx].id)
            self.assertEqual(project["title"], self.projects[idx].title)
            self.assertEqual(project["description"], self.projects[idx].description)
