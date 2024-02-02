from rest_framework import serializers
from .models import basic_detail,weekly_attendance

class basic_detailSerializer(serializers.ModelSerializer):
    class Meta:
        model = basic_detail
        # fields = ['student_id','name','email','attendace_average','assignment_completion','ranking','cohort','slug' ]
        fields = '__all__'

class student_detailSerializer(serializers.ModelSerializer):
    class Meta:
        model = basic_detail
        # fields = ['student_id','name','email','attendace_average','assignment_completion','ranking','cohort','slug' ]
        fields = '__all__'

class student_cohortDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = basic_detail
        fields = ['cohort']
        # fields = '__all__'

class student_namesDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = basic_detail
        fields = ['name']
        # fields = '__all__'

class WeeklyAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = weekly_attendance
        fields = ['student_id_id','week','present','absent']


