from django.urls import path
from nebula_app.views import index,Basic_detailListView,Student_detailView,Student_cohortDetailView,Student_namesDetailView,WeeklyAttendanceView

urlpatterns = [
    path('health-check/', index,name='index'),
    path('students/', Basic_detailListView.as_view(),name='students'),
    path('student/<slug:slug>/', Student_detailView.as_view(),name='student-detail'),
    path('student/attendance/<slug:slug>/', WeeklyAttendanceView.as_view(),name='student-attendance'),
    path('cohort/stats/<slug:slug>/', Student_cohortDetailView.as_view(),name='cohort-detail'),
    path('students/names/', Student_namesDetailView.as_view(),name='names-detail'),

]