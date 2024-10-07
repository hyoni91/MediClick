-- 환자 정보
CREATE TABLE MEDICAL_MEMBER(
  MEM_NUM VARCHAR(20) PRIMARY KEY
  ,MEM_NAME VARCHAR(20) NOT NULL
  ,MEM_TEL VARCHAR(50) NOT NULL UNIQUE
  ,MEM_RRN VARCHAR(20) UNIQUE NOT NULL
  ,MEM_ROLE VARCHAR(30) DEFAULT('USER')
);
DELETE FROM medical_member;
SELECT * FROM medical_member;
-- DROP TABLE
DROP TABLE MEDICAL_MEMBER;
DROP TABLE medical_dept;
DROP TABLE medical_doctor;
DROP TABLE medical_schedule;

-- 회원가입 정보 INSERT
INSERT INTO medical_member (
	MEM_NUM
  ,MEM_NAME
  ,MEM_TEL
  ,MEM_RRN
)VALUES (
	'0'
  ,'김수한무'
  ,'01011112222'
  ,'9604232222222'
);
SELECT * FROM medical_member;

-- 진료과
CREATE TABLE MEDICAL_DEPT(
	DEPT_NUM INT PRIMARY KEY
	,DEPT_NAME VARCHAR(30) NOT NULL
);
-- 진료과 insert
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(1, '유방암 외과');
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(2, '신경외과');
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(3, '갑상선 외과');
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(4, '산부인과');
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(5, '흉부외과');
INSERT INTO medical_dept(DEPT_NUM, DEPT_NAME) VALUES(6, '혈액 종양 내과');

-- 의료진
CREATE TABLE MEDICAL_DOCTOR(
	DOC_NUM VARCHAR(20) PRIMARY KEY
	,DOC_NAME VARCHAR(20) NOT NULL
	,DEPT_NUM INT REFERENCES MEDICAL_DEPT(DEPT_NUM)
);
SELECT * FROM medical_dept;
SELECT * FROM medical_doctor;

DELETE FROM medical_doctor;

UPDATE medical_doctor
SET DOC_NAME = '정다영'
WHERE DOC_NUM = 6;

-- 의료진 insert
INSERT INTO medical_doctor VALUES ('1','김현경', 1);
INSERT INTO medical_doctor VALUES ('2','민정흠', 2);
INSERT INTO medical_doctor VALUES ('3','유지현', 3);
INSERT INTO medical_doctor VALUES ('4','서은송', 4);
INSERT INTO medical_doctor VALUES ('5','김형진', 5);
INSERT INTO medical_doctor VALUES ('6','김하루', 6);

-- 의료진, 의사 JOIN select
SELECT DOC_NAME, DEPT_NAME
FROM medical_dept, medical_doctor
WHERE medical_dept.DEPT_NUM = medical_doctor.DEPT_NUM;

-- 예약
CREATE TABLE MEDICAL_SCHEDULE(
  SCH_NUM INT PRIMARY KEY AUTO_INCREMENT
  ,DOC_NUM VARCHAR(20) REFERENCES medical_doctor(DOC_NUM) ON DELETE CASCADE
  ,MEM_NUM VARCHAR(20) REFERENCES medical_member(MEM_NUM) ON DELETE CASCADE
  ,DEPT_NUM INT REFERENCES medical_dept(DEPT_NUM) ON DELETE CASCADE -- 진료과 번호 조인
  ,REG_DATE DATETIME DEFAULT CURRENT_TIMESTAMP -- 접수날짜
  ,SCH_DATE DATE NOT NULL -- 예약날짜 년월일
  ,SCH_TIME TIME NOT NULL -- 예약 날짜 시간
  ,DETAIL VARCHAR(100)
  ,SCH_STATUS VARCHAR(10) DEFAULT('Y')  
);
SELECT * FROM medical_schedule;

DELETE FROM user_board;
SELECT * FROM user_board;
SELECT * FROM medical_member;
DROP TABLE user_board;
-- 게시판
CREATE TABLE USER_BOARD(
BOARD_NUM INT AUTO_INCREMENT PRIMARY KEY
, TITLE VARCHAR(20) NOT NULL
, WRITER VARCHAR(10) NOT NULL
, CONTENT VARCHAR(1000) NOT NULL
, CREATE_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
, MEM_NUM VARCHAR(20) REFERENCES medical_member(MEM_NUM)
);
DROP TABLE user_board;
SELECT * FROM user_board;
-- 이미지
CREATE TABLE DOCTOR_IMG(
IMG_NUM INT PRIMARY KEY AUTO_INCREMENT
, ORIGIN_FILE_NAME VARCHAR(50)
, ATTACHED_FILE_NAME VARCHAR(50)
, DOC_NUM VARCHAR(20) REFERENCES medical_doctor(DOC_NUM)
);
DROP TABLE doctor_img;
SELECT * FROM doctor_img;

