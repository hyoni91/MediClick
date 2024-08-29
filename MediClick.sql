-- 환자 정보
CREATE TABLE MEDICAL_MEMBER(
	MEM_NUM INT PRIMARY KEY AUTO_INCREMENT
	,MEM_NAME VARCHAR(20) NOT NULL
	,MEM_TEL VARCHAR(50) NOT NULL UNIQUE
	,MEM_RRN VARCHAR(20) UNIQUE NOT NULL
	,MEM_ROLE VARCHAR(30) DEFAULT('USER')
);

INSERT INTO medical_member (
  MEM_NAME
  ,MEM_TEL
  ,MEM_RRN
)VALUES (
  '김수한무'
  ,'01011112222'
  ,'9604232222222'
);

SELECT * FROM medical_member; 

DROP TABLE medical_dept;

-- 진료과
CREATE TABLE MEDICAL_DEPT(
	DEPT_NUM INT PRIMARY KEY
	,DEPT_NAME VARCHAR(30) NOT NULL
);

UPDATE medical_dept
SET
DEPT_NAME = '유방암 외과'
WHERE DEPT_NAME = '유방암';

UPDATE medical_dept
SET
DEPT_NAME = '신경외과'
WHERE DEPT_NAME = '뇌종양';

UPDATE medical_dept
SET
DEPT_NAME = '갑상선 외과'
WHERE DEPT_NAME = '갑상선암';

UPDATE medical_dept
SET
DEPT_NAME = '산부인과'
WHERE DEPT_NAME = '자궁암';

UPDATE medical_dept
SET
DEPT_NAME = '흉부외과'
WHERE DEPT_NAME = '폐암';

UPDATE medical_dept
SET
DEPT_NAME = '혈액 종양 내과'
WHERE DEPT_NAME = '혈액암';

-- 진료과 insert
INSERT INTO medical_dept(DEPT_NAME) VALUES('유방암');
INSERT INTO medical_dept(DEPT_NAME) VALUES('뇌종양');
INSERT INTO medical_dept(DEPT_NAME) VALUES('갑상선암');
INSERT INTO medical_dept(DEPT_NAME) VALUES('간암');
INSERT INTO medical_dept(DEPT_NAME) VALUES('폐암');
INSERT INTO medical_dept(DEPT_NAME) VALUES('혈액암');

-- 의료진
CREATE TABLE MEDICAL_DOCTOR(
	DOC_NUM INT PRIMARY KEY AUTO_INCREMENT
	,DOC_NAME VARCHAR(20) NOT NULL
	,DEPT_NUM INT REFERENCES MEDICAL_DEPT(DEPT_NUM)
	
);
SELECT * FROM medical_dept;
SELECT * FROM medical_doctor;

DELETE FROM medical_doctor;

UPDATE medical_doctor
SET DOC_NAME = '정다영'
WHERE DOC_NUM = 12;

-- 의료진 insert
INSERT INTO medical_doctor VALUES (7,'김현경', 1);
INSERT INTO medical_doctor VALUES (8,'민정흠', 2);
INSERT INTO medical_doctor VALUES (9,'유지현', 3);
INSERT INTO medical_doctor VALUES (10,'서은송', 4);
INSERT INTO medical_doctor VALUES (11,'김형진', 5);
INSERT INTO medical_doctor VALUES (12,'김하루', 6);

-- 의료진, 의사 JOIN select
SELECT DOC_NAME, DEPT_NAME
FROM medical_dept, medical_doctor
WHERE medical_dept.DEPT_NUM = medical_doctor.DEPT_NUM;

-- 예약
CREATE TABLE (
	SCH_NUM INT PRIMARY KEY AUTO_INCREMENT
	,DOC_NUM INT REFERENCES MEDICAL_DOCTOR(DOC_NUM)
	,MEM_NUM INT REFERENCES MEDICAL_MEMBER(MEM_NUM)
	,REG_DATE DATETIME DEFAULT CURRENT_TIMESTAMP -- 접수날짜
	,SCH_DATE DATETIME -- 예약날짜 건들일 예정
	,DETAIL VARCHAR(100)
	,SCH_STATUS VARCHAR(10) DEFAULT('Y')
);



