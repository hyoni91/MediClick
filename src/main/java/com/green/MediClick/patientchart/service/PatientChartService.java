package com.green.MediClick.patientchart.service;

import com.green.MediClick.patientchart.vo.PatientChartVO;

public interface PatientChartService {

    //진료차트에 표시 할 정보 조회
    PatientChartVO pSelect(int schNum);

}