-- 수주 관리 프로그램
DROP TABLE customers;
-- 거래처
CREATE TABLE CUSTOMERS(
  CUSTOMER_NUM INT AUTO_INCREMENT PRIMARY KEY
  , CUSTOMER_NAME VARCHAR(100) NOT NULL UNIQUE
  , CUSTOMER_OWNER VARCHAR(50) NOT NULL 
  , BUSINESS_NUMBER VARCHAR(100) NOT NULL
  , CUSTOMER_ADDR VARCHAR(200) NOT NULL
  , CUSTOMER_TEL VARCHAR(50) NOT NULL
  , CUSTOMER_EMAIL VARCHAR(50) UNIQUE
);
-- 카테고리
CREATE TABLE CATEGORY(
  CATE_NUM INT AUTO_INCREMENT PRIMARY KEY
  , CATE_NAME VARCHAR(100) NOT NULL UNIQUE
);

-- 상품정보
CREATE TABLE PRODUCTS(
  PRODUCT_NUM INT AUTO_INCREMENT PRIMARY KEY
  , PRODUCT_NAME VARCHAR(100) NOT NULL 
  , CATE_NUM INT REFERENCES CATEGORY(CATE_NUM) 
  , PRODUCT_PRICE INT NOT NULL
  , STOCK INT NOT NULL 
  , DETAIL VARCHAR(300)
);

-- 상품 이미지
CREATE TABLE item_img (
  IMG_CODE INT AUTO_INCREMENT PRIMARY KEY
  , ORIGIN_FILE_NAME VARCHAR(100) NOT NULL
  , ATTACHED_FILE_NAME VARCHAR(100) NOT NULL
  , PRODUCT_NUM INT REFERENCES PRODUCTS (PRODUCT_NUM ) ON DELETE CASCADE
);

DROP TABLE inventory;
-- 재고 테이블
CREATE TABLE INVENTORY(
	INVENTORY_NUM INT AUTO_INCREMENT PRIMARY KEY
	, CATE_NUM INT REFERENCES category(CATE_NUM)
	, PRODUCT_NUM INT REFERENCES products(PRODUCT_NUM)
	, PRODUCT_NAME VARCHAR(100) NOT NULL
	, STOCK_DATE DATETIME DEFAULT CURRENT_TIMESTAMP -- 입고 일자
	, OUT_DATE DATETIME -- 출고 일자
	, INITIAL_STOCK INT NOT NULL -- 최초 재고
	, INCOMING_QTY INT NOT NULL -- 입고 수량
	, OUTGOING_QTY INT NOT NULL -- 출고 수량
);

-- 배송
CREATE TABLE DELIVERY(
	DELIVERY_NUM INT AUTO_INCREMENT PRIMARY KEY,
	ORDER_NUM INT REFERENCES ORDERS(ORDER_NUM) ON DELETE CASCADE,
	DELIVERY_DRIVER_NAME VARCHAR(100) NOT NULL, -- 기사이름
	DELIVERY_DRIVER_PHONE VARCHAR(20) NOT NULL, -- 기사 번호
	DELIVERY_ADDRESS VARCHAR(200) NOT NULL, -- 도착 주소지
	DELIVERY_START_TIME DATETIME, -- 출발
	DELIVERY_END_TIME DATETIME, -- 도착
	DELIVERY_STATUS ENUM('배송대기', '배송중', '배송완료','배송취소', '반품') NOT NULL DEFAULT '배송대기', -- 배송 상태
);

 DROP TABLE ORDER_REQUESTS;
 DROP TABLE PAYMENTS;
 DROP TABLE orders;

-- 발주
CREATE TABLE ORDER_REQUESTS(
 REQUEST_NUM INT AUTO_INCREMENT PRIMARY KEY
 , PRODUCT_NUM INT REFERENCES PRODUCTS(PRODUCT_NUM) ON DELETE CASCADE
 , CUSTOMER_NUM INT REFERENCES CUSTOMERS(CUSTOMER_NUM) ON DELETE CASCADE
 , QUANTITY INT NOT NULL
 ,REQUEST_STATUS ENUM('배송대기','배송완료', '주문취소') NOT NULL DEFAULT '배송대기'
 , REQUEST_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 결제
CREATE TABLE PAYMENTS(
 PAYMENT_NUM INT AUTO_INCREMENT PRIMARY KEY
 , REQUEST_NUM INT REFERENCES ORDER_REQUESTS(REQUEST_NUM) ON DELETE CASCADE
 , PAYMENT_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
 , AMOUNT INT NOT NULL 
 , PAYMENT_METHOD VARCHAR(100) NOT NULL 
 , PAYMENT_STATUS ENUM('결제대기', '결제완료', '결제취소') NOT NULL DEFAULT '결제완료'
);

-- 수주 테이블
CREATE TABLE ORDERS(
 ORDER_NUM INT AUTO_INCREMENT PRIMARY KEY
 , REQUEST_NUM INT REFERENCES ORDER_REQUESTS(REQUEST_NUM) ON DELETE CASCADE
 , ORDER_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
 , ORDER_STATUS ENUM('배송대기', '배송중', '배송완료', '주문취소') NOT NULL DEFAULT '배송대기'
);