from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from django.template import loader
# Create your views here.

from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView
from .models import basic_detail
from .serializers import basic_detailSerializer,student_detailSerializer,student_cohortDetailSerializer,student_namesDetailSerializer,WeeklyAttendanceSerializer

def index (request):
    return HttpResponse('Project Nebula is an innovative initiative by Azubi Africa, aiming to empower students with hands-on experience in cloud technology, problem solving, and portfolio development skills. This project offers a unique platform for the student to engage in a real-world project, enhancing their understanding and proficiency in tech domains.')


class Basic_detailListView(ListAPIView):
    queryset = basic_detail.objects.all()
    serializer_class = basic_detailSerializer

class Student_detailView(RetrieveUpdateDestroyAPIView):
    queryset = basic_detail.objects.all()
    serializer_class = student_detailSerializer
    lookup_field = 'slug' 



class Student_cohortDetailView(RetrieveUpdateDestroyAPIView):
    queryset = basic_detail.objects.all()
    serializer_class = student_cohortDetailSerializer
    lookup_field = 'slug' 

class Student_namesDetailView(ListAPIView):
    queryset = basic_detail.objects.all()
    serializer_class = student_namesDetailSerializer
    lookup_field = 'name' 

class WeeklyAttendanceView(RetrieveUpdateDestroyAPIView):
    queryset = basic_detail.objects.all()
    serializer_class = WeeklyAttendanceSerializer
    lookup_field = 'slug'

    def get_object(self):
        name = self.kwargs['slug']
        return self.queryset.get(slug=name)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        attd_val = instance.weekly_attendance_set.values()
        # Assuming you have a serializer for the attendance data
        serializer = self.serializer_class(attd_val, many=True)
        return Response(serializer.data)
    