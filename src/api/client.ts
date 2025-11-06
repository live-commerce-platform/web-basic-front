/**
 * Axios Client Configuration (HTTP 통신 설정 파일)
 *
 * 역할:
 * - 서버와 통신할 때 사용하는 Axios 라이브러리의 기본 설정
 * - 모든 API 요청에 공통으로 적용될 설정을 한 곳에서 관리
 * - 요청 전/후에 실행되는 공통 로직(인터셉터) 설정
 *
 * Axios란?
 * - 웹에서 서버와 HTTP 통신을 쉽게 해주는 JavaScript 라이브러리
 * - 브라우저 내장 fetch()보다 편리한 기능들을 제공
 *   (자동 JSON 변환, 요청 취소, 타임아웃 설정 등)
 *
 * 왜 필요한가?
 * - 모든 API 요청마다 서버 주소, 헤더를 반복 설정할 필요 없음
 * - 에러 처리, 로깅 등을 한 곳에서 관리하여 코드 중복 방지
 * - 나중에 사용자 인증(로그인 토큰) 등을 쉽게 추가 가능
 */

import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './endpoints';

/**
 * Axios 인스턴스 생성
 *
 * 웹 HTTP 통신 개념:
 * - 브라우저에서 서버로 데이터를 요청할 때 사용하는 도구
 * - 여러 설정을 미리 정해두고 재사용할 수 있음
 *
 * 주요 설정:
 * - baseURL: 모든 요청의 기본 주소 (매번 전체 URL을 쓰지 않아도 됨)
 * - timeout: 응답 대기 시간 (10초 이내에 응답이 없으면 에러 처리)
 * - headers: 요청에 포함될 기본 정보 (JSON 형식으로 데이터를 보낸다고 서버에 알림)
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,  // 모든 요청의 기본 URL
  timeout: 10000,          // 10초 타임아웃 (응답이 10초 내에 오지 않으면 에러)
  headers: {
    'Content-Type': 'application/json', // 기본적으로 JSON 형식으로 데이터 전송
  },
});

/**
 * Request Interceptor (요청 인터셉터)
 *
 * 인터셉터란?
 * - 요청이 서버로 전송되기 직전에 자동으로 실행되는 함수
 * - 모든 API 요청에 공통으로 처리할 작업을 여기서 수행
 *
 * 웹 개발 개념:
 * - HTTP 요청 = 브라우저가 서버에 보내는 메시지
 * - 요청 전에 공통 작업을 수행하여 코드 중복 방지
 *   예: 로그인 토큰 추가, 요청 내용 로깅, 데이터 검증
 *
 * 사용 목적:
 * - 모든 요청 정보를 콘솔에 출력 (디버깅 용이)
 * - 나중에 인증 토큰을 모든 요청에 자동으로 추가
 * - 요청 데이터를 변환하거나 검증
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청이 전송되기 전에 실행되는 코드

    // 개발 중에 어떤 요청을 보내는지 확인 (디버깅용)
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),  // GET, POST, DELETE 등
      url: config.url,                        // 요청 경로 (예: /wishlist)
      data: config.data,                      // 요청 본문 (POST, PUT일 때 서버에 보내는 데이터)
    });

    // 나중에 로그인 기능을 추가할 때 여기서 토큰을 헤더에 넣을 수 있음
    // 예시:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config; // 수정된 설정을 반환하여 요청 계속 진행
  },
  (error: AxiosError) => {
    // 요청 설정 중 에러가 발생한 경우
    console.error('❌ Request Error:', error);
    return Promise.reject(error); // 에러를 호출한 곳으로 전달
  }
);

/**
 * Response Interceptor (응답 인터셉터)
 *
 * 인터셉터란? (응답용)
 * - 서버에서 응답이 도착한 후, 실제 코드로 전달되기 전에 자동 실행되는 함수
 * - 모든 API 응답에 공통으로 처리할 작업을 여기서 수행
 *
 * 웹 개발 개념:
 * - HTTP 응답 = 서버가 브라우저에 보내는 답변 메시지
 * - 응답 후에 공통 작업을 수행하여 일관된 처리 가능
 *   예: 에러 로깅, 인증 실패 시 로그인 페이지로 이동
 *
 * HTTP 상태 코드:
 * - 2xx (200, 201): 성공 (요청이 정상적으로 처리됨)
 * - 4xx (400, 401, 404): 클라이언트 에러 (요청에 문제가 있음)
 * - 5xx (500, 503): 서버 에러 (서버에 문제가 발생함)
 *
 * 사용 목적:
 * - 응답 데이터를 콘솔에 출력 (디버깅 용이)
 * - 에러 응답을 일관되게 처리
 * - 인증 에러(401) 발생 시 자동으로 로그인 페이지로 이동 등
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 성공 응답 (상태 코드 2xx)
    console.log('✅ API Response:', {
      status: response.status,        // HTTP 상태 코드 (200, 201 등)
      statusText: response.statusText, // 상태 메시지 (OK, Created 등)
      data: response.data,             // 서버가 보낸 실제 데이터
    });

    return response; // 응답을 그대로 반환
  },
  (error: AxiosError) => {
    // 에러 응답 (상태 코드 4xx, 5xx) 또는 네트워크 에러
    console.error('❌ API Error:', {
      message: error.message,                // 에러 메시지
      status: error.response?.status,        // HTTP 상태 코드 (404, 500 등)
      statusText: error.response?.statusText, // 상태 메시지
      data: error.response?.data,            // 서버가 보낸 에러 정보
    });

    // 특정 에러에 대한 공통 처리 예시
    // 401 Unauthorized: 인증 에러 (로그인이 필요함)
    // if (error.response?.status === 401) {
    //   window.location.href = '/login'; // 로그인 페이지로 자동 이동
    // }

    // 500 Internal Server Error: 서버 내부 에러
    // if (error.response?.status === 500) {
    //   alert('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    // }

    return Promise.reject(error); // 에러를 호출한 곳으로 전달
  }
);

/**
 * 사용 예시:
 *
 * import { apiClient } from '@/api/client';
 *
 * // GET 요청 (데이터 조회)
 * const response = await apiClient.get('/wishlist');
 * // 실제 요청: GET https://서버주소/wishlist
 *
 * // POST 요청 (데이터 생성)
 * const response = await apiClient.post('/wishlist', { name: '새 상품' });
 * // 실제 요청: POST https://서버주소/wishlist (본문: { name: '새 상품' })
 *
 * // DELETE 요청 (데이터 삭제)
 * const response = await apiClient.delete('/wishlist/1');
 * // 실제 요청: DELETE https://서버주소/wishlist/1
 */
